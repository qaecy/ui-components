import { Component, computed, input } from '@angular/core';
import { IconComponent } from './icon.component';
import { Typography } from './typography.component';
import mimeTypes from 'mime-types';

const colors = {
  red: '#E03833',
  blue: '#175EBB',
  neutral: '#9D9998',
};
const colorMap: { [mime: string]: string } = {
  'application/pdf': colors.red,
  'application/x-abiword': colors.blue,
  'application/msword': colors.blue,
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
    colors.blue,
  'application/vnd.oasis.opendocument.presentation': colors.blue,
  'application/vnd.oasis.opendocument.spreadsheet': colors.blue,
  'application/vnd.oasis.opendocument.text': colors.blue,
  'application/vnd.ms-powerpoint': colors.blue,
  'application/vnd.openxmlformats-officedocument.presentationml.presentation':
    colors.blue,
  'application/rtf': colors.blue,
  'application/vnd.ms-excel': colors.blue,
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
    colors.blue,
};

@Component({
  selector: 'cue-mime-icon',
  imports: [Typography],
  host: {
    '[class]': 'className()',
  },
  template: ` <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 30">
      <path
        fill="var(--cue-mimeicon-deco-color)"
        d="M16.4 0H4.1C1.8 0 0 1.8 0 4.1v22.3c0 2 1.6 3.6 3.6 3.6h16.8c2 0 3.6-1.6 3.6-3.6V7.6L16.4 0Z"
      />
      <path
        [attr.fill]="color()"
        d="M4.1 1C2.4 1 1 2.4 1 4.1v22.3C1 27.8 2.2 29 3.6 29h16.8c1.4 0 2.6-1.2 2.6-2.6V8l-7-7H4.1Z"
      />
      <path fill="#fff" d="M16 6c0 1.1.9 2 2 2h5l-7-7v5Z" opacity=".3" />
    </svg>
    <cue-typography size="xs" align="center" weight="semibold">{{
      label()
    }}</cue-typography>`,
  styles: `
  :host {
    display: block;
    position: relative;
    aspect-ratio: 30 / 24;
    width: var(--cue-dim-elem-m);
    &.size-xs {
      width: var(--cue-dim-elem-xs);
    }
    &.size-s {
      width: var(--cue-dim-elem-s);
    }

    & cue-typography {
      color: #fff;
      text-transform:uppercase;
      position: absolute;
      left: 50%;
      bottom: 24%;
      transform: translate(-50%,0);
    }
  }
  `,
})
export class MimeIconComponent {
  mime = input<string>('application/pdf');
  size = input<'xs' | 's' | 'm'>('m');

  cueIcon = computed(() => this.mime());
  color = computed(() => colorMap[this.mime()] ?? colors.neutral);
  label = computed(() => {
    const mime = this.mime();
    return mimeTypes.extension(mime) || '?';
  });
  className = computed(() => {
    return `size-${this.size()}`;
  });
}
