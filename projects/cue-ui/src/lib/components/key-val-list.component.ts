import { Component } from '@angular/core';

@Component({
  selector: 'cue-key-val-list',
  imports: [],
  template: `<dl>
    <ng-content></ng-content>
  </dl>`,
  styles: [
    `
      dl {
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: var(--cue-grid-gap-s);
      }
    `,
  ],
})
export class KeyValList {}
