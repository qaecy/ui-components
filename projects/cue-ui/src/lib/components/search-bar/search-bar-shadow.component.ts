import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Card, CardVariant } from '../card.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cue-search-bar-shadow',
  imports: [Card],
  template: `
    <cue-card [shadow]="true" variant="variant()">
      <ng-content />
    </cue-card>
  `,
  styles: [
    `
      :host {
        display: contents;
      }

      cue-card {
        border: 0;
        margin: calc(-1 * var(--cue-card-padding-y))
          calc(-1 * var(--cue-card-padding-x));
      }
    `,
  ],
})
export class SearchBarShadow {
  variant = input<CardVariant>('default');
}
