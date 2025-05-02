import { Component, input } from '@angular/core';

@Component({
  selector: 'cue-key-val',
  template: `<div class="container">
    <span class="key">{{ key() }}</span>
    <span class="val">{{ val() }}</span>
  </div>`,
  styles: [
    `
      .container {
        display: flex;
        flex-direction: column;
        font-family: var(--cue-font-family);
      }
      .key {
        font-size: 14px;
        font-weight: 600;
        font-style: normal;
        line-height: 22px;
        letter-spacing: 0.1px;
      }
      .val {
        font-size: 16px;
        font-weight: 400;
        font-size: 16px;
        font-style: normal;
        line-height: 24px;
        letter-spacing: 0.5px;
      }
    `,
  ],
})
export class KeyValComponent {
  key = input.required<string>();
  val = input.required<string>();
}
