import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { duplexArchitectureFull } from '../bim-tiles-viewer/duplex-architecture';
import { Typography } from '../typography.component';
import { AgentResponseFormatter } from './agent-response-formatter.component';
import { Card } from '../card.component';

const mapboxToken =
  'pk.eyJ1IjoibWFkc2hvbHRlbiIsImEiOiJjbWFiMTYyc3EwOXM5MmtzYzRqcWJ0N2dzIn0.cPH3wfmHY6LbquPWzH5zdQ';

const meta: Meta<AgentResponseFormatter> = {
  title: 'Agent response formatter',
  component: AgentResponseFormatter,
  tags: ['autodocs'],
  argTypes: {
    startPassive: {
      control: {
        type: 'boolean',
      },
      description:
        'This will load the component on the passive screen where a user first needs to interact with the component before the component is instantiated. Useful for heavy components.',
    },
  },
  decorators: [
    moduleMetadata({
      imports: [Typography, Card],
    }),
  ],
};

export default meta;
type Story = StoryObj<AgentResponseFormatter>;

const render = (args: any) => ({
  props: {
    md: args.md,
    context: args.context,
    startPassive: args.startPassive,
    simulateStream: args.simulateStream
  },
  template: `<cue-card><cue-typography>
  <cue-agent-response [md]="md" [context]="context" [startPassive]="startPassive" [simulateStream]="simulateStream"></cue-agent-response>
  </cue-typography></cue-card>`,
});

export const DocumentRef: Story = {
  render,
  args: {
    md: 'There are a total of 223 windows in the project <ref i=0></ref>, and of these 15 different types <ref i=1></ref>. <doc-refs [data]="context.refs"><doc-refs>',
    context: {
      refs: [
        {
          documentId: 'xx',
          fragmentId: 'yy',
          text: 'A BIM model from the discipline Architecture...',
          label: 'Model_A.ifc',
        },
        {
          documentId: 'aa',
          fragmentId: 'bb',
          text: 'A list of the windows in the project.',
          label: 'Windows.xlsx',
        },
      ],
    },
    startPassive: true,
  },
};

export const BIMModel: Story = {
  render,
  args: {
    md: 'The architectural BIM model is stored as */BIM-models/model.ifc*. The latest version was uploaded 3 weeks ago and looks like this:\n\n<bim-viewer [data]="context.bimViewer"></bim-viewer>',
    context: {
      bimViewer: { geometryDefinitions: [duplexArchitectureFull] },
    },
    startPassive: false,
  },
};

export const BIMModelPassive: Story = {
  render,
  args: {
    md: 'The architectural BIM model is stored as */BIM-models/model.ifc*. The latest version was uploaded 3 weeks ago and looks like this:\n\n<bim-viewer [data]="context.bimViewer"></bim-viewer>',
    context: {
      bimViewer: { geometryDefinitions: [duplexArchitectureFull] },
    },
    startPassive: true,
  },
};

const tableData = {
  rows: [
    { name: 'Amberg Group AG' },
    { name: 'Rhomberg Bau GmbH' },
    { name: 'Bundesamt für Strassen (ASTRA)' },
    { name: 'Implenia Schweiz AG' },
    { name: 'VSL International Ltd' },
    { name: 'Pini Group' },
  ],
  columns: [{ key: 'name', label: 'Name' }],
};
const mapFeatures = [
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [8.4745903, 47.4401465],
    },
    properties: {
      Name: 'Amberg Group AG',
    },
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [9.0728575, 47.4583023],
    },
    properties: {
      Name: 'Rhomberg Bau GmbH',
    },
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [8.752623, 47.493553],
    },
    properties: {
      Name: 'Bundesamt für Strassen (ASTRA)',
    },
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [8.0283565, 47.4217225],
    },
    properties: {
      Name: 'Implenia Schweiz AG',
    },
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [7.1743308, 46.892066],
    },
    properties: {
      Name: 'VSL International Ltd',
    },
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [6.6290925, 46.5148628],
    },
    properties: {
      Name: 'Pini Group',
    },
  },
];
export const Combined: Story = {
  render,
  args: {
    md: `There are 6 companies mentioned in the project.

Table view:

<table-simple [data]="context.table"></table-simple>

The companies' head quarters are shown on the map below:

<map [data]="context.map"></map>`,
    context: {
      table: tableData,
      map: {
        mapboxToken,
        features: mapFeatures,
      },
    },
    startPassive: true,
  },
};

export const CombinedChunked: Story = {
    render,
    args: {
        md: `Now the results are coming in chunks to simulate what it would look like if the markdown part was streamed from the server.
        
    There are 6 companies mentioned in the project.
    
    Table view:
    
    <table-simple [data]="context.table"></table-simple>
    
    The companies' head quarters are shown on the map below:
    
    <map [data]="context.map"></map>`,
        context: {
            table: tableData,
            map: {
                mapboxToken,
                features: mapFeatures,
            },
        },
        startPassive: true,
        simulateStream: true
    },
};