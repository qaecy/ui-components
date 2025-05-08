import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { Icon, IconComponent } from './icon.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cue-search-bar',
  imports: [IconComponent],
  template: `
    <div
      class="search-container"
      [style.border-color]="borderColor()"
      [style.color]="textColor()"
      [style.background-color]="backgroundColor()"
    >
      <span style="margin-left: 8px">|</span>
      <input
        type="text"
        class="search-input"
        [placeholder]="placeholder()"
        (keyup)="update($event)"
      />
      @if(showSubmitButton()){
      <span
        (click)="submit()"
        class="search-button"
        [style.background-color]="searchIconBackground()"
      >
        <cue-icon class="search-icon" style="color: black; transform: translateY(2px)" [inline]="true" [icon]="submitIcon()"></cue-icon>
      </span>
      }
    </div>
  `,
  styles: [
    `
      .search-container {
        display: flex;
        gap: 1rem;
        width: 100%;
        padding: 8px;
        align-items: center;
        border-radius: 30px;
        font-size: 14px;
        font-family: var(--cue-font-family);
        width: calc(100% - 16px);
      }

      .search-input {
        all: unset;
        flex: 1;
        background-color: rgba(0, 0, 0, 0);
      }

      .search-input:focus {
        border-color: var(--qaecy-light-grey);
      }

      .search-button {
        display: flex;
        align-items: center;
        justify-content: center;
        background: none;
        border: none;
        height: 32px;
        width: 32px;
        border-radius: 16px;
        cursor: pointer;
      }

      ::placeholder {
        color: var(--text-color);
        opacity: 1; /* Firefox */
      }

      ::-ms-input-placeholder {
        /* Edge 12 -18 */
        color: var(--text-color);
      }
    `,
  ],
  host: {
    '[style.--text-color]': `textColor()`,
  },
})
export class SearchBarComponent {
  placeholder = input<string>('Search...');
  debounceTime = input<number>(200);
  showSubmitButton = input<boolean>(true);
  submitIcon = input<Icon>('search');

  //   borderColor = input<string>('var(--cue-extra-light-gray)');
  borderColor = input<string>('rgba(0,0,0,0)');
  backgroundColor = input<string>('var(--cue-info)');
  textColor = input<string>('var(--cue-extra-light-gray)');
  searchIconBackground = input<string>('var(--cue-accent)');

  valueChange = output<string>();
  valueSubmit = output<string>();

  private _debounceTimer?: NodeJS.Timeout;
  private _value = "";

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

  submit(){
    this.valueSubmit.emit(this._value);
  }
}
