import { Component } from '@angular/core';
import {
  DarkmodeSwitch,
  Menu,
  MenuWrap,
  MenuItem,
  ButtonIcon,
  ButtonLabel,
  Button,
  AppHeader,
  FlexContainer,
} from '../components';
@Component({
  selector: 'cue-map-search',
  imports: [
    FlexContainer,
    AppHeader,
    Button,
    ButtonLabel,
    ButtonIcon,
    DarkmodeSwitch,
    Menu,
    MenuWrap,
    MenuItem,
  ],
  template: `<cue-app-header>
    <cue-flexcontainer end gap="m" align="center">
      <cue-darkmode-switch />
      <cue-button variant="tertiary" size="m" title="Assets">
        <cue-button-icon icon="folder" />
      </cue-button>
      <cue-button variant="tertiary" size="m" title="Info">
        <cue-button-icon icon="layout" />
      </cue-button>
      <cue-button variant="tertiary" size="m" title="Settings">
        <cue-button-icon icon="settings" />
      </cue-button>

      <cue-menu position="bottomleft">
        <cue-button #trigger trigger variant="tertiary">
          <cue-button-padder />
          <cue-button-label>De</cue-button-label>
          <cue-button-padder>
            <cue-button-icon icon="arrow-dropdown" />
          </cue-button-padder>
        </cue-button>
        <cue-menu-wrap menu>
          <cue-menu-item selected> De </cue-menu-item>
          <cue-menu-item> Fr </cue-menu-item>
          <cue-menu-item> It </cue-menu-item>
        </cue-menu-wrap>
      </cue-menu>

      <cue-button>
        <cue-button-icon icon="avatar" />
      </cue-button>
    </cue-flexcontainer>
  </cue-app-header> `,
})
export class SampleAppHeader {}
