import { Component, computed, input, output } from '@angular/core';
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
import { Container } from '../components/container.component';

export interface DocumentSearchViewProperty {
  size: 'm' | 'l' | 'xl';
  key: string;
  value: string;
}

export interface DocumentSearchViewSearchResult {
  id: string;
  name: string;
  keywords: string;
  summary: string;
  mime: string;
  size: number;
}

@Component({
  selector: 'cue-document-search',
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
    Container,
  ],
  template: `
    <cue-split-layout
      mainContent
      style="display: block; min-height: 100%; "
      [sizes]="[30, 70]"
      [minSizes]="[10, 200]"
      [gutterSize]="30"
    >
      <cue-container leftContent class="leftContent">
        <cue-flexcontainer direction="column">
          <!-- SEARCH BOX -->
          <cue-card variant="primary">
            <ng-content select="[searchBefore]"></ng-content>
            <cue-search-bar></cue-search-bar>
            <ng-content select="[searchAfter]"></ng-content>
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
          <cue-card
            [padded]="false"
            style="position:relative"
            variant="default"
          >
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
      </cue-container>

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
export class DocumentSearchView {
  properties = input<DocumentSearchViewProperty[]>([]);
  location = input<LngLatLike | undefined>(undefined);
  mapboxToken = input<string>();
  searchResults = input<DocumentSearchViewSearchResult[]>([]);
  info = input<string>('Search your project...');

  doSearch = output<string>();

  featureCollection = computed(() => {
    const center: any = this.location();
    if (center === undefined) return;
    const featureCollection = new GeoJSONFeatureCollection();
    featureCollection.id = 'Location';
    const coordinates: number[] = Array.isArray(center)
      ? center
      : [center.lng, center.lat];
    featureCollection.features = [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates,
        },
      },
    ];
    console.log(featureCollection);
    return featureCollection;
  });

  columnDefs: ColumnDef[] = [];

  constructor() {
    const nameCol = new ColumnDef('name', 'Name', 'left');
    nameCol.type = 'TRUNCATED';
    this.columnDefs.push(nameCol);
    const keywordsCol = new ColumnDef('keywords', 'Keywords', 'right');
    keywordsCol.type = 'TRUNCATED';
    this.columnDefs.push(keywordsCol);
    const sizeCol = new ColumnDef('size', 'Size', 'right');
    sizeCol.type = 'DATASIZE';
    this.columnDefs.push(sizeCol);
    const mimeCol = new ColumnDef('mime', 'Type', 'center');
    mimeCol.type = 'MIMEICON';
    this.columnDefs.push(mimeCol);
  }
}
