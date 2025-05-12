import { Component, input } from '@angular/core';
import { Switch } from './switch.component';

@Component({
  selector: 'cue-darkmode-switch',
  standalone: true,
  imports: [Switch],
  host: { '[class.checked]': 'checked()' },
  template: `<cue-input-switch
    [checked]="checked()"
    icon="sun"
    iconChecked="moon"
  />`,
  styles: `
      :host {
        --cue-input-switch-background: #000;
        --cue-input-switch-indicator-background: var(--cue-color-green);
        --cue-input-switch-indicator-foreground: var(--cue-color-black);

        --cue-input-switch-checked-background: #000;
        --cue-input-switch-checked-indicator-background: var(--cue-color-green);
        --cue-input-switch-checked-indicator-foreground: var(--cue-color-black);

        @media(prefers-color-scheme: dark) {
          --cue-input-switch-background: var(--cue-color-lightgray);
          --cue-input-switch-checked-background: var(--cue-color-lightgray);
        }
      }
    `,
})
export class DarkmodeSwitch {
  // TODO: handling events from input field
  checked = input<boolean>(false);
}
