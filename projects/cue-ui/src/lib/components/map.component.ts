import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  Output,
  ViewChild,
  computed,
  effect,
  input,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import mapboxgl, {
  AnyLayer,
  AnySourceData,
  LngLatLike,
  Map,
  MapMouseEvent,
  MapboxGeoJSONFeature,
} from 'mapbox-gl';
import {
  ResizedDirective,
} from '../directives/resized.directive';
import { DarkModeDirective } from '../directives/dark-mode.directive';

export class GeoJSONFeatureCollection {
  type = 'FeatureCollection';
  id?: string | number; // Optional identifier
  bbox?: number[]; // Optional bounding box
  properties?: { [key: string]: any };
  features: GeoJSONFeature[] = [];
}

export interface GeoJSONFeature<G extends Geometry = Geometry> {
  type: 'Feature';
  geometry: G;
  properties?: { [key: string]: any };
  bbox?: number[]; // Optional bounding box
  id?: string | number; // Optional identifier
}

export interface Geometry {
  type: string; // Type of geometry (Point, LineString, Polygon, etc.)
  coordinates?: number[] | number[][];
}

export interface LayerData {
  layer: AnyLayer;
  clickable: boolean;
}

export interface FeatureClickHoverEvent {
  feature: MapboxGeoJSONFeature;
  event: MouseEvent;
}
@Component({
  selector: 'cue-map',
  imports: [CommonModule, ResizedDirective, DarkModeDirective],
  template: `<div
    #map
    id="map"
    cueResized
    cueDarkMode
    (darkModeChange)="setDarkMode($event)"
    (resized)="onParentResize()"
  ></div>
  @if(error()){
    <span>{{error()}}</span>
  }`,
  styles: [
    `
      @import url('mapbox-gl/dist/mapbox-gl.css');
      #map {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: inherit; /* Inherits from host */
      }
      :host {
        display: block;
        position: relative;
        overflow: hidden; /* Ensures border-radius clips child elements */
      }
    `,
  ],
})
export class MapComponent implements OnDestroy {
  
  mapboxToken = input.required<string>(); // TODO: make this required
  center = input<LngLatLike>([8.5, 47.4]);
  zoom = input(2);
  featureCollection = input<GeoJSONFeatureCollection | undefined>(undefined);

  @Input() cluster = true;
  @Input() zoomToFit = true;

  private _height = signal<string>('300px');
  private _width = signal<string>('400px');
  borderRadius = input<string>('0');

  @Output() mapReady = new EventEmitter<void>();
  @Output() clickedMap = new EventEmitter<MapMouseEvent>();
  @Output() pannedMap = new EventEmitter<MapMouseEvent>();
  @Output() panningMap = new EventEmitter<MapMouseEvent>();
  @Output() clickedFeature = new EventEmitter<FeatureClickHoverEvent>();
  @Output() hoveredFeature = new EventEmitter<
    FeatureClickHoverEvent | undefined
  >();
  @Output() polygonArea = new EventEmitter<number>();
  @Output() polygonWKT = new EventEmitter<string>();

  @ViewChild('map') set mapContainer(content: ElementRef) {
    if (content) {
      this._mapContainer = content.nativeElement;
      if (this._mapContainer !== undefined) this._init(this._mapContainer);
    }
  }

  // Apply border radius to host
  @HostBinding('style.border-radius') get hostBorderRadius() {
    return this.borderRadius();
  }

  error = signal("");
  private readonly _darkMode = signal(this._getSystemColorPreference());
  private _styleId = computed(() => {
    return this._darkMode()
      ? 'madsholten/clwjh4xeu00q601pnczm07jq6'
      : 'madsholten/clwjh6ug900q701pn6eor8p51';
  });
  private _map?: Map;
  private _mapContainer?: HTMLElement;
  private _sourceIds: string[] = [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _mapReadyPromiseResolve: any;
  private _mapReady = new Promise<void>((resolve) => {
    this._mapReadyPromiseResolve = resolve;
  });

  private _sources: { [id: string]: AnySourceData } = {};
  private _sourceLayers: { [sourceId: string]: LayerData } = {};
  private _emittedReady = false;
  private _firstThemeReceived = false;
  private _attachedListeners: string[] = [];
  private _hoveredFeature = signal<MapboxGeoJSONFeature | undefined>(undefined);

  @HostBinding('style.height') get hostHeight() {
    return this._height();
  }

  @HostBinding('style.width') get hostWidth() {
    return this._width();
  }

  onCenterChange = effect(() => {
    this._map?.flyTo({
      center: this.center(),
      essential: true,
    });
  });

  onZoomChange = effect(() => {
    this._map?.flyTo({
        center: this.center(),
        zoom: this.zoom(),
        essential: true,
    });
  });

  onStyleChange = effect(() => {
    console.log(this._styleId())
    if (!this._firstThemeReceived) {
      this._firstThemeReceived = true;
      return;
    }
    console.log('toggled dark mode');
    if (this._map === undefined) return;
    this._updateStyle();
  });

  onFeatureCollectionChange = effect(() => {
    console.log(this.featureCollection());
    const featureCollection = this.featureCollection();
    if (featureCollection === undefined) return;
    const layer: AnyLayer = {
      id: `geojson-layer`,
      type: 'circle',
      source: 'geojson',
      paint: {
        'circle-radius': 4,
        'circle-stroke-width': 2,
        'circle-color': 'rgba(255,0,0,0.5)',
        'circle-stroke-color': 'white',
      },
    };
    this.loadGeoJSON('geojson', featureCollection, layer);
  });

  get sources(): { [id: string]: AnySourceData } {
    return this._sources;
  }

  get map(): Map | undefined {
    return this._map;
  }

  ngOnDestroy(): void {
    this._map?.remove();
    // this._map = undefined;
    if (this._mapContainer !== undefined) this._mapContainer.innerHTML = '';
    console.log('DESTROYED');
  }

  async loadGeoJSON(
    id: string,
    geoJSON: GeoJSONFeatureCollection,
    layer: AnyLayer,
    cluster = this.cluster,
    zoomToFit = this.zoomToFit
  ) {
    await this._mapReady;
    this.addSource(
      id,
      {
        type: 'geojson',
        data: geoJSON as any,
        cluster,
      },
      layer
    );
    if (zoomToFit) this.fitGeoJSONBBOX(geoJSON);
  }

  async fitGeoJSONBBOX(geoJSON: GeoJSONFeatureCollection, padding = 0.5) {
    const bbox: number[] | undefined = geoJSON.bbox;
    if (bbox === undefined) return;
    await this._mapReady;
    this._map?.fitBounds([
      [bbox[0] - padding, bbox[1] - padding], // [lng, lat] - southwestern corner of the bounds
      [bbox[2] + padding, bbox[3] + padding], // [lng, lat] - northeastern corner of the bounds
    ]);
  }

  async addSource(
    id: string,
    source: AnySourceData,
    layer?: AnyLayer,
    layerClickable = true
  ) {
    this._sources[id] = source;

    await this._mapReady;
    if (this._map === undefined) return;

    // Check if the source already exists and delete if so
    this._deleteSourceIfExists(id);

    this._sourceIds.push(id);

    const existing = this._map?.getSource(id);
    if (existing !== undefined) this._map?.removeSource(id);
    this._map?.addSource(id, source);

    if (layer !== undefined) this.addSourceLayer(id, layer, layerClickable);
  }

  addSourceLayer(sourceId: string, layer: AnyLayer, clickable = true) {
    this._sourceLayers[sourceId] = { layer, clickable };
    this._map?.addLayer(layer);
    if (clickable) this._setLayerEvents();
  }

  setDarkMode(darkMode: boolean){
    this._darkMode.set(darkMode);
  }

  zoomToCoordinate(coordinate: LngLatLike) {
    const currentZoom = this._map?.getZoom();
    if (!currentZoom) return;
    const newZoom = currentZoom + 1;
    console.log('zoomto');
    this._map?.flyTo({ center: coordinate, zoom: newZoom });
  }

  getImage(): string | undefined {
    const mapCanvas = this._map?.getCanvas();
    if (mapCanvas === undefined) return;
    console.log(mapCanvas);
    return mapCanvas.toDataURL('image/png'); // Get image as base64 string
  }

  onParentResize() {
    this._map?.resize();
  }

  private _deleteSourceIfExists(id: string) {
    const src = this._map?.getSource(id);
    if (src === undefined) return;
    this._map?.removeLayer(`${id}-layer`);
    this._map?.removeSource(id);
  }

  private _init(container: HTMLElement) {
    if (this._mapContainer !== undefined) this._mapContainer.innerHTML = '';
    mapboxgl.accessToken = this.mapboxToken();
    this._map = new Map({
      container,
      style: this._getMapStyleURL(),
      center: this.center(),
      zoom: this.zoom(),
    });

    // Add resize observer to handle container size changes
    this._initEventListeners(this._map);
  }

  private _initEventListeners(map: Map) {
    map.on('click', (e: MapMouseEvent) => {
      if (this._hoveredFeature() !== undefined) return;
      this.clickedMap.emit(e);
    });
    map.on('drag', (e: any) => {
      if (this._hoveredFeature() !== undefined) return;
      this.panningMap.emit(e);
    });
    map.on('dragend', (e: any) => {
      if (this._hoveredFeature() !== undefined) return;
      this.pannedMap.emit(e);
    });
    map.on('load', () => {
      if (!this._emittedReady) {
        console.log('READY');
        this._mapReadyPromiseResolve();
        this.mapReady.emit();
        this._emittedReady = true;
      }
    });
    map.on('error', (response) => {
      this.error.set(response.error.message)
    });
  }

  private _getMapStyleURL(): string {
    return `mapbox://styles/${this._styleId()}`;
  }

  // Updating style requires a full init in order to not loose the loaded layers
  // Zoom and center will be saved so camera can zoom back in
  private _updateStyle() {
    if (this._map === undefined) return;
    const zoom = this._map.getZoom();
    const center = this._map.getCenter();
    if (this._mapContainer !== undefined) this._init(this._mapContainer);
    setTimeout(() => {
      this._reAppendLayers();
      this._map?.flyTo({ center, zoom });
    }, 500);
  }

  // Necessary after style change
  private _reAppendLayers() {
    Object.keys(this._sources).forEach((id) => {
      this._deleteSourceIfExists(id);
      this._map?.addSource(id, this._sources[id]);
      this._map?.addLayer(this._sourceLayers[id].layer);
    });
    this._setLayerEvents();
  }

  private _setLayerEvents() {
    Object.keys(this._sourceLayers).forEach((id) => {
      const layerData = this._sourceLayers[id];
      const layer = layerData.layer;

      if (layerData.clickable && !this._attachedListeners.includes(id)) {
        this._map?.on('click', layer.id, (e) => {
          if (e.features === undefined) return;
          const props = e.features[0].properties;
          if (props && !props['cluster']) {
            this.clickedFeature.emit({
              feature: e.features[0],
              event: e.originalEvent,
            });
          }
        });

        // Set hover styling
        this._map?.on('mouseenter', layer.id, (e) => {
          const canvas = this._map?.getCanvas();
          if (canvas !== undefined) canvas.style.cursor = 'pointer';
          if (e.features === undefined) return;
          const props = e.features[0].properties;
          if (props && !props['cluster']) {
            this.hoveredFeature.emit({
              feature: e.features[0],
              event: e.originalEvent,
            });
            this._hoveredFeature.set(e.features[0]);
          }
        });

        // Remove hover styling
        this._map?.on('mouseleave', layer.id, (e) => {
          const canvas = this._map?.getCanvas();
          if (canvas !== undefined) canvas.style.cursor = ''; // Reset to default
          this.hoveredFeature.emit(undefined);
          this._hoveredFeature.set(undefined);
        });

        this._attachedListeners.push(id);
      }

      // Zoom if clicking a cluster
      this._map?.on('click', layer.id, (e) => {
        if (e.features === undefined) return;
        const props = e.features[0].properties;
        if (props && props['cluster']) {
          this.zoomToCoordinate(e.lngLat);
        }
      });
    });
  }

  private _getSystemColorPreference(): boolean {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
}
