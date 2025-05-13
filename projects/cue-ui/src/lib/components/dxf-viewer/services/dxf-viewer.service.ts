import { Injectable, OnDestroy, inject } from '@angular/core';
import { DxfViewer } from 'dxf-viewer';
import { ViewerOptions } from '../dxf-viewer.settings';
import { Color, Vector2 } from 'three';
import { Layer } from '../models';
import { EventsService } from './events.service';
import { AnnotationService } from './annotation.service';
import { XYWH } from '../../../utils/xywh/models';

interface LoadedFile {
  url: string;
  fonts: any;
}
@Injectable({ providedIn: 'root' })
export class DXFViewerService implements OnDestroy {
  private _events = inject(EventsService);
  private _annotationService = inject(AnnotationService);

  private _viewerOptions = new ViewerOptions();
  private _canvas?: HTMLElement;
  private _dxfViewer?: DxfViewer;

  private _loadedFiles: LoadedFile[] = [];

  ngOnDestroy() {
    this._dxfViewer?.Destroy();
    this._loadedFiles = [];
  }

  set viewerOptions(value: ViewerOptions) {
    console.log(value);
    this._viewerOptions = value;
  }

  set canvas(value: HTMLElement) {
    this._canvas = value;
  }

  dispose(){
    this._dxfViewer?.Clear();
  }

  buildViewer(): DxfViewer | undefined {
    if (this._canvas === undefined) {
      console.error('Canvas not set');
      return;
    }
    this._dxfViewer = new DxfViewer(this._canvas, this._viewerOptions);
    this._events.init(this._dxfViewer);
    this._annotationService.init(this._dxfViewer, this._canvas);
    return this._dxfViewer;
  }

  resize(rect: DOMRectReadOnly) {
    if (this._dxfViewer == undefined) return;
    this._dxfViewer.SetSize(rect.width, rect.height);
    this._dxfViewer.Render();
  }

  zoomFit(){
    if (this._dxfViewer == undefined) return;
    const bounds = this._dxfViewer.GetBounds();
    if(!bounds) return;
    const {maxX, maxY, minX, minY} = bounds;
    const origin = this._dxfViewer.GetOrigin() ?? new Vector2(0, 0);
    this._dxfViewer.FitView(minX-origin.x, maxX-origin.x, minY-origin.y, maxY-origin.y, 0);
    this._dxfViewer.Render();
  }

  // Messes with the zoom afterwards for some reason
  flyTo(xywh: XYWH){
    if (this._dxfViewer == undefined) return;
    const origin = this._dxfViewer.GetOrigin() ?? new Vector2(0, 0);
    const minX = xywh.x-origin.x;
    const maxX = minX+xywh.w;
    const minY = xywh.y-origin.y;
    const maxY = minY+xywh.h;
    this._dxfViewer.FitView(minX, maxX, minY, maxY, 0);
    this._dxfViewer.Render();
  }

  getLayers(): Layer[] {
    if (this._dxfViewer == undefined) return [];
    const layers: Layer[] = [];
    for (const l of this._dxfViewer.GetLayers()) {
      const layer = {
        name: l.name,
        displayName: l.displayName,
        color: this._getCssColor(l.color),
        checked: true,
        toggleCheck: () => {
          layer.checked = !layer.checked;
          this._dxfViewer?.ShowLayer(layer.name, layer.checked);
        },
      };
      layers.push(layer);
    }
    return layers;
  }

  async load(url: string, fonts: any, cb?: any) {
    if (this._dxfViewer == undefined) return;
    await this._dxfViewer.Load({
      url,
      fonts,
      progressCbk: cb?.bind(this),
      workerFactory: null
    //   workerFactory: () => new Worker(new URL('./dxf-viewer.worker.js', import.meta.url), { type: 'module' }) // Not working https://github.com/vagran/dxf-viewer-example-src/issues/21
    });
    this._loadedFiles.push({ url, fonts });
  }

  private _getCssColor(value: number) {
    if (value === undefined) return 'red';
    let s = value.toString(16);
    while (s.length < 6) {
      s = '0' + s;
    }
    return '#' + s;
  }
}
