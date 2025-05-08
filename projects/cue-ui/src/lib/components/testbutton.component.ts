import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { ProgressSpinnerComponent } from './progress-spinner.component';
import { IconComponent } from './icon.component';
import { TooltipDirective } from '../directives/tooltip.directive';
import { Typography } from './typography.component';

@Component({
  selector: 'cue-testbutton',
  standalone: true,
  imports: [
    CommonModule,
    ProgressSpinnerComponent,
    IconComponent,
    TooltipDirective,
    Typography,
  ],
  template: ` <button
      [style]="getStyles()"
      [disabled]="disabled()"
      [cueTooltip]="tooltip()"
      tooltipSize="small"
      [tooltipPlacement]="'top'"
    >
      <ng-container [ngTemplateOutlet]="btnContent"></ng-container>
    </button>

    <ng-template #btnContent>
      <cue-typography style="display: flex; gap: 6px">
        @if(icon(); as iconStr){
        <cue-icon
          style="transform: translateY(1.5px); padding-right: 5px; margin-left: -5px"
          [icon]="iconStr"
          [inline]="true"
        ></cue-icon>
        }
        <ng-content></ng-content>
        @if(failed()){
        <cue-icon
          style="transform: translateY(1.5px);"
          icon="warning"
          [inline]="true"
        ></cue-icon>
        } @else if(loading()){
        <cue-progress-spinner
          [inline]="true"
          [scale]="0.6"
        ></cue-progress-spinner>
        }
      </cue-typography>
    </ng-template>`,
  styles: `
  button {
    appearance: none;
    font: inherit;
    border: var(--cue-button-border-width) var(--cue-button-border-style) var(--cue-button-border-color);
    border-radius: var(--cue-button-border-radius);
  }
  `,
})
export class TestButton {
  variant = input<'primary' | 'secondary'>('secondary');
  size = input<'s' | 'm'>('m');
  loading = input(false);
  disabled = input(false);
  failed = input(false);
  icon = input<string | undefined>(undefined);
  tooltip = input<string>('');

  getStyles = computed(() => {
    const styles = [
      `
      --cue-button-border-color: var(--cue-button-${this.variant()}-border-color);
      color: var(--cue-button-${this.variant()}-foreground);
      background-color: var(--cue-button-${this.variant()}-background);
      --background-color: var(--cue-button-${this.variant()}-background);

      height: var(--cue-button-${this.size()}-height);
      padding: 0 var(--cue-button-${this.size()}-padding-x);
    `,
    ];
    return styles.join('');
  });
}
