import { Component, computed, input } from '@angular/core';
import { FlexContainer } from './flexcontainer.component';
import { Logo } from './logo.component';

@Component({
  selector: 'cue-app-header',
  standalone: true,
  imports: [FlexContainer, Logo],
  host: {
    '[style]': 'getStyles()',
  },
  template: `<cue-flexcontainer justify="space-between" gap="m" align="center">
    <div>
      <cue-logo style="width:var(--app-header--logo-width)" [active]="true" />
      <ng-content [select]="start" />
    </div>
    <ng-content [select]="end" />
  </cue-flexcontainer>`,
  styles: `
      :host {
        --app-header--logo-width:calc(77em / 16);
        display: contents;
      }
    `,
})
export class AppHeader {
  style = input<string>('');

  getStyles = computed(() => {
    return `
        ${this.style()}
    `;
  });
}
