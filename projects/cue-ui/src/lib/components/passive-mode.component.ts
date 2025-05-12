import { Component, input, output } from '@angular/core';
import { Button } from './button/button.component';
import { ButtonLabel } from './button/button-label.component';
import { ButtonIcon } from './button/button-icon.component';
import { ButtonPadder } from './button/button-padder.component';
import { IconName } from './icons/types';

@Component({
  selector: 'cue-passive-mode',
  imports: [Button, ButtonLabel, ButtonIcon, ButtonPadder],
  template: `<div class="box" [style.height]="height()">
    <cue-button variant="accent" (click)="activate.emit()">
        <cue-button-padder>
            <cue-button-icon [icon]="icon()"></cue-button-icon>
        </cue-button-padder>
        <cue-button-label>{{label()}}</cue-button-label>
    </cue-button>
  </div>`,
  styles: [
    `
      .box {
        border: 1px solid;
        border-radius: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    `,
  ],
})
export class PassiveMode {
  height = input<string>('200px');
  icon = input.required<IconName>();
  label = input.required<string>();
  activate = output<void>();
}
