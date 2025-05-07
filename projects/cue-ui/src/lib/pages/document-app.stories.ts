import type { Meta, StoryObj } from '@storybook/angular';

const mapboxToken = "pk.eyJ1IjoibWFkc2hvbHRlbiIsImEiOiJjbWFiMTYyc3EwOXM5MmtzYzRqcWJ0N2dzIn0.cPH3wfmHY6LbquPWzH5zdQ";
// const mapboxToken = "<MAPBOX_TOKEN>";

// 👇 Imports the required stories
import { DocumentSearchScreen } from './document-app.component';
 
const meta: Meta<DocumentSearchScreen> = {
  component: DocumentSearchScreen,
};
 
export default meta;
type Story = StoryObj<DocumentSearchScreen>;

const properties = [{
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
 
export const Full: Story = {
  args: {
    properties,
    location: [7.644993, 47.574627],
    mapboxToken,
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