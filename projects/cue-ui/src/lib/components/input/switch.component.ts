import { Component, input } from '@angular/core';
import { IconName } from '../icons/types';
import { SvgIcon } from '../icons/svg-icon.component';

@Component({
  selector: 'cue-input-switch',
  standalone: true,
  imports: [SvgIcon],
  host: { '[class.checked]': 'checked()', '[class.disabled]': 'disabled()' },
  template: ` <input
      type="checkbox"
      [checked]="checked()"
      [disabled]="disabled()"
    />
    <div class="indicator">
      @if(checked() && iconChecked()){
      <cue-svg-icon [name]="iconChecked()" />
      } @else if(icon()){
      <cue-svg-icon [name]="icon()" />
      }
    </div>`,
  styles: `
      :host {
        --cue-input-switch-height: var(--cue-dim-elem-m);

        --cue-input-switch-width: calc(var(--cue-input-switch-height) * 1.7);
        --cue-input-switch-inset: 4px;
        --cue-input-switch-indicator-width: calc(
          var(--cue-input-switch-height) - (2 * var(--cue-input-switch-inset))
        );
        --cue-input-switch-icon-width: calc(
          var(--cue-input-switch-indicator-width) -
            (2 * var(--cue-input-switch-inset))
        );

        &[size="xs"]{
          --cue-input-switch-height: var(--cue-dim-elem-xs);
          --cue-input-switch-inset: 2px;
        }
        &[size="s"]{
          --cue-input-switch-height: var(--cue-dim-elem-s);
        }

        @container cue-container (width < 20em) {
          --cue-input-switch-height: var(--cue-dim-s-elem-m);
          &[size="xs"]{
            --cue-input-switch-height: var(--cue-dim-s-elem-xs);
          }
          &[size="s"]{
            --cue-input-switch-height: var(--cue-dim-s-elem-s);
          }
        }

        display: block;
        position:relative;
        height: var(--cue-input-switch-height);
        width: var(--cue-input-switch-width);
        border-radius: var(--cue-input-switch-height);
        --cue-icon-width: var(--cue-input-switch-icon-width);
        background: var(--cue-input-switch-background);
        transition: background-color .4s ease;

        &.checked {
          background: var(--cue-input-switch-checked-background);
        }

        &.disabled {
          background: var(--cue-input-switch-disabled-background);
        }

        .indicator {
          pointer-events: none;
          position:absolute;
          left: var(--cue-input-switch-inset);
          top: var(--cue-input-switch-inset);
          width: var(--cue-input-switch-indicator-width);
          aspect-ratio: 1;
          border-radius: 50%;
          display: flex;
          align-items:center;
          justify-content:center;
          background-color: var(--cue-input-switch-indicator-background);
          color: var(--cue-input-switch-indicator-foreground);
          transition: left .4s ease,  background-color .4s ease,  color .4s ease;
        }

        &.checked .indicator {
          left: calc(var(--cue-input-switch-width) - var(--cue-input-switch-inset) - var(--cue-input-switch-indicator-width));
          background: var(--cue-input-switch-checked-indicator-background);
          color: var(--cue-input-switch-checked-indicator-foreground);
        }

        &.disabled .indicator {
          background: var(--cue-input-switch-disabled-indicator-background);
          color: var(--cue-input-switch-disabled-indicator-foreground);
        }
      }
      input {
        all: unset;
        position: absolute;
        inset: 0;
        border-radius: var(--cue-input-switch-height);

        &:focus-visible:not(:disabled) + .indicator {
          outline: 1px solid var(--cue-input-switch-focus-color);
          outline-offset: 2px;
        }
      }
    `,
})
export class Switch {
  size = input<'xs' | 's' | 'm'>('m');
  icon = input<IconName | undefined>(undefined);
  iconChecked = input<IconName | undefined>(undefined);
  disabled = input<boolean>(false);
  // TODO: handling events from input field
  checked = input<boolean>(false);
}
