import { NgStyle } from '@angular/common';
import { Component, computed, HostBinding, input } from '@angular/core';
@Component({
  selector: 'cue-flexcontainer',
  standalone: true,
  imports: [],
  host: {
    '[style]': 'getStyles()',
  },
  template: '<ng-content />',
  styles: `
      :host {
        display: flex;

        & > * {
          flex: 1;
          max-width: 100%;
        }
      }
    `,
})
export class FlexContainer {
  style = input<string>('');
  gap = input<'s' | 'm' | 'l'>('m');
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
        gap: var(--cue-flex-gap-${this.gap()});
        ${this.style()}
    `;
  });
}
