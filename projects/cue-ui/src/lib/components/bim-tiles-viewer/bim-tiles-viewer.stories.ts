import type { Meta, StoryObj } from '@storybook/angular';
import {
  BIMTilesViewer,
  BIMTilesViewerData,
} from './bim-tiles-viewer.component';
import { duplexArchitectureFull } from './duplex-architecture';

const meta: Meta<BIMTilesViewer> = {
  title: 'BIM Tiles Viewer',
  component: BIMTilesViewer,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<BIMTilesViewer>;

const render = (args: any) => ({
  props: {
    data: args.data,
  },
  template: `<cue-bim-tiles-viewer style="height: 500px" [data]="data"></cue-bim-tiles-viewer>`,
});

const DEMO_PROJECT_ID = 'demo-project';
const data = new BIMTilesViewerData(DEMO_PROJECT_ID);
data.geometryDefinitions = [duplexArchitectureFull];
data.urlAuthenticator = async (rawURL: string) =>
  `https://qaecy.github.io/demo-widget/${DEMO_PROJECT_ID}/tiles/${rawURL}`;

export const Default: Story = {
  render,
  args: {
    data,
  },
};