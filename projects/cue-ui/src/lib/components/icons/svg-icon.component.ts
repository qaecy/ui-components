import {
  Component,
  computed,
  input,
  Pipe,
  ViewEncapsulation,
} from '@angular/core';
import svgs from './svg.json';
import { IconName } from './types';
import { SafeHtmlPipe } from '../../pipes';

@Component({
  selector: 'cue-svg-icon',
  standalone: true,
  imports: [SafeHtmlPipe],
  template: `<div [innerHTML]="this.getSvg() ?? '' | cueSafeHtml"></div>`,
  encapsulation: ViewEncapsulation.ShadowDom,
  styles: `
    svg {
      display: block;
      width: var(--cue-icon-width);
      height: auto;
    }
  `,
})
export class SvgIcon {
  name = input<IconName | undefined>(undefined);

  getSvg = computed(() => {
    return this.name() && svgs[this.name() as IconName];
  });
}
