import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  input,
  output,
  ViewChild,
} from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TruncateDirective } from '../directives/truncate.directive';
import { MimeIconComponent } from './mime-icon.component';

export const displayTypes = [
  'CHECKBOX',
  'COLOR',
  'DEFAULT',
  'HTMLELEMENT',
  'DATASIZE',
  'STRINGARRAY',
  'TRUNCATED',
  'MIMEICON',
];
export type DisplayType = (typeof displayTypes)[number];

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cue-table-cell',
  imports: [MatCheckboxModule, TruncateDirective, MimeIconComponent],
  template: `<div
    class="container"
    #cell
    [class.right-aligned]="contentAlignment() === 'right'"
    [class.left-aligned]="contentAlignment() === 'left'"
    [class.center-aligned]="contentAlignment() === 'center'"
  >
    <!-- SPECIAL CASES -->

    <!-- COLOR -->
    @if(valueType() === 'COLOR'){
    <div class="color" [style.background-color]="value()"></div>
    }

    <!-- CHECKBOX -->
    @else if(valueType() === 'CHECKBOX'){
    <mat-checkbox
      [disabled]="!editable()"
      [checked]="value()"
      (change)="handleValueChange($event.checked)"
    ></mat-checkbox>
    }

    <!-- TRUNCATED -->
    @else if(valueType() === 'TRUNCATED'){
    <span cueTruncate [truncateLength]="30" [innerHTML]="value()"></span>
    }

    <!-- MIMEICON -->
    @else if(valueType() === 'MIMEICON'){
    <cue-mime-icon [mime]="value()" size="s"></cue-mime-icon>
    }

    <!-- DEFAULT CASE -->
    @else {
    <span [innerHTML]="htmlValue()"></span>
    }
  </div> `,
  styles: [
    `
      .color {
        height: 12px;
        width: 12px;
        border: 1px solid #fff;
        border-radius: 5px;
      }
      .container {
        display: flex;
        font-family: var(--cue-font-family);
        --mat-table-background-color: var(--background-color);
        --mat-paginator-container-background-color: var(--background-color);
      }
      ::ng-deep .right-aligned {
        justify-content: flex-end;
      }
      ::ng-deep .left-aligned {
        justify-content: flex-start;
      }
      ::ng-deep .center-aligned {
        justify-content: center;
      }
    `,
  ],
})
export class TableCellComponent {
  value = input.required<any>();
  valueType = input<DisplayType>('DEFAULT');
  contentAlignment = input<'left' | 'right' | 'center'>('left');
  editable = input(true);
  valueChange = output<any>();

  htmlValue = computed(() => {
    const type = this.valueType();
    switch (type) {
      case 'STRINGARRAY':
        return this.value().join(', ');
      case 'DATASIZE':
        return this._humanFileSize(this.value());
      default:
        return this.value();
    }
  });

  private _htmlAppended = false;
  @ViewChild('cell') set cell(content: ElementRef) {
    if (content) {
      if (this.valueType() === 'HTMLELEMENT') {
        if (!this._htmlAppended) {
          let htmlElement = this.value();
          if (typeof htmlElement === 'string') {
            const stringValue = htmlElement;
            htmlElement = document.createElement('div');
            htmlElement.innerHTML = stringValue;
          }
          content.nativeElement.appendChild(htmlElement);
          this._htmlAppended = true;
        }
      }
    }
  }

  handleValueChange(newValue: any) {
    this.valueChange.emit(newValue);
  }

  private _humanFileSize(bytes: number, si = false, dp = 1) {
    const thresh = si ? 1000 : 1024;

    if (Math.abs(bytes) < thresh) {
      return bytes + ' B';
    }

    const units = si
      ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
      : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
    let u = -1;
    const r = 10 ** dp;

    do {
      bytes /= thresh;
      ++u;
    } while (
      Math.round(Math.abs(bytes) * r) / r >= thresh &&
      u < units.length - 1
    );

    return bytes.toFixed(dp) + ' ' + units[u];
  }
}
