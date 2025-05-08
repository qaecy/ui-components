import { Component, computed, input } from '@angular/core';
import { IconComponent } from './icon.component';

const colorMap: { [mime: string]: string } = {
  'application/pdf': '#C20A09',
};

const labelMap: { [mime: string]: string } = {
  'application/pdf': 'PDF',
};

@Component({
  selector: 'cue-mime-icon',
  imports: [IconComponent],
  template: `<div
    style="display: flex; flex-direction: column; align-items: center"
  >
    <cue-icon
      icon="file"
      [inline]="inline()"
      [style.color]="color()"
    ></cue-icon>
    <span
      style="font-size: 10px; line-height: 10px; font-family: Poppins; transform: translateY(-5px)"
      >{{ label() }}</span
    >
  </div>`,
})
export class MimeIconComponent {
  mime = input<string>('application/pdf');
  inline = input(false);

  cueIcon = computed(() => this.mime());
  color = computed(() => colorMap[this.mime()] ?? 'black');
  label = computed(() => {
    const mime = this.mime();
    console.log(labelMap[mime]);
    if (labelMap[mime] !== undefined) return labelMap[mime];
    else mime.split('/')[1].toUpperCase();
    return mime;
  });
}
