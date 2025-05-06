import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { GeoJSONFeatureCollection, MapComponent } from './map.component';
import { LngLatLike } from 'mapbox-gl';

const meta: Meta<MapComponent> = {
  title: 'Map',
  component: MapComponent,
  tags: ['autodocs'],
  argTypes: {
    featureCollection: {
      control: 'object'
    }
  },
};

const mapboxToken = "<MAPBOX_TOKEN>";

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
      style="height: 600px; width: 100%" 
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

export const Card: Story = {
  render: (args: any) => ({
    props: {
      mapboxToken: args.mapboxToken,
      borderRadius: args.borderRadius,
      center: args.center,
      zoom: args.zoom,
      featureCollection: args.featureCollection,
    },
    template: `<cue-map 
      style="height: 200px; width: 200px;" 
      [borderRadius]="borderRadius"
      [zoom]="zoom" 
      [center]="center" 
      [featureCollection]="featureCollection" 
      [mapboxToken]="mapboxToken">
    </cue-map>`,
  }),
  args: {
    mapboxToken,
    center,
    zoom: 12,
    featureCollection,
    borderRadius: '30px',
  },
};