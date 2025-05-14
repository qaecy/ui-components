import { Component } from '@angular/core';
import { FlexContainer } from '../flexcontainer.component';

@Component({
  selector: 'cue-menu-wrap',
  imports: [FlexContainer],
  template: '<ng-content />',
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--cue-menu-gap);
      padding: var(--cue-menu-padding-y) var(--cue-menu-padding-x);
      border-radius: var(--cue-menu-border-radius);
      border: 1px solid var(--cue-menu-border-color);
      background: var(--cue-menu-background-color);
      color: var(--cue-menu-foreground-color);
    }
  `,
})
export class MenuWrap {}
