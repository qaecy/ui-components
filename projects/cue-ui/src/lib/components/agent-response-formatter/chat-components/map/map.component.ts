import {
  Component,
  computed,
  contentChildren,
  effect,
  input,
  signal,
} from '@angular/core';
import { LngLatLike, MapboxGeoJSONFeature } from 'mapbox-gl';
import { MapData } from '../models';
import { FeatureClickHoverEvent, MapComponent } from '../../../map.component';
import { PassiveMode } from '../../../passive-mode.component';
import { KeyValList } from '../../../key-val-list.component';
import { buildFeatureCollection } from '../../../../utils/geojson/build-tools';
import { GeoJSONFeatureCollection } from '../../../../utils/geojson/models';
import { KeyVal } from '../../../key-val.component';

@Component({
  selector: 'app-map',
  imports: [MapComponent, KeyVal, KeyValList, PassiveMode],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class InChatMap {
  data = input<MapData>();
  startPassive = input<boolean>(true);
  loadDeferred = false;

  features = computed(() => this.data()?.features ?? []);
  featureProperties = computed<{ key: string; val: string }[]>(() => {
    const properties = this.hoveredFeature()?.properties;
    if (!properties || properties === undefined) return [];
    return Object.keys(properties).map((key) => ({
      key,
      val: properties[key],
    }));
  });
  mapboxToken = computed(() => this.data()?.mapboxToken ?? '');
  featureCollection = signal<GeoJSONFeatureCollection | undefined>(undefined);

  // @ViewChild(MapComponent) mapbox!: MapComponent;
  mapbox = contentChildren(MapComponent);
  lngLat: LngLatLike = [8.5, 47];
  zoom = 1;

  hoveredFeature = signal<MapboxGeoJSONFeature | undefined>(undefined);

  plotFeatures = effect(async () => {
    const features = this.features();
    if (!features.length) {
      this.featureCollection.set(undefined);
      return;
    }
    const geoJSON = await buildFeatureCollection(features);
    this.featureCollection.set(geoJSON);
  });

  setHovered(ev: FeatureClickHoverEvent | undefined) {
    if (ev === undefined) this.hoveredFeature.set(undefined);
    else {
      this.hoveredFeature.set(ev.feature);
    }
  }
}
