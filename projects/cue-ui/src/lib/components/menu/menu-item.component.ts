import { Component, computed, input } from '@angular/core';
import { FlexContainer } from '../flexcontainer.component';
import { Typography } from '../typography.component';

@Component({
  selector: 'cue-menu-item',
  imports: [FlexContainer, Typography],
  template:
    '<button class="getClass()"><ng-content select="[before]" /><cue-typography><ng-content /></cue-typography><div class="flexer"></div><ng-content select="[after]" /></button>',
  styles: `
    :host {
      display: contents;
    }

    button {
      appearance: none;
      font: inherit;
      display: flex;
      min-width: 8em;
      border: 0;
      align-items: center;
      justify-content: start;
      background: transparent;
      height: var(--cue-menu-item-height);
      border-radius: var(--cue-menu-item-border-radius);
      padding: 0 var(--cue-menu-item-padding-x);
      gap: 0 var(--cue-menu-item-gap);
      --cue-icon-width: var(--cue-menu-item-icon-size);
      background: var(--cue-menu-item-background-color);

      &:focus {
        outline: none;
      }

      &.selected {
        background: var(--cue-menu-item-selected-background-color);
      }

      &:hover:not(:disabled), &:focus:not(:disabled) {
        background: var(--cue-menu-item-focus-background-color);
      }
    }

    .flexer {
      flex: 1;
    }
  `,
})
export class MenuItem {
  selected = input<boolean | undefined>(undefined);
  getClass = computed(() => (this.selected() ? 'selected' : ''));
}
