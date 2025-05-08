import { Component, computed, input } from '@angular/core';
import { SplitLayoutComponent } from '../components/split-layout.component';
import {
  Card,
  GeoJSONFeatureCollection,
  KeyValComponent,
  MapComponent,
} from '../components';
import { LngLatLike } from 'mapbox-gl';
import { ColumnDef, TableComponent } from '../components/table.component';
import { SearchBarComponent } from '../components/search-bar.component';
import { KeyValList } from '../components/key-val-list.component';
import { FlexContainer } from '../components/flexcontainer.component';

export interface Property {
  size: 'm' | 'l' | 'xl';
  key: string;
  value: string;
}

export interface SearchResult {
  id: string;
  name: string;
  keywords: string[];
  summary: string;
}

@Component({
  selector: 'document-app',
  imports: [
    SplitLayoutComponent,
    MapComponent,
    Card,
    KeyValComponent,
    TableComponent,
    SearchBarComponent,
    Card,
    KeyValList,
    FlexContainer,
  ],
  template: `
    <cue-split-layout
      mainContent
      style="display: block; min-height: 100%; "
      [sizes]="[30, 70]"
      [minSizes]="[10, 200]"
      [gutterSize]="30"
    >
      <cue-flexcontainer direction="column" leftContent class="leftContent">
        <!-- SEARCH BOX -->
        <cue-card variant="primary">
          <cue-search-bar></cue-search-bar>
        </cue-card>

        <!-- PROPERTIES -->
        @if(properties().length){
        <cue-card variant="accent">
          <cue-key-val-list>
            @for(item of properties(); track $index){
            <cue-key-val
              [size]="item.size"
              [key]="item.key"
              [val]="item.value"
            ></cue-key-val>
            }
          </cue-key-val-list>
        </cue-card>
        }

        <!-- MAP -->
        @if(mapboxToken(); as token){ @if(location(); as center){
        <cue-card [padded]="false" style="position:relative" variant="default">
          <cue-map
            style="width:100%"
            borderRadius="var(--cue-card-border-radius)"
            [zoom]="10"
            [center]="center"
            [featureCollection]="featureCollection()"
            [mapboxToken]="token"
          ></cue-map>
        </cue-card>
        } }
      </cue-flexcontainer>

      <div rightContent style="height: 100%;">
        <cue-card>
          @if(searchResults().length){
          <cue-table
            [data]="searchResults()"
            [columnDefs]="columnDefs"
            tooltipCol="summary"
          ></cue-table>
          } @else {
          <div
            style="display: flex; height: 100%; justify-content: center; align-items: center;"
          >
            <span>{{ info() }}</span>
          </div>
          }
        </cue-card>
      </div>
    </cue-split-layout>
  `,
})
export class DocumentSearchScreen {
  properties = input<Property[]>([]);
  location = input<LngLatLike | undefined>(undefined);
  mapboxToken = input<string>();
  searchResults = input<SearchResult[]>([]);
  info = input<string>('Search your project...');

  featureCollection = computed(() => {
    const center: any = this.location();
    if (center === undefined) return;
    const featureCollection = new GeoJSONFeatureCollection();
    featureCollection.id = 'Location';
    const coordinates: number[] = Array.isArray(center)
      ? center
      : [center.lat, center.lng];
    featureCollection.features = [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates,
        },
      },
    ];
    return featureCollection;
  });

  columnDefs: ColumnDef[] = [];

  constructor() {
    this.columnDefs.push(new ColumnDef('name', 'Name', 'left'));
    const keywordsCol = new ColumnDef('keywords', 'Keywords', 'right');
    keywordsCol.type = 'STRINGARRAY';
    this.columnDefs.push(keywordsCol);
  }
}
