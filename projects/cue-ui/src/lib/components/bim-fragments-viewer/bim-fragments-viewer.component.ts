import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import * as OBC from "@thatopen/components";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cue-bim-fragments-viewer',
  template: `<div>Hello</div>`,
  imports: [],
})
export class BIMFragmentsViewer implements OnInit {
  ngOnInit(): void {
    this._setupScene();
  }

  private _setupScene() {
    const components = new OBC.Components();

    const worlds = components.get(OBC.Worlds);
    const world = worlds.create<
      OBC.SimpleScene,
      OBC.SimpleCamera,
      OBC.SimpleRenderer
    >();

    world.scene = new OBC.SimpleScene(components);
    world.scene.setup();
    world.scene.three.background = null;

    const container = document.getElementById('container')!;
    world.renderer = new OBC.SimpleRenderer(components, container);

    world.camera = new OBC.SimpleCamera(components);
    world.camera.controls.setLookAt(183, 11, -102, 27, -52, -11); // convenient position for the model we will load

    components.init();

    const grids = components.get(OBC.Grids);
    grids.create(world);
  }
}
