import { Component, computed, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'cue-grid',
  standalone: true,
  imports: [MatCardModule],
  host: {
    '[style]': 'getStyles()',
  },
  template: '<ng-content />',
  styles: `
      :host {
        display: grid;
      }
    `,
})
export class Grid {
  style = input<string>('');
  gap = input<'s' | 'm' | 'l'>('m');
  columns = input<number>(1);

  getStyles = computed(() => {
    return `
        grid-template-columns: repeat(${this.columns()}, minmax(0, 1fr));
        gap: var(--cue-grid-gap-${this.gap()});
        ${this.style()}
    `;
  });
}
