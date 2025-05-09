import { Component, input } from '@angular/core';
import { Typography } from '../typography.component';

@Component({
  selector: 'cue-button-label',
  standalone: true,
  imports: [Typography],
  template: `<div>
    <cue-typography [size]="fontSize()">
      <ng-content />
    </cue-typography>
  </div>`,
  styles: `
   div {
    transform: translate(0,0.05em);
  }
  `,
})
export class ButtonLabel {
  fontSize = input<'s' | 'm' | 'l'>('m');
}
