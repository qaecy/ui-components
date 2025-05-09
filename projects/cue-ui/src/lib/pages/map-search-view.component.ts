import { Component, input } from '@angular/core';
import { MapComponent } from '../components';

@Component({
  selector: 'cue-map-search',
  imports: [MapComponent],
  template: `
    <cue-map
      style="display: block; height: 100%; width: 100%; min-height: 100px"
      [mapboxToken]="mapboxToken()"
    ></cue-map>
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
