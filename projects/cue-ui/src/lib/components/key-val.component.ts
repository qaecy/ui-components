import { Component, input } from '@angular/core';
import { Typography } from './typography.component';

@Component({
  selector: 'cue-key-val',
  imports: [Typography],
  template: ` <dt>
      <cue-typography size="s">{{ key() }}</cue-typography>
    </dt>
    <dd>
      <cue-typography [size]="size()">{{ val() }}</cue-typography>
    </dd>`,
  styles: [
    `
      dl {
        margin: 0;
      }
      dt,
      dd {
        margin: 0;
      }
    `,
  ],
})
export class KeyValComponent {
  size = input<'m' | 'l' | 'xl'>('m');
  key = input.required<string>();
  val = input.required<string>();
}
