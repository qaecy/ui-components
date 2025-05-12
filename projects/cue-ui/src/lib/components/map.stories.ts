import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { MapComponent } from './map.component';
import { LngLatLike } from 'mapbox-gl';
import { Card } from './card.component';
import { GeoJSONFeatureCollection } from '../utils/geojson/models';

const meta: Meta<MapComponent> = {
  title: 'Map',
  component: MapComponent,
  decorators: [
    moduleMetadata({
      imports: [Card],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    featureCollection: {
      control: 'object',
    },
    mapboxToken: {
      control: {
        type: 'text',
      },
      description: 'API Token for mapbox (Required!)',
    },
  },
};

const mapboxToken = '<MAPBOX_TOKEN>';

const center: LngLatLike = [8.4721927, 47.4401767];
const featureCollection = new GeoJSONFeatureCollection();
featureCollection.id = 'Amberg';
featureCollection.features = [
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: center,
    },
    properties: {
      name: 'Amberg Group AG',
    },
  },
];

export default meta;
type Story = StoryObj<MapComponent>;

export const Default: Story = {
  render: (args: any) => ({
    props: args,
    template: `<cue-map
      [zoom]="${args.zoom}"
      [center]="${JSON.stringify(args.center)}"
      mapboxToken="${args.mapboxToken}">
    </cue-map>`,
  }),
  args: {
    mapboxToken,
    center,
    zoom: 2,
    featureCollection,
  },
};

export const CardSample: Story = {
  render: (args: any) => ({
    props: {
      mapboxToken: args.mapboxToken,
      borderRadius: args.borderRadius,
      center: args.center,
      zoom: args.zoom,
      featureCollection: args.featureCollection,
    },
    template: `<cue-card style="flex:1"><cue-map
      [zoom]="zoom"
      [center]="center"
      [featureCollection]="featureCollection"
      [mapboxToken]="mapboxToken"/></cue-card>`,
  }),
  args: {
    mapboxToken,
    center,
    zoom: 12,
    featureCollection,
    borderRadius: '30px',
  },
};
