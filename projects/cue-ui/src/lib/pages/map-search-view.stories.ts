import type { Meta, StoryObj } from '@storybook/angular';
import { MapSearchView } from './map-search-view.component';

const mapboxToken =
  'pk.eyJ1IjoibWFkc2hvbHRlbiIsImEiOiJjbWFiMTYyc3EwOXM5MmtzYzRqcWJ0N2dzIn0.cPH3wfmHY6LbquPWzH5zdQ';
// const mapboxToken = "<MAPBOX_TOKEN>";

// 👇 Imports the required stories

const meta: Meta<MapSearchView> = {
  component: MapSearchView,
};

export default meta;
type Story = StoryObj<MapSearchView>;

const render = (args: any) => ({
  props: {
    mapboxToken: args.mapboxToken,
  },
  template: `<div style="width: 100%; height: 700px; font-family: var(--cue-font-family);">
        <cue-map-search [mapboxToken]="mapboxToken">
        </cue-map-search>
    </div>`,
});

export const Default: Story = {
  render,
  args: {
    mapboxToken,
  },
};
