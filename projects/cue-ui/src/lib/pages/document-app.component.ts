import { Component, computed, input, Input, signal } from '@angular/core';
import { SplitLayoutComponent } from '../components/split-layout.component';
import {
  GeoJSONFeatureCollection,
  KeyValComponent,
  MapComponent,
  SideNavComponent,
} from '../components';
import { LngLatLike } from 'mapbox-gl';
import { CardComponent } from 'cue-ui';

export interface Property {
  key: string;
  value: string;
}

@Component({
  selector: 'document-app',
  imports: [SplitLayoutComponent, MapComponent, CardComponent, KeyValComponent],
  template: `
    <cue-split-layout
      mainContent
      style="display: block; height: 100%; width: 100%; font-family: var(--cue-font-family)"
      [sizes]="[30, 70]"
      [minSizes]="[10, 200]"
      [gutterSize]="30"
    >
      <div leftContent class="left-content">
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

        <!-- SEARCH BOX -->
        <cue-card color="primary">
          <p>Search card</p>
        </cue-card>
      </div>
      <div rightContent>Right</div>
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
export class DocumentSearchScreen {
  properties = input<Property[]>([]);
  location = input<LngLatLike | undefined>(undefined);
  mapboxToken = input<string>();

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
}
