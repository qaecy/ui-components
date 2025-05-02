import { CommonModule } from '@angular/common';
import { Component, computed, effect, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ProgressSpinnerComponent } from './progress-spinner.component';
import { IconComponent } from './icon.component';
import { TooltipDirective } from '../directives/tooltip.directive';
import { ButtonColor, Color, contrastColors, TooltipColor } from '../shared/colors';

@Component({
  selector: 'cue-button',
  standalone: true,
  imports: [MatButtonModule, CommonModule, ProgressSpinnerComponent, IconComponent, TooltipDirective],
  template: ` @switch (appearance()) { @case ("stroked") {
    <button mat-stroked-button [disabled]="disabled()" 
      [style.border-color]="colorVar()" [style.color]="textColor()"
      [cueTooltip]="tooltip()" tooltipSize="small" [tooltipColor]="tooltipColor()" [tooltipPlacement]="'top'">
      <ng-container [ngTemplateOutlet]="btnContent"></ng-container>
    </button>
    } @case ("filled") {
    <button mat-raised-button [disabled]="disabled()" 
      [style.background-color]="colorVar()" [style.color]="textColor()" 
      [cueTooltip]="tooltip()" tooltipSize="small" [tooltipColor]="tooltipColor()" [tooltipPlacement]="'top'">
      <ng-container [ngTemplateOutlet]="btnContent"></ng-container>
    </button>
    } }

    <ng-template #btnContent>
      <div style="display: flex; gap: 6px">
        @if(icon(); as iconStr){
          <cue-icon style="transform: translateY(1.5px); padding-right: 5px; margin-left: -5px" [icon]="iconStr" [inline]="true"></cue-icon>
        }
        <ng-content></ng-content>
        @if(failed()){
          <cue-icon style="transform: translateY(1.5px);" icon="warning" [inline]="true"></cue-icon>
        }
        @else if(loading()){
        <cue-progress-spinner
          [colorOuter]="textColor()"
          [colorInner]="textColor()"
          [inline]="true"
          [scale]="0.6"
        ></cue-progress-spinner>
        }
      </div>
    </ng-template>`,
  styles: ``,
})
export class ButtonComponent {
  appearance = input<'stroked' | 'filled'>('stroked');
  color = input<ButtonColor>("primary");
  loading = input(false);
  disabled = input(false);
  failed = input(false);
  icon = input<string|undefined>(undefined);
  tooltip = input<string>("")

  colorVar = computed(() => {
    if(this.disabled()) return "none";
    return `var(--cue-${this.color()})`;
  });
  textColor = computed(() => {
    const bgColor = this.color();
    if(this.failed()) return `var(--cue-error)`;
    if(this.disabled()) return `none`;
    if(this.appearance() === "stroked") return this.colorVar();
    const contrast = contrastColors.get(bgColor as Color);
    return `var(--cue-${contrast})`;
  });
  tooltipColor = computed<TooltipColor>(() => {
    if(this.failed()) return "error" as TooltipColor;
    return this.color() as TooltipColor;
  });
}
