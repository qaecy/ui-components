import { Component, computed, input, ViewEncapsulation } from '@angular/core';
import svgs from './svg.json';
import { IconName } from './types';
import { SvgIcon } from './svg-icon.component';
import { FlexContainer } from '../flexcontainer.component';
import { Typography } from '../typography.component';
import { Card } from '../card.component';

const iconNames = Object.keys(svgs);

@Component({
  selector: 'cue-svg-icon-overview',
  standalone: true,
  imports: [SvgIcon, FlexContainer, Typography, Card],
  template: ` <cue-card>
    <cue-flexcontainer wrap="wrap">
      @for (iconName of iconNames; track iconName) {
      <cue-flexcontainer
        direction="column"
        gap="s"
        align="center"
        style="flex: 0 0 5em"
      >
        <cue-svg-icon [name]="iconName" />
        <cue-typography>{{ iconName }}</cue-typography>
      </cue-flexcontainer>
      }
    </cue-flexcontainer>
  </cue-card>`,
  encapsulation: ViewEncapsulation.ShadowDom,
  styles: `
    svg {
      display: block;
      width: var(--cue-icon-width);
      height: auto;
    }
  `,
})
export class SvgIconOverview {
  name = input<IconName | undefined>(undefined);
  iconNames = iconNames as IconName[];

  getSvg = computed(() => {
    return this.name() && svgs[this.name() as IconName];
  });
}
