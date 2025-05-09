import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { Card, CardVariant } from './card.component';
import { Button } from './button/button.component';
import { ButtonIcon } from './button/button-icon.component';
import { ButtonVariant } from './button/types';
import { IconName } from './icons/types';
import { Typography } from './typography.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cue-search-bar',
  imports: [Button, ButtonIcon, Typography],
  template: `
    <div class="wrap" [style]="wrapStyles()">
      <cue-typography>
        <input
          type="text"
          class="search-input"
          [placeholder]="placeholder()"
          (keyup)="update($event)"
        />
      </cue-typography>
      @if(showSubmitButton()){
      <cue-button
        (click)="submit()"
        class="search-button"
        [variant]="buttonVariant()"
      >
        <cue-button-icon [icon]="submitIcon()" />
      </cue-button>
      }
    </div>
  `,
  styles: [
    `
      .wrap {
        --height: calc(64rem / 16);
        border-radius: var(--height);
        position: relative;
        height: var(--height);
        display: flex;
        align-items: stretch;
      }

      cue-button {
        position: absolute;
        right: calc(10em / 16);
        top: 50%;
        transform: translate(0, -50%);
      }

      cue-typography {
        display: contents;

        & > div {
          flex: 1;
          display: flex;
          align-items: stretch;
        }
      }

      input {
        all: unset;
        font: inherit;
        padding: 0 2em;
        flex: 1;
        min-width: 0;
        width: 100%;
        height: 100%;
        background-color: transparent;
        color: inherit;
        border-radius: calc(64rem / 16);

        &:focus-visible {
          outline: 1px solid currentColor;
          outline-offset: 2px;
        }

        &::placeholder {
          color: currentColor;
          opacity: 1; /* Firefox */
        }

        &::-ms-input-placeholder {
          /* Edge 12 -18 */
          color: currentColor;
        }
      }
    `,
  ],
})
export class SearchBarComponent {
  placeholder = input<string>('Search...');

  debounceTime = input<number>(200);
  variant = input<CardVariant>('secondary');

  showSubmitButton = input<boolean>(true);
  submitIcon = input<IconName>('paperplane');

  buttonVariant = input<ButtonVariant>('accent');

  valueChange = output<string>();
  valueSubmit = output<string>();

  private _debounceTimer?: NodeJS.Timeout;
  private _value = '';

  update(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this._value = inputElement.value;

    // Clear existing timer
    clearTimeout(this._debounceTimer);

    // Set new timer
    this._debounceTimer = setTimeout(() => {
      this.valueChange.emit(this._value);
    }, this.debounceTime()); // 200ms debounce time
  }

  submit() {
    this.valueSubmit.emit(this._value);
  }

  wrapStyles = computed(() => {
    return `
        color: var(--cue-${this.variant()}Contrast);
        background-color: var(--cue-${this.variant()});
    `;
  });
}
