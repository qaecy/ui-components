import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
  output,
  ViewChild,
} from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TruncateDirective } from '../directives/truncate.directive';

export const displayTypes = [
  'DEFAULT',
  'CHECKBOX',
  'COLOR',
  'HTMLELEMENT',
  'TRUNCATED',
];
export type DisplayType = (typeof displayTypes)[number];

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cue-table-cell',
  imports: [MatCheckboxModule, TruncateDirective],
  template: `<div
    class="container"
    #cell
    [class.right-aligned]="contentAlignment() === 'right'"
    [class.left-aligned]="contentAlignment() === 'left'"
    [class.center-aligned]="contentAlignment() === 'center'"
  >
    @if(valueType() === 'COLOR'){
    <div class="color" [style.background-color]="value()"></div>
    } @else if(valueType() === 'CHECKBOX'){
    <mat-checkbox
      [disabled]="!editable()"
      [checked]="value()"
      (change)="handleValueChange($event.checked)"
    ></mat-checkbox>
    } @else if(valueType() === 'TRUNCATED'){
    <span cueTruncate [truncateLength]="30" [innerHTML]="value()"></span>
    } @else if(valueType() === 'DEFAULT'){
    <span [innerHTML]="value()"></span>
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
        --mat-table-background-color: rgba(0, 0, 0, 0);
        --mat-paginator-container-background-color: rgba(0, 0, 0, 0);
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
}
