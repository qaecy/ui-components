import { Component, input } from '@angular/core';

@Component({
  selector: 'cue-app-wrap',
  standalone: true,
  template: '<ng-content />',
  host: {
    '[style.minHeight]': 'minHeight()',
    '[style.minWidth]': 'minWidth()',
  },
  styles: `
    :host {
      flex: 1;
      display: block;
      --background-color: var(--cue-main-background);
      background-color: var(--background-color);
      color: var(--cue-main-foreground);
      padding: var(--cue-dim-padding-main);
      box-sizing: border-box;
      height: 100%;
      display: flex;
      flex-direction: column;
      container-name: cue-app-wrap;
      container-type: inline-size;
    }
    `,
})
export class AppWrap {
  minHeight = input<string>('40em');
  minWidth = input<string>('30em');
}
