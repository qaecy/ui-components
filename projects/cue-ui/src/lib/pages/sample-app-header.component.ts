import { Component } from '@angular/core';
import { AppHeader, FlexContainer } from '../components';
import { Button } from '../components/button/button.component';
import { ButtonIcon } from '../components/button/button-icon.component';

@Component({
  selector: 'cue-map-search',
  imports: [FlexContainer, AppHeader, Button, ButtonIcon],
  template: `<cue-app-header>
    <cue-flexcontainer end gap="m" align="center">
      <cue-button variant="tertiary" size="s" title="Assets">
        <cue-button-icon icon="folder" />
      </cue-button>
      <cue-button variant="tertiary" size="s" title="Info">
        <cue-button-icon icon="layout" />
      </cue-button>
      <cue-button variant="tertiary" size="s" title="Settings">
        <cue-button-icon icon="settings" />
      </cue-button>
      <cue-button>
        <cue-button-icon icon="avatar" />
      </cue-button>
    </cue-flexcontainer>
  </cue-app-header> `,
})
export class SampleAppHeader {}
