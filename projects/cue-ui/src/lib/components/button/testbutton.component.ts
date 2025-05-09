import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { TooltipDirective } from '../../directives/tooltip.directive';
import { ButtonIcon } from './button-icon.component';

@Component({
  selector: 'cue-testbutton',
  standalone: true,
  imports: [CommonModule, TooltipDirective, ButtonIcon],
  template: `<button
    [style]="getStyles()"
    [disabled]="disabled()"
    [cueTooltip]="tooltip()"
    tooltipSize="small"
    [tooltipPlacement]="'top'"
  >
    <ng-content></ng-content>
  </button>`,
  styles: `
  button {
    appearance: none;
    padding: 0;
    font: inherit;
    border: var(--cue-button-border-width) var(--cue-button-border-style)
      var(--cue-button-border-color);

    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: var(--cue-button-gap);

    height: var(--button-height);
    background-color: var(--background-color);
    border-radius: var(--cue-button-border-radius);

    &:focus {
      outline: none;
    }

    &:hover:not(:disabled), &:focus-within:not(:disabled) {
      outline: 1px solid var(--focus-color);
      outline-offset: 1px;
    }
  }
  `,
})
export class TestButton {
  variant = input<'primary' | 'secondary' | 'tertiary'>('primary');
  size = input<'xs' | 's' | 'm'>('m');
  tooltip = input<string>('');
  disabled = input(false);

  getStyles = computed(() => {
    const styles = [
      `
      padding: 0 var(--cue-button-${this.size()}-padding-x);

      --focus-color: var(--cue-button-${this.variant()}-focus-color);
      --cue-button-border-color: var(--cue-button-${this.variant()}-border-color);
      color: var(--cue-button-${this.variant()}-foreground);
      --background-color: var(--cue-button-${this.variant()}-background);

      --cue-icon-width: var(--cue-button-${this.size()}-icon-width);
      --button-height: var(--cue-button-${this.size()}-height);
      --cue-button-border-radius: var(--button-height);
      --button-label-padding-x: var(--cue-button-${this.size()}-label-padding-x);
    `,
      this.disabled()
        ? `
      color: var(--cue-button-${this.variant()}-disabled-foreground);
      --cue-button-border-color: var(--cue-button-${this.variant()}-disabled-border-color);
      --background-color: var(--cue-button-${this.variant()}-disabled-background);
    `
        : '',
    ];
    return styles.join('');
  });
}
