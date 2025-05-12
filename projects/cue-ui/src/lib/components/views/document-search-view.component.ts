import { Component, computed, input, output, signal } from '@angular/core';
import { SplitLayoutComponent } from '../split-layout.component';
import {
  Card,
  KeyValComponent,
  MapComponent,
} from '../';
import { LngLatLike } from 'mapbox-gl';
import { ColumnDef, TableComponent } from '../table.component';
import { SearchBarComponent } from '../search-bar.component';
import { KeyValList } from '../key-val-list.component';
import { FlexContainer } from '../flexcontainer.component';
import { Container } from '../container.component';
import { Typography } from '../typography.component';
import { Button } from '../button/button.component';
import { ButtonIcon } from '../button/button-icon.component';
import { PDFViewer } from '../pdf-viewer/pdf-viewer.component';
import { TooltipDirective } from '../../directives';
import { GeoJSONFeatureCollection } from '../../utils/geojson/models';

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
  docURL?: () => Promise<string>;
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
    Typography,
    Button,
    ButtonIcon,
    PDFViewer,
    ButtonIcon,
    TooltipDirective,
  ],
  template: `
    <cue-flexcontainer style="flex: 1">
      <cue-split-layout
        mainContent
        [sizes]="[30, 70]"
        [minSizes]="[10, 200]"
        [gutterSize]="30"
        style="flex:1;"
      >
        <cue-container leftContent class="leftContent" style="height:100%">
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
              style="position:relative;flex:1"
              variant="default"
            >
              <cue-map
                borderRadius="var(--cue-card-border-radius)"
                [zoom]="10"
                [center]="center"
                [featureCollection]="featureCollection()"
                [mapboxToken]="token"
              />
            </cue-card>
            } }
          </cue-flexcontainer>
        </cue-container>

        <cue-flexcontainer rightContent style="height:100%;flex: 1;">
          <cue-card style="flex:1">
            <!-- DOCUMENT VIEW -->
            @if(pdfURL()){
            <div
              style="display: flex; flex-direction: column; align-items: flex-start; height: 100%"
            >
              <cue-button
                variant="accent"
                size="s"
                cueTooltip="Go back"
                (click)="closePDF()"
              >
                <cue-button-icon icon="arrow_back" />
              </cue-button>
              <div style="height: 500px; width: 100%;">
                <cue-pdf-viewer
                  style="height: 100%; width: 100%"
                  [src]="pdfURL()"
                  [original-size]="false"
                ></cue-pdf-viewer>
              </div>
            </div>
            }

            <!-- TABLE VIEW -->
            @else if(searchResults().length){
            <cue-table
              [data]="searchResults()"
              [clickableRows]="true"
              (clickedRow)="handleRowClick($event)"
              [columnDefs]="columnDefs"
              tooltipCol="summary"
            ></cue-table>
            }

            <!-- NO RESULTS -->
            @else {
            <div
              style="display: flex;  justify-content: center; align-items: center;"
            >
              <cue-typography>{{ info() }}</cue-typography>
            </div>
            }
          </cue-card>
        </cue-flexcontainer>
      </cue-split-layout>
    </cue-flexcontainer>
  `,
  styles: `:host{display: contents;}`,
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
  pdfURL = signal('');

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

  async handleRowClick(row: DocumentSearchViewSearchResult) {
    if (row.docURL === undefined) return;
    if (row.mime === 'application/pdf') {
      const pdfURL = await row.docURL();
      this.pdfURL.set(pdfURL);
    }
  }

  closePDF() {
    this.pdfURL.set('');
  }
}
