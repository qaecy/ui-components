import { Component, input } from '@angular/core';
import { LngLatLike } from 'mapbox-gl';
import { FlexContainer } from '../components/flexcontainer.component';
import { AppHeader } from '../components/app-header.component';
import { Button } from '../components/button/button.component';
import { ButtonIcon } from '../components/button/button-icon.component';
import { DocumentSearchView, DocumentSearchViewProperty, DocumentSearchViewSearchResult } from '../components/views/document-search-view.component';

@Component({
  selector: 'cue-document-search-page',
  imports: [
    FlexContainer,
    AppHeader,
    Button,
    ButtonIcon,
    DocumentSearchView
  ],
  template: `
    <cue-flexcontainer direction="column" style="flex: 1">
      <cue-app-header>
        <cue-flexcontainer end gap="m" align="center">
          <cue-button variant="tertiary" size="s" title="Assets">
            <cue-button-icon icon="unknown" />
          </cue-button>
          <cue-button variant="tertiary" size="s" title="Info">
            <cue-button-icon icon="unknown" />
          </cue-button>
          <cue-button variant="tertiary" size="s" title="Settings">
            <cue-button-icon icon="gear" />
          </cue-button>
          <cue-button>
            <cue-button-icon icon="user" />
          </cue-button>
        </cue-flexcontainer>
      </cue-app-header>
      <cue-document-search 
        [properties]="properties()" 
        [location]="location()" 
        [mapboxToken]="mapboxToken()" 
        [searchResults]="searchResults()" 
        [info]="info()">
      </cue-document-search>
    </cue-flexcontainer>
  `,
  styles: `:host{display: contents;}`,
})
export class DocumentSearchPage {
  properties = input<DocumentSearchViewProperty[]>([]);
  location = input<LngLatLike | undefined>(undefined);
  mapboxToken = input<string>();
  searchResults = input<DocumentSearchViewSearchResult[]>([]);
  info = input<string>('Search your project...');
}
