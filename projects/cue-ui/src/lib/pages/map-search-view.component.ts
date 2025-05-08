import { Component, computed, input, Input, output, signal } from '@angular/core';
import { SplitLayoutComponent } from '../components/split-layout.component';
import {
    CardComponent,
  GeoJSONFeatureCollection,
  KeyValComponent,
  MapComponent,
  SideNavComponent,
} from '../components';
import { LngLatLike } from 'mapbox-gl';
import { ColumnDef, TableComponent } from '../components/table.component';
import { SearchBarComponent } from '../components/search-bar.component';

@Component({
  selector: 'cue-map-search',
  imports: [
    SplitLayoutComponent,
    MapComponent,
    CardComponent,
    KeyValComponent,
    TableComponent,
    SearchBarComponent
  ],
  template: `
    <cue-map style="display: block; height: 100%; width: 100%; min-height: 100px" [mapboxToken]="mapboxToken()"></cue-map>
  `,
  styles: [
    `
      .left-content {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
    `,
  ],
})
export class MapSearchView {
  mapboxToken = input.required<string>();
}
