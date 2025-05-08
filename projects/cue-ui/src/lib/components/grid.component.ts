import { Component, computed, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'cue-grid',
  standalone: true,
  imports: [MatCardModule],
  template: `
    <div [style]="getStyles()">
      <ng-content></ng-content>
    </div>
  `,
  styles: `
      div {
        display: grid;
        gap: var(--cue-grid-gap);
      }
    `,
})
export class Grid {
  columns = input<number>(1);

  getStyles = computed(() => {
    return `
        grid-template-columns: repeat(${this.columns()}, minmax(0, 1fr));
    `;
  });
}
