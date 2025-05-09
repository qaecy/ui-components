import { Component, input } from '@angular/core';
import { SvgIcon } from '../icons/svg-icon.component';
import { IconName } from '../icons/types';

@Component({
  selector: 'cue-button-icon',
  standalone: true,
  imports: [SvgIcon],
  template: `<cue-svg-icon slot="slot()" [name]="icon()"></cue-svg-icon>`,
})
export class ButtonIcon {
  icon = input<IconName>('unknown');
  slot = input<'before' | 'after'>('before');
}
