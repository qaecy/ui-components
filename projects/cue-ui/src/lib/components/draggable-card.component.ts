import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  EventEmitter,
  Input,
  Output,
  input,
  output,
} from '@angular/core';
import { CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Card, CardVariant } from './card.component';
import { Grid } from './grid.component';
import { Typography } from './typography.component';
import { FlexContainer } from './flexcontainer.component';
import { SvgIcon } from './icons/svg-icon.component';

export const positions = [
  'top-left',
  'top-right',
  'bottom-left',
  'bottom-right',
];
export type Position = (typeof positions)[number];

@Component({
  imports: [
    CommonModule,
    Card,
    Grid,
    Typography,
    FlexContainer,
    SvgIcon,
    CdkDrag,
  ],
  selector: 'cue-draggable-card',
  template: `<cue-card
    class="panel"
    cdkDrag
    [variant]="variant()"
    [shadow]="shadow()"
    [padded]="padded()"
    [style.top]="
      position() === 'top-left' || position() === 'top-right'
        ? '0.5rem'
        : 'null'
    "
    [style.bottom]="
      position() === 'bottom-left' || position() === 'bottom-right'
        ? '5rem'
        : 'null'
    "
    [style.left]="
      position() === 'top-left' || position() === 'bottom-left'
        ? '0.5rem'
        : 'null'
    "
    [style.right]="
      position() === 'top-right' || position() === 'bottom-right'
        ? '0.5rem'
        : 'null'
    "
  >
    <cue-typography>
      <cue-grid>
        <cue-flexcontainer justify="end" [style.padding]="padded() ? '0' : '10px'">
          @if(label() && label() !== "undefined"){
          <cue-typography size="l">
            {{ label() }}
          </cue-typography>
          }
          <span style="width: 100%"></span>
          <cue-svg-icon
            name="close"
            style="cursor: pointer;"
            (click)="close($event)"
          ></cue-svg-icon>
        </cue-flexcontainer>
        <ng-content></ng-content>
      </cue-grid>
    </cue-typography>
  </cue-card>`,
  styles: [
    `
      .panel {
        position: absolute;
        width: fit-content;
      }
    `,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DraggableCard {
  label = input<string>('');
  variant = input<CardVariant>('default');
  shadow = input<boolean>(false);
  padded = input<boolean>(true);
  showCloseBtn = input(true);
  position = input('top-left');
  clickedClose = output<void>();

  close(event: Event) {
    event.stopPropagation();
    event.stopImmediatePropagation();
    this.clickedClose.emit();
  }
}
