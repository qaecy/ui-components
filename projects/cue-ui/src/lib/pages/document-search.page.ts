import { Component, input } from '@angular/core';
import { LngLatLike } from 'mapbox-gl';
import { FlexContainer } from '../components/flexcontainer.component';
import { AppWrap } from '../components/app-wrap.component';
import {
  DocumentSearchView,
  DocumentSearchViewKeyword,
  DocumentSearchViewProperty,
  DocumentSearchViewSearchResult,
} from '../components/views/document-search.view';
import { SampleAppHeader } from './sample-app-header.component';

@Component({
  selector: 'cue-document-search-page',
  imports: [FlexContainer, SampleAppHeader, DocumentSearchView, AppWrap],
  template: `
    <cue-app-wrap>
      <cue-flexcontainer direction="column" style="flex: 1">
        <cue-map-search />
        <cue-document-search
          [properties]="properties()"
          [keywords]="keywords()"
          [location]="location()"
          [mapboxToken]="mapboxToken()"
          [searchResults]="searchResults()"
          [info]="info()"
        >
        </cue-document-search>
      </cue-flexcontainer>
    </cue-app-wrap>
  `,
  styles: `:host{display: contents;}`,
})
export class DocumentSearchPage {
  properties = input<DocumentSearchViewProperty[]>([]);
  location = input<LngLatLike | undefined>(undefined);
  mapboxToken = input<string>();
  searchResults = input<DocumentSearchViewSearchResult[]>([]);
  keywords = input<DocumentSearchViewKeyword[]>([]);
  info = input<string>('Search your project...');
}
