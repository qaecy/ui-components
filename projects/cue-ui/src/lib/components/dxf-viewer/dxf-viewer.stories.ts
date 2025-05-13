import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { DXFViewer } from './dxf-viewer.component';
import { dxfSample } from './dxf-sample';
import { Card } from '../card.component';
import { DXFViewerSettings } from './dxf-viewer.settings';

const meta: Meta<DXFViewer> = {
  title: 'DXF Viewer',
  component: DXFViewer,
  tags: ['autodocs'],
  argTypes: {},
  decorators: [
    moduleMetadata({
      imports: [Card],
    }),
  ],
};

const fileURL = URL.createObjectURL(
  new Blob([dxfSample], { type: 'application/dxf' })
);

export default meta;
type Story = StoryObj<DXFViewer>;

const render = (args: any) => ({
  props: {
    fileURL: args.fileURL,
    settings: args.settings,
  },
  template: `<cue-card style="width: 90%; height: 500px;">
      <cue-dxf-viewer [fileURL]="fileURL" [settings]="settings"></cue-dxf-viewer>
    </cue-card>`,
});

export const Default: Story = {
  render,
  args: {
    fileURL,
    settings: new DXFViewerSettings()
  },
};

const settings = new DXFViewerSettings();
settings.visibility.ui.showLayerPanel = true;
export const LayerLegend: Story = {
  render,
  args: {
    fileURL,
    settings
  },
};
