import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'cue-button-padder',
  standalone: true,
  template: `<div
    [style.justifyContent]="justify()"
    [style.min-width]="widthStyle()"
  >
    <ng-content></ng-content>
  </div>`,
  styles: `
  div {
    display: flex;
    align-items: center;
    min-height:1px;
  }
  `,
})
export class ButtonPadder {
  justify = input<'start' | 'center' | 'end'>('start');
  size = input<'s' | 'm' | 'l'>('l');

  widthStyle = computed(
    () => `var(--cue-button-label-padding-${this.size()}-x)`
  );
}
