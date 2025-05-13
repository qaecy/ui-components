import { Component, computed, input } from '@angular/core';

export const cardVariants = [
  'default',
  'primary',
  'secondary',
  'accent',
  'fade',
];
export type CardVariant = (typeof cardVariants)[number];

@Component({
  selector: 'cue-card',
  standalone: true,
  imports: [],
  host: {
    '[style]': 'getStyles()',
    '[class]': 'getClass()',
    '[class.padded]': 'padded()',
    '[class.shadow]': 'shadow()',
  },
  template: `
    <div class="inner" [style.display]="innerDisplay()">
      <ng-content />
    </div>
  `,
  styles: `
    :host {
      display: block;
      border-radius: var(--cue-card-border-radius);
      border: 1px solid var(--cue-card-border-color);
      box-sizing: border-box;

      &.padded {
        padding: var(--cue-card-padding-y) var(--cue-card-padding-x);
      }

      &.shadow {
        box-shadow: var(--cue-card-box-shadow);
      }

      --cue-scrollbar-thumb-color: var(--cue-color-lightgray);
      body.dark &.variant-default {
        --cue-scrollbar-thumb-color: var(--cue-color-midgray);
      }


      &.variant-secondary, &.variant-primary {
          --cue-button-primary-background: var(--cue-color-ultralightgray);
          --cue-button-primary-focus-color: var(--cue-color-ultralightgray);
          --cue-button-primary-foreground: var(--cue-color-blue);
          --cue-button-primary-border-color: var(--cue-color-ultralightgray);
          --cue-button-primary-background: var(--cue-color-ultralightgray);

          --cue-button-primary-disabled-foreground: var(--cue-color-midgray);
          --cue-button-primary-disabled-background: var(--cue-color-lightgray);
          --cue-button-primary-disabled-border-color: var(--cue-color-lightgray);

          --cue-button-secondary-disabled-foreground: var(--cue-color-midgray);
          --cue-button-secondary-disabled-border-color: var(--cue-color-midgray);
      }

      &.variant-secondary {
        --cue-input-switch-checked-background: var(--cue-color-blue);
      }

      & > .inner {
        position:absolute;
        inset: var(--cue-card-padding-y) var(--cue-card-padding-x);
        overflow: auto;
      }
    }
    `,
})
export class Card {
  style = input<string>('');
  variant = input<CardVariant>('default');
  shadow = input<boolean>(false);
  padded = input<boolean>(true);
  scrollable = input<boolean>(false);
  maxHeight = input<string | undefined>(undefined);

  isScrollable = computed(
    () => this.scrollable() || this.maxHeight() !== undefined
  );

  getClass = computed(() => `variant-${this.variant()}`);

  getStyles = computed(() => {
    const color = this.variant() === 'fade' ? 'neutral' : this.variant();
    const styles = [
      `
      color: var(--cue-${color}Contrast);
      --background-color: var(--cue-${color});
      background-color: var(--background-color);
      max-height: ${this.maxHeight() ?? 'none'};
      position: ${this.isScrollable() ? 'relative' : undefined};
    `,
    ];
    if (this.variant() === 'fade') {
      styles.push(`
          background-image: linear-gradient(to bottom,var(--cue-${color}),var(--cue-main-background));
          `);
    }
    styles.push(this.style());
    return styles.join('');
  });

  innerDisplay = computed(() => (this.isScrollable() ? 'block' : 'contents'));
}
