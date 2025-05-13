import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  effect,
  inject,
  input,
  linkedSignal,
  output,
  signal,
} from '@angular/core';
import { DXFViewerSettings } from './dxf-viewer.settings';
import { DXFViewerService } from './services/dxf-viewer.service';
import { AnnotationMarkerDef, DrawingClickEvent, Layer } from './models';
import { EventsService } from './services/events.service';
import { AnnotationService } from './services/annotation.service';
import { LayersComponent } from './ui/layers/layers.component';
import {
  DarkModeDirective,
  LoadingOverlayDirective,
  ResizedDirective,
  ResizedEvent,
} from '../../directives';
import { Color } from 'three';

@Component({
  imports: [
    CommonModule,
    ResizedDirective,
    LoadingOverlayDirective,
    DarkModeDirective,
    LayersComponent,
  ],
  selector: 'cue-dxf-viewer',
  templateUrl: './dxf-viewer.component.html',
  styleUrls: ['./dxf-viewer.component.scss'],
})
export class DXFViewer implements OnDestroy {
  private _service = inject(DXFViewerService);
  private _events = inject(EventsService);
  private _annotationService = inject(AnnotationService);
  private _cdref = inject(ChangeDetectorRef);

  fileURL = input.required<string>();
  backgroundColor = input<undefined | string>(undefined);
  settings = input(new DXFViewerSettings());
  annotationMarkers = input<AnnotationMarkerDef[]>([]);
  //   customToolbarItems = input<ToolbarSection[]>([]);

  viewerOptions = linkedSignal(() => this.settings()?.viewerOptions);

  modelLoaded = output<void>();
  drawingClick = output<DrawingClickEvent>();

  private _canvas?: HTMLElement;

  @ViewChild('canvas') set content(content: ElementRef) {
    if (content) {
      this._canvas = content.nativeElement;
      if (this._canvas === undefined) return;
      this._service.canvas = this._canvas;
      this._service.buildViewer();
    }
  }
  @ViewChild(LayersComponent) layersComponent!: LayersComponent;

  isLoading = false;
  loadingMessage = '';
  layers: Layer[] = [];
  layersMenuOpen = false;
  canvasRect?: DOMRectReadOnly;

  onModelLoaded = effect(() => {
    if (this._events.modelLoaded()) this.modelLoaded.emit();
  });

  onDrawingClicked = effect(() => {
    const clickEvent = this._events.drawingClicked();
    if (clickEvent !== undefined) {
      this.drawingClick.emit(clickEvent);
    }
  });

  onViewerOptionsChange = effect(() => {
    this._service.viewerOptions = this.viewerOptions();
  });

  onFileAndSettings = effect(async () => {
    if (this.fileURL() === undefined) return;
    if (this.settings() === undefined) return;
    await this.loadFile(this.fileURL());
  });

  onBGColorChange = effect(() => {
    const bgColor = this.backgroundColor();
    if (bgColor === undefined) return;
    this.viewerOptions.update((options) => {
      options.clearColor = new Color(bgColor);
      return options;
    });
  });

  setDarkMode(darkMode: boolean) {
    if (this.backgroundColor() !== undefined) return;
    this.viewerOptions.update((options) => {
      options.clearColor = darkMode ? new Color('black') : new Color('white');
      return options;
    });
  }

  ngOnDestroy() {
    this._service.dispose();
    this._annotationService.dispose();
  }

  async loadFile(url: string) {
    this.isLoading = true;
    this._cdref.detectChanges();
    try {
      await this._service.load(url, this.settings().fonts);
    } catch (error) {
      console.warn(error);
    } finally {
      this.isLoading = false;
    }
    this.layers = this._service.getLayers();
    if (this.annotationMarkers().length) {
      this._annotationService.addAnnotations(this.annotationMarkers());
    }
  }

  trackProgress(phase: string) {
    switch (phase) {
      case 'font':
        this.loadingMessage = 'Fetching fonts...';
        break;
      case 'fetch':
        this.loadingMessage = 'Fetching file...';
        break;
      case 'parse':
        this.loadingMessage = 'Parsing file...';
        break;
      case 'prepare':
        this.loadingMessage = 'Preparing rendering data...';
        break;
    }
    this._cdref.detectChanges();
  }

  onResized(ev: ResizedEvent) {
    console.log('resize');
    this.canvasRect = ev.newRect;
    this._service.resize(this.canvasRect);
  }
}
