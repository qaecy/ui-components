import { Component, computed, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'cue-flexcontainer',
  standalone: true,
  imports: [MatCardModule],
  template: `
    <div [style]="getStyles()">
      <ng-content></ng-content>
    </div>
  `,
  styles: `
      div {
        display: flex;
        gap: var(--cue-flex-gap);
      }
    `,
})
export class FlexContainer {
  direction = input<'row' | 'column'>('row');
  wrap = input<'nowrap' | 'wrap' | 'wrap-reverse'>('nowrap');
  align = input<'stretch' | 'start' | 'center' | 'end' | 'baseline'>('stretch');
  justify = input<'start' | 'center' | 'end' | 'space-between'>('start');

  getStyles = computed(() => {
    return `
        flex-direction: ${this.direction()};
        flex-wrap: ${this.wrap()};
        align-items: ${this.align()};
        justify-content: ${this.justify()};
    `;
  });
}
