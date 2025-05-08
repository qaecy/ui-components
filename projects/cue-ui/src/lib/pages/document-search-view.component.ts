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

export interface DocumentSearchViewProperty {
  key: string;
  value: string;
}

export interface DocumentSearchViewSearchResult {
  id: string;
  name: string;
  keywords: string[];
  summary: string;
  mime: string;
  size: number;
}

@Component({
  selector: 'cue-document-search',
  imports: [
    SplitLayoutComponent,
    MapComponent,
    CardComponent,
    KeyValComponent,
    TableComponent,
    SearchBarComponent
  ],
  template: `
    <cue-split-layout
      mainContent
      style="display: block; height: 100%; width: 100%; font-family: var(--cue-font-family)"
      [sizes]="[30, 70]"
      [minSizes]="[10, 200]"
      [gutterSize]="30"
    >
      <div leftContent class="left-content">
        <!-- SEARCH BOX -->
        <cue-card color="primary">
          <ng-content select="[searchBefore]"></ng-content>
          <cue-search-bar (valueSubmit)="doSearch.emit($event)"></cue-search-bar>
          <ng-content select="[searchAfter]"></ng-content>
        </cue-card>

        <!-- PROPERTIES -->
        @if(properties().length){
        <cue-card color="accent">
          @for(item of properties(); track $index){
          <cue-key-val [key]="item.key" [val]="item.value"></cue-key-val>
          }
        </cue-card>
        }

        <!-- MAP -->
        @if(mapboxToken(); as token){ @if(location(); as center){
        <cue-map
          style="height: 200px; width: calc(100% - 2px); border: 1px solid var(--cue-primary); border-radius: var(--cue-card-border-radius);"
          borderRadius="var(--cue-card-border-radius)"
          [zoom]="10"
          [center]="center"
          [featureCollection]="featureCollection()"
          [mapboxToken]="token"
        ></cue-map>
        } }
      </div>

      <div rightContent style="height: 100%;">
        <cue-card appearance="outlined" height="100%">
          @if(searchResults().length){
          <cue-table
            [data]="searchResults()"
            [columnDefs]="columnDefs"
            tooltipCol="summary"
          ></cue-table>
          } @else {
          <div style="display: flex; height: 100%; justify-content: center; align-items: center;">
            <span>{{ info() }}</span>
          </div>
          }
        </cue-card>
      </div>
    </cue-split-layout>
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
    console.log(featureCollection);
    return featureCollection;
  });

  columnDefs: ColumnDef[] = [];

  constructor(){
    this.columnDefs.push(new ColumnDef('name', 'Name', 'left'));
    const keywordsCol = new ColumnDef('keywords', "Keywords", "right");
    keywordsCol.type = "STRINGARRAY";
    this.columnDefs.push(keywordsCol);
    const sizeCol = new ColumnDef('size', "Size", "right");
    sizeCol.type = "DATASIZE";
    this.columnDefs.push(sizeCol);
    const mimeCol = new ColumnDef('mime', "Type", "center");
    mimeCol.type = "MIMEICON";
    this.columnDefs.push(mimeCol);
  }
}
