import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  input,
  linkedSignal,
  OnDestroy,
  signal,
  ViewChild,
} from '@angular/core';
import { ResizedDirective } from '../../directives';
import {
  Components,
  OrthoPerspectiveCamera,
  SimpleScene,
  SimpleWorld,
  World,
  Worlds,
} from '@thatopen/components';
import { PostproductionRenderer } from '@thatopen/components-front';
import { FragmentsModels } from '@thatopen/fragments';
import { DraggableCard } from '../draggable-card.component';
import { SvgIcon } from '../icons/svg-icon.component';
import { Typography } from '../typography.component';
import { FlexContainer } from '../flexcontainer.component';

export interface ModelDef {
  id: string;
  name: string;
  fileURL: string;
}

export interface ModelDefExt extends ModelDef {
  visible: boolean;
}

export interface BIMFragmentsViewerData {
  models: ModelDef[];
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cue-bim-fragments-viewer',
  template: `<div
      #bimViewer
      style="height: 100%; z-index: 100;"
      cueResized
      (resized)="onResized()"
    ></div>
    @if(showModelList() && models().length){
    <cue-draggable-card [padded]="false">
      <cue-topography size="s">
        <cue-flexcontainer direction="column" style="padding: 10px;">
          @if(modelsAreLoading()){
          <span>Loading...</span>
          } @else{ @for(model of models(); track model.id){
          <cue-flexcontainer direction="row" justify="space-between">
            <span>{{ model.name }}</span>
            <cue-svg-icon
              style="cursor: pointer;"
              [name]="model.visible ? 'view-inactive' : 'view-active'"
              (click)="toggleVisibility(model)"
            ></cue-svg-icon>
          </cue-flexcontainer>
          } }
        </cue-flexcontainer>
      </cue-topography>
    </cue-draggable-card>
    }`,
  imports: [
    ResizedDirective,
    DraggableCard,
    SvgIcon,
    Typography,
    FlexContainer,
  ],
})
export class BIMFragmentsViewer implements OnDestroy {
  data = input<BIMFragmentsViewerData | undefined>(undefined);
  showModelList = input<boolean>(true);
  loadInstantly = input<boolean>(false);

  models = linkedSignal<ModelDefExt[]>(() => {
    const models = this.data()?.models ?? [];
    return models.map((m) => ({ ...m, visible: false }));
  });
  private _container = signal<HTMLElement | undefined>(undefined);
  private _components?: Components;
  private _fragments?: FragmentsModels;
  private _world?: SimpleWorld<
    SimpleScene,
    OrthoPerspectiveCamera,
    PostproductionRenderer
  >;
  private _viewerReady = signal(false);

  @ViewChild('bimViewer') set bimViewer(content: ElementRef) {
    if (content) this._container.set(content.nativeElement);
  }

  buildWhenContainerReady = effect(() => {
    const container = this._container();
    if (container !== undefined) container.innerHTML = '';
    const data = this.data();
    if (container !== undefined && data !== undefined) {
      this._build(container, data);
      console.info('Viewer is ready');
      this._viewerReady.set(true);
    }
  });

  loadFilesOnData = effect(() => {
    const models = this.models();
    if (this._viewerReady() && models.length) {
      this._updateModels(models);
    }
  });

  modelsAreLoading = signal(false);

  ngOnDestroy(): void {
    this._disposeModels();
  }

  async toggleVisibility(model: ModelDefExt) {
    if (model.visible) {
      await this._disposeModels([model.id]);
      model.visible = false;
    } else {
      await this._loadFragmentFiles([model]);
      model.visible = true;
    }
    this.models.update(() => [...this.models()]); // Force update
  }

  // Disposes models not in list and appends new ones
  private async _updateModels(models: ModelDefExt[]) {
    const modelIds = models.map((m) => m.id);
    const alreadyLoaded = this._getModelsIds();
    const toLoad: ModelDefExt[] = models.filter(
      (m) => !alreadyLoaded.includes(m.id)
    );
    const toUnloadLoad: string[] = alreadyLoaded.filter(
      (id) => !modelIds.includes(id)
    );

    if (toLoad.length) {
      console.info(`Loading ${toLoad.length} model(s)`);
      if (this.loadInstantly()) {
        await this._loadFragmentFiles(toLoad);
      }
    }

    if (toUnloadLoad.length) {
      console.info(`Disposing ${toLoad.length} model(s)`);
      await this._disposeModels(toUnloadLoad);
    }
  }

  private _build(container: HTMLElement, data: BIMFragmentsViewerData) {
    this._setupComponents(container);
    this._setupFragments();
  }

  private _setupComponents(container: HTMLElement): [Components, World] {
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

  private _setupFragments() {
    const world = this._world;
    if (world === undefined) throw new Error('World not available');
    const fragments = new FragmentsModels('./js/worker.mjs');
    world.camera.controls.addEventListener('rest', () =>
      fragments.update(true)
    );
    world.camera.controls.addEventListener('update', () => fragments.update());

    // Once a model is available in the list, we can tell what camera to use
    // in order to perform the culling and LOD operations.
    // Also, we add the model to the 3D scene.
    fragments.models.list.onItemSet.add(({ value: model }) => {
      model.useCamera(world.camera.three);
      world.scene.three.add(model.object);
      // At the end, you tell fragments to update so the model can be seen given
      // the initial camera position
      fragments.update(true);
    });

    this._fragments = fragments;
  }

  private _loadFragmentFiles = async (models: ModelDefExt[]) => {
    if (this._fragments === undefined)
      throw new Error('Fragments not available');
    this.modelsAreLoading.set(true);
    for (const model of models) {
      console.info(`Loading ${model.name} (${model.id})...`);
      const file = await fetch(model.fileURL);
      const buffer = await file.arrayBuffer();
      await this._fragments.load(buffer, { modelId: model.id });
      model.visible = true;
      console.info(`${model.name} (${model.id}) loaded`);
    }
    this.modelsAreLoading.set(false);
  };

  private async _disposeModels(ids = this._getModelsIds()) {
    if (this._fragments === undefined)
      throw new Error('Fragments not available');
    const promises = [];
    for (const id of ids) promises.push(this._fragments.disposeModel(id));
    await Promise.all(promises);
  }

  private _getModelsIds() {
    if (this._fragments === undefined)
      throw new Error('Fragments not available');
    const models = this._fragments.models.list.values();
    const ids = [...models].map((model) => model.modelId);
    return ids;
  }

  onResized() {
    this._world?.renderer?.resize();
    this._world?.camera.updateAspect();
  }
}
