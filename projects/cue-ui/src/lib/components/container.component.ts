import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'cue-container',
  standalone: true,
  imports: [MatCardModule],
  template: `<div [style.width.px]="width()" [style.height.px]="height()">
    <ng-content />
  </div>`,
  styles: `
      div {
        display: flex;
        align-items: stretch;
        container-name: container-wrap;
        container-type: inline-size;

        & > * {
          flex: 1;
          max-width: 100%;
        }
      }
    `,
})
export class Container {
  width = input<number | undefined>(undefined);
  height = input<number | undefined>(undefined);
}
