import { Component, input } from '@angular/core';
import { LngLatLike } from 'mapbox-gl';
import { FlexContainer } from '../components/flexcontainer.component';
import { Typography } from '../components/typography.component';
import {
  DocumentSearchView,
  DocumentSearchViewProperty,
  DocumentSearchViewSearchResult,
} from '../components/views/document-search-view.component';
import { SideNavComponent } from '../components';
import { AppWrap } from '../components/app-wrap.component';
import { SampleAppHeader } from './sample-app-header.component';

@Component({
  selector: 'cue-document-search-page',
  imports: [
    FlexContainer,
    DocumentSearchView,
    SideNavComponent,
    Typography,
    AppWrap,
    SampleAppHeader,
  ],
  template: `
    <cue-side-nav style="flex:1;height:100%;">
      <div sideNavContent style="padding: var(--cue-dim-padding-sub);">
        <cue-typography>Side Nav Content</cue-typography>
      </div>
      <cue-app-wrap mainContent>
        <cue-flexcontainer direction="column" style="flex: 1">
          <cue-map-search />
          <cue-document-search
            [properties]="properties()"
            [location]="location()"
            [mapboxToken]="mapboxToken()"
            [searchResults]="searchResults()"
            [info]="info()"
          >
          </cue-document-search>
        </cue-flexcontainer>
      </cue-app-wrap>
    </cue-side-nav>
  `,
  styles: `:host{display: contents;}`,
})
export class DocumentSearchSideNavPage {
  properties = input<DocumentSearchViewProperty[]>([]);
  location = input<LngLatLike | undefined>(undefined);
  mapboxToken = input<string>();
  searchResults = input<DocumentSearchViewSearchResult[]>([]);
  info = input<string>('Search your project...');
}
