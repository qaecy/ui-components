import { Component, computed, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'cue-container',
  standalone: true,
  imports: [MatCardModule],
  host: {
    '[style.max-width]': 'width()',
    '[style.max-height]': 'height()',
    '[style]': 'getStyles()',
  },
  template: '<ng-content />',
  styles: `
      :host {
        display: flex;
        align-items: stretch;
        container-name: cue-container;
        container-type: inline-size;

        & > * {
          flex: 1;
          max-width: 100%;
        }
      }
    `,
})
export class Container {
  width = input<string>('auto');
  height = input<string>('auto');
  style = input<string>('');
  getStyles = computed(() => this.style());
}
