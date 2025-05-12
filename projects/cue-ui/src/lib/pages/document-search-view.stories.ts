import type { Meta, StoryObj } from '@storybook/angular';

const mapboxToken = "<MAPBOX_TOKEN>";

// 👇 Imports the required stories
import { DocumentSearchView, DocumentSearchViewProperty, DocumentSearchViewSearchResult } from './document-search-view.component';

const meta: Meta<DocumentSearchView> = {
  component: DocumentSearchView,

};

export default meta;
type Story = StoryObj<DocumentSearchView>;

const properties: DocumentSearchViewProperty[] = [{
    size: 'l',
    key: 'Name',
    value: 'BRÜCKE Grenze D_CH Basel',
  },
  {
    size: 'm',
    key: 'Type',
    value: '4A Brücke',
  },
  {
    size: 'm',
    key: 'Section',
    value: '12.02.08 (BS 02.08)',
  },
  {
    size: 'm',
    key: 'Inventory Object Number',
    value: '12.02.08.410.10',
  },
];

const results: DocumentSearchViewSearchResult[] = Array.from({ length: 20 }, (_, index) => ({
  id: `${index + 1}`,
  name: `Test document ${index + 1}`,
  keywords: "drawing, diagram",
  size: Math.floor(Math.random() * (10000000 - 100 + 1)) + 100,
  mime: 'application/pdf',
  summary: `This is a test summary for document ${index + 1}`,
  docURL: async () => {
    console.log(`requesting Test document ${index + 1}`);
    return "https://ocw.mit.edu/courses/18-821-project-laboratory-in-mathematics-spring-2013/41c70fc8f822ec953739073e338142c7_MIT18_821S13_latexsample.pdf";
  }
}));

export const Full: Story = {
  args: {
    properties,
    location: [7.644993, 47.574627],
    mapboxToken,
    searchResults: results,
  },
};

export const NoLocation: Story = {
  args: {
    properties,
  },
};

export const BeforeResults: Story = {
  args: {
    properties,
    location: [7.644993, 47.574627],
    mapboxToken,
    searchResults: [],
    info: 'Search your project...',
  },
};

export const NoResults: Story = {
  args: {
    properties,
    location: [7.644993, 47.574627],
    mapboxToken,
    searchResults: [],
    info: 'The search returned no results',
  },
};
