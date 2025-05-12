import { Component, computed, input } from '@angular/core';

// TODO: dynamic tag ("as" input could be div/p/dd/dt/...)

@Component({
  selector: 'cue-typography',
  standalone: true,
  imports: [],
  template: `
    <div [style]="getStyles()">
      <ng-content></ng-content>
    </div>
  `,
})
export class Typography {
  as = input<string>('div');
  size = input<'xs' | 's' | 'm' | 'l' | 'xl'>('m');
  weight = input<'regular' | 'medium' | 'semibold'>('regular');
  align = input<'start' | 'end' | 'center'>('start');

  getStyles = computed(() => {
    return `
      font-family: var(--cue-font-family);
      font-size: var(--cue-font-${this.size()}-size);
      line-height: var(--cue-font-${this.size()}-line-height);
      letter-spacing: var(--cue-font-${this.size()}-letter-spacing);
      font-weight: var(--cue-font-weight-${this.weight()});
      text-align: ${this.align()}
    `;
  });
}
