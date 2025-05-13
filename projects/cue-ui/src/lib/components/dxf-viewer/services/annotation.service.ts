import { Injectable, OnDestroy, WritableSignal, signal } from '@angular/core';
import { DxfViewer } from 'dxf-viewer';
import { Camera, OrthographicCamera, Scene, Vector2 } from 'three';
import {
  CSS2DRenderer,
  CSS2DObject,
} from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { AnnotationMarkerDef, Coordinate } from '../models';

interface AnnotationDef {
  coordinate: Coordinate;
  overlayObject: CSS2DObject;
  div: HTMLElement;
}

@Injectable({
  providedIn: 'root',
})
export class AnnotationService implements OnDestroy {
  private _dxf?: DxfViewer;
  private _canvas?: HTMLElement;
  private _scene: Scene = new Scene();
  private _camera: Camera = new Camera();
  private _labelRenderer = new CSS2DRenderer();

  private _loadedAnnotations: AnnotationDef[] = [];

  clickedBox: WritableSignal<AnnotationDef | undefined> = signal(undefined);

  ngOnDestroy(): void {
    this._loadedAnnotations = [];
    this._labelRenderer = new CSS2DRenderer();
  }

  init(dxf: DxfViewer, canvas: HTMLElement) {
    this._dxf = dxf;
    this._canvas = canvas;
    this._scene = dxf.GetScene();
    this._camera = dxf.GetCamera();

    this._buildLabelRenderer();
    this._initEventListeners();
  }

  addAnnotations(annotations: AnnotationMarkerDef[]) {
    annotations.forEach((annotation) => {

      const div = document.createElement('div');
      div.innerHTML = "I'm an annotation";
      console.warn("Should show a proper marker!");

      const overlayObject = new CSS2DObject(div);
      this._scene?.add(overlayObject);

      const annotationDef: AnnotationDef = {
        overlayObject,
        div,
        coordinate: annotation.coordinate,
      };

      this._loadedAnnotations.push(annotationDef);

      // If clickable
      // if(annotation.clickable){
      //   innerDiv.classList.add('clickable');
      //   innerDiv.addEventListener('pointerdown', (ev: MouseEvent) => {
      //     if (annotation.onClick === undefined) return;
      //     annotation.onClick(annotation, ev, innerDiv);
      //   });
      // }

      // innerDiv.addEventListener('pointerover', (ev: MouseEvent) => {
      //   if (annotation.onHover === undefined) return;
      //   annotation.onHover(annotation, ev, innerDiv);
      // });
    });

    this._updateOverlayPositions();
  }

  dispose(){
    this._canvas?.removeChild(this._labelRenderer.domElement);
    this._loadedAnnotations = [];
  }

  private _buildLabelRenderer() {
    if (this._canvas === undefined) throw new Error('Canvas not set');
    this._labelRenderer.setSize(
      this._canvas.clientWidth,
      this._canvas.clientHeight
    );
    this._labelRenderer.domElement.className = 'label-renderer';
    this._labelRenderer.domElement.style.position = 'absolute';
    this._labelRenderer.domElement.style.top = '0px';
    this._labelRenderer.domElement.style.pointerEvents = 'none';
    this._canvas.appendChild(this._labelRenderer.domElement);
    this._labelRenderer.render(this._scene, this._camera);
  }

  private _onWindowResize() {
    if (this._canvas === undefined) return;
    this._labelRenderer.setSize(
      this._canvas.clientWidth,
      this._canvas.clientHeight
    );
  }

  private _handleViewChange() {
    this._updateOverlayPositions();
    // const s = this._dxf?.GetBounds();
    // // this._dxf?.GetScene()?.getZ(s)
    // console.log(s)
  }

  private _updateOverlayPositions() {
    const origin = this._dxf?.GetOrigin() ?? new Vector2(0, 0);
    const factor = this._getScaleFactor();
    this._loadedAnnotations.forEach((boxDef) => {
      const x = boxDef.coordinate.x - origin.x;
      const y = boxDef.coordinate.y - origin.y;
      const z = 0;
      boxDef.overlayObject.position.set(x, y, z);
    });
    this._render();
  }

  private _render() {
    this._labelRenderer.render(this._scene, this._camera);
  }

  private _initEventListeners() {
    window.addEventListener('resize', this._onWindowResize);
    this._dxf?.Subscribe('viewChanged', () => this._handleViewChange());
  }

  private _getScaleFactor() {
    const camera = this._camera as OrthographicCamera;
    const factor = (camera.top - camera.bottom) / camera.zoom;
    // console.log(factor); // What to do with this?
  }
}
