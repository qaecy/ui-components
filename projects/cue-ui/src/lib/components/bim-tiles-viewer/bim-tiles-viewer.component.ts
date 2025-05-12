import { Component, effect, ElementRef, input, OnDestroy, output, signal, ViewChild, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoundingBoxer, Components, OrthoPerspectiveCamera, SimpleScene, SimpleWorld, World, Worlds } from '@thatopen/components';
import { IfcStreamer, PostproductionRenderer } from '@thatopen/components-front';
import { FragmentsGroup } from '@thatopen/fragments';
import { monkeyPatchIfcStreamer } from '../../utils/obc/patches/ifc-streamer';
import { ResizedDirective } from '../../directives';
import { GeometryDefinition } from '../../utils/obc/models';
import { gdefDownloader } from '../../utils/obc/gdef-downloader';

export class ModelDef{
  constructor(public modelUUID: string, public assetUUIDs: string[] = [], public geometryIds: number[] = []){}
} 

export class BIMTilesViewerData{

  setStaticThreshold = 2000;
  urlAuthenticator = async (unauthenticatedURL: string): Promise<string> => unauthenticatedURL;
  public modelDefs: ModelDef[] = [];                        // ALTERNATIVE A
  public geometryDefinitions: GeometryDefinition[] = [];    // ALTERNATIVE B

  constructor(public projectId: string){}
}

@Component({
    selector: 'cue-bim-tiles-viewer',
    imports: [CommonModule, ResizedDirective],
    template: '<div #bimViewer style="height: 100%; z-index: 100;" cueResized (resized)="onResized()"></div>'
})
export class BIMTilesViewer implements OnDestroy{
  
  data = input<BIMTilesViewerData|undefined>(undefined);
  zoomFactor = input<number>(1);
  geometryDefinitionsUpdated = output<GeometryDefinition[]>();

  private _container: WritableSignal<HTMLElement|undefined> = signal(undefined);
  private _components?: Components;
  private _world?: SimpleWorld<SimpleScene, OrthoPerspectiveCamera, PostproductionRenderer>;

  @ViewChild('bimViewer') set bimViewer(content: ElementRef) {
    if (content) this._container.set(content.nativeElement);
  }

  buildOnChange = effect(() => {
    const container = this._container();
    if(container !== undefined) container.innerHTML = "";
    const data = this.data();
    if(container !== undefined && data !== undefined){
      this._build(container, data);
    }
  });

  ngOnDestroy(){
    this._components?.dispose();
    // this._world?.dispose();
  }

  onResized(){
    this._world?.renderer?.resize();
    this._world?.camera.updateAspect();
  }

  private async _build(container: HTMLElement, data: BIMTilesViewerData){
    const [components, world] = await this._setupComponents(container);
    const loader = components.get(IfcStreamer);
    loader.world = world;
    loader.url = `to-be-removed`;
    monkeyPatchIfcStreamer(loader, data.urlAuthenticator);
    
    const loaded: {model: FragmentsGroup, geometryDefinition: GeometryDefinition}[] = [];
    const geometryDefinitions = data.geometryDefinitions;

    if(data.modelDefs.length){
      for(const modelDef of data.modelDefs){
        const geometryDefinition = await this._getGeometryDefinition(data, modelDef);
        geometryDefinitions.push(geometryDefinition);
      }
      this.geometryDefinitionsUpdated.emit(geometryDefinitions);
    }

    if(!geometryDefinitions.length){
      throw new Error("Nothing to load. Specify either modelDefs or a geometry definition")
    }

    let assetCount = 0;
    for(const geometryDefinition of geometryDefinitions){
      assetCount+= geometryDefinition.assets.length;
      const model = await loader.load(geometryDefinition, true);
      loaded.push({model, geometryDefinition});
    }
    geometryDefinitions.forEach(gd => assetCount+= gd.assets.length);

    // If less than setStaticThreshold, make all static
    if(assetCount < data.setStaticThreshold){
      for(const l of loaded){
        const expressIDs = Object.keys(l.geometryDefinition.idMap).map(id => parseInt(id));
        const fragmentIdMap = l.model.getFragmentMap(expressIDs);
        const fragmentIds = Object.keys(fragmentIdMap);
        await loader.setStatic(fragmentIds, true, false);
      }
    }

    this._fitModel(world);
  }

  private _setupComponents(container: HTMLElement): [Components, World]{
    const components = new Components();
    // Setup scene
    const worlds = components.get(Worlds);
    const world = worlds.create<
      SimpleScene,
      OrthoPerspectiveCamera,
      PostproductionRenderer
    >();
    world.scene = new SimpleScene(components);
    world.scene.setup();
    world.scene.three.background = null;

    world.renderer = new PostproductionRenderer(components, container);
    const { postproduction } = world.renderer;

    world.camera = new OrthoPerspectiveCamera(components);

    components.init();

    world.scene.setup();

    postproduction.enabled = true;
    postproduction.setPasses({ custom: true, ao: true, gamma: true });
    postproduction.customEffects.lineColor = 0x17191c;
    postproduction.customEffects.outlineEnabled = true;

    // Set controls rest threshold
    world.camera.controls.restThreshold = 0.25;

    this._components = components;
    this._world = world;
    return [components, world];
  }

  private async _getGeometryDefinition(data: BIMTilesViewerData, modelDef: ModelDef): Promise<GeometryDefinition>{
    const url = await data.urlAuthenticator(`${data.projectId}/tiles/${modelDef.modelUUID}-gdef`);
    const gdef = await gdefDownloader(url, modelDef.assetUUIDs, modelDef.geometryIds);
    gdef.skipSpaces = true;
    gdef.skipOpenings = true;
    return gdef;
  }

  private async _fitModel(world: World){
    if(world === undefined) throw new Error("World not set");
    const bbox = this._components?.get(BoundingBoxer);
    if(bbox === undefined) return;
    bbox.reset();
    world.meshes.forEach(mesh => {
      bbox.addMesh(mesh);
    });

    const sphere = bbox.getSphere();
    const i = Infinity;
    const mi = -Infinity;
    const { x, y, z } = sphere.center;
    const isInf = sphere.radius === i || x === i || y === i || z === i;
    const isMInf = sphere.radius === mi || x === mi || y === mi || z === mi;
    const isZero = sphere.radius === 0;
    if (isInf || isMInf || isZero) {
      return;
    }

    sphere.radius *= this.zoomFactor();
    const camera = world.camera;
    await camera.controls?.fitToSphere(sphere, true);


    // const { camera } = world;
    // if(world.meshes.size === 1){
    //   const 
    //   console.log(world.meshes)
    //   console.log("ONE")
    // }
    // if (camera instanceof OrthoPerspectiveCamera && world.meshes.size > 1) {
    //     camera.fit(world.meshes, 0.5);
    // }
  }

}
