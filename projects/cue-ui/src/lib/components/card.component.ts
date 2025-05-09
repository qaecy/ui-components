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
  template: `
    <div [style]="getStyles()">
      <ng-content></ng-content>
    </div>
  `,
  styles: `
      div {
        border-radius: var(--cue-card-border-radius);
        border: 1px solid var(--cue-card-border-color);
      }
    `,
})
export class Card {
  variant = input<CardVariant>('primary');
  shadow = input<boolean>(false);
  padded = input<boolean>(true);

  getStyles = computed(() => {
    const color = this.variant() === 'fade' ? 'neutral' : this.variant();
    const styles = [
      `
      color: var(--cue-${color}Contrast);
      --background-color: var(--cue-${color});
      background-color: var(--background-color);
    `,
    ];
    switch (color) {
      case 'primary':
      case 'secondary':
        styles.push(`
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
          `);
    }
    if (this.padded()) {
      styles.push(`
        padding: var(--cue-card-padding-y) var(--cue-card-padding-x);
      `);
    }
    if (this.variant() === 'fade') {
      styles.push(`
          border: 0;
          background: linear-gradient(to bottom,var(--cue-${color}),var(--cue-main-background));
          `);
    }
    if (this.shadow()) {
      styles.push(`
          box-shadow: var(--cue-card-box-shadow);
          `);
    }
    return styles.join('');
  });
}
