import type { Meta, StoryObj } from '@storybook/angular';

const mapboxToken = "pk.eyJ1IjoibWFkc2hvbHRlbiIsImEiOiJjbWFiMTYyc3EwOXM5MmtzYzRqcWJ0N2dzIn0.cPH3wfmHY6LbquPWzH5zdQ";
// const mapboxToken = "<MAPBOX_TOKEN>";

// 👇 Imports the required stories
import { DocumentSearchScreen, Property, SearchResult } from './document-app.component';
 
const meta: Meta<DocumentSearchScreen> = {
  component: DocumentSearchScreen,
};
 
export default meta;
type Story = StoryObj<DocumentSearchScreen>;

const properties: Property[] = [{
  key: "Name",
  value: "BRÜCKE Grenze D_CH Basel"
},{
  key: "Type",
  value: "4A Brücke"
},{
  key: "Section",
  value: "12.02.08 (BS 02.08)"
},{
  key: "Inventory Object Number",
  value: "12.02.08.410.10"
}];

const results: SearchResult[] = Array.from({ length: 20 }, (_, index) => ({
  id: `${index + 1}`,
  name: `Test document ${index + 1}`,
  keywords: ["drawing", "diagram"],
  summary: `This is a test summary for document ${index + 1}`
}));
 
export const Full: Story = {
  args: {
    properties,
    location: [7.644993, 47.574627],
    mapboxToken,
    searchResults: results
  },
};

export const NoLocation: Story = {
  args: {
    properties
  },
};

export const BeforeResults: Story = {
  args: {
    properties,
    location: [7.644993, 47.574627],
    mapboxToken,
    searchResults: [],
    info: "Search your project..."
  },
};

export const NoResults: Story = {
  args: {
    properties,
    location: [7.644993, 47.574627],
    mapboxToken,
    searchResults: [],
    info: "The search returned no results"
  },
};