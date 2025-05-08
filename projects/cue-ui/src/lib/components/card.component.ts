import { Component, computed, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CardColor, Color, contrastColors } from '../shared/colors';
import { ButtonComponent } from './button.component';
import { Icon } from './icon.component';

export interface CardButton {
  label: string;
  action: () => void;
  icon?: Icon;
  loading?: boolean;
  failed?: boolean;
  disabled?: boolean;
  appearance?: 'stroked' | 'filled';
  color?: CardColor;
  tooltip?: string;
}

const appearanceMap = {
  outlined: 'filled',
  raised: 'filled',
};

@Component({
  selector: 'cue-mat-card',
  standalone: true,
  imports: [MatCardModule, ButtonComponent],
  template: `
    <mat-card
      [style.background-color]="colorVar()"
      [style.color]="textColor()"
      [style.border-color]="strokeColor()"
      [appearance]="appearance()"
      [style.width]="width()"
      [style.height]="height()"
    >
      @if(title()){
      <mat-card-header>
        <mat-card-title>{{ title() }}</mat-card-title>
        @if(subTitle()){
        <mat-card-subtitle [style.color]="textColor()">{{
          subTitle()
        }}</mat-card-subtitle>
        }
        <ng-content select="[headerContent]"></ng-content>
      </mat-card-header>
      }

      <!-- Main content -->
      <mat-card-content [style.padding]="borderLess() ? '0' : '16px'">
        <ng-content></ng-content>
      </mat-card-content>

      @if(actionButtons().length > 0) {
      <ng-content select="[actions]">
        <mat-card-actions
          [align]="actionsAlign()"
          style="display: flex; gap: 8px"
        >
          @for(btn of actionButtonsStyled(); track $index) {
          <cue-button
            [appearance]="btn.appearance"
            [color]="btn.color"
            [loading]="btn.loading"
            [failed]="btn.failed"
            [disabled]="btn.disabled"
            [tooltip]="btn.tooltip"
            (click)="btn.action()"
            >{{ btn.label }}</cue-button
          >
          }
        </mat-card-actions>
      </ng-content>
      }
    </mat-card>
  `,
  styles: `
    mat-card {
      box-sizing: border-box;
    }
  `,
})
export class CardComponent {
  title = input<string>('');
  subTitle = input<string>('');
  color = input<CardColor>('primary');
  appearance = input<'outlined' | 'raised'>('raised');
  actionButtons = input<CardButton[]>([]);
  actionsAlign = input<'start' | 'end'>('end');
  height = input<string>('auto');
  width = input<string>('auto');
  borderLess = input<boolean>(false);

  actionButtonsStyled = computed(() =>
    this.actionButtons().map((btn) => {
      let color = btn.color;
      if (color === undefined) {
        if (this.appearance() === 'outlined') {
          color = this.color();
        } else {
          color = contrastColors.get(this.color() as Color) as CardColor;
        }
      }
      return {
        ...btn,
        loading: btn.loading ?? false,
        failed: btn.failed ?? false,
        disabled: btn.disabled ?? false,
        icon: btn.icon ?? undefined,
        tooltip: btn.tooltip ?? '',
        appearance:
          btn.appearance ??
          (appearanceMap[this.appearance()] as 'stroked' | 'filled'),
        color,
      };
    })
  );

  colorVar = computed(() =>
    this.appearance() === 'outlined' ? undefined : `var(--cue-${this.color()})`
  );
  strokeColor = computed(() =>
    this.appearance() === 'outlined' ? `var(--cue-${this.color()})` : `none`
  );
  textColor = computed(() => {
    const bgColor = this.color();
    if (this.appearance() === 'outlined') return this.colorVar();
    const contrast = contrastColors.get(bgColor as Color);
    return `var(--cue-${contrast})`;
  });
}
