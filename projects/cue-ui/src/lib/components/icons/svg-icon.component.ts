import {
  Component,
  computed,
  input,
  Pipe,
  ViewEncapsulation,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import svgs from './svg.json';
import { IconName } from './types';

@Pipe({
  name: 'safeHtml',
  standalone: true,
})
export class SafeHtmlPipe {
  constructor(private sanitizer: DomSanitizer) {}
  transform(html: string) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}

@Component({
  selector: 'cue-svg-icon',
  standalone: true,
  imports: [SafeHtmlPipe],
  template: `<div [innerHTML]="this.getSvg() ?? '' | safeHtml"></div>`,
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
