import type { Meta, StoryObj } from '@storybook/angular';
import {
  BIMFragmentsViewer,
  BIMFragmentsViewerData,
} from './bim-fragments-viewer.component';

const meta: Meta<BIMFragmentsViewer> = {
  title: 'BIM Fragments Viewer',
  component: BIMFragmentsViewer,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<BIMFragmentsViewer>;

const data: BIMFragmentsViewerData = {
  models: [
    { id: 'backbone', name: 'Backbone', fileURL: 'models/220425_BACKBONE.fragments' },
    { id: 'dfab', name: 'DFAB', fileURL: 'models/220425_DFAB.fragments' },
    { id: 'hilo', name: 'HILO', fileURL: 'models/220425_HILO.fragments' },
    { id: 'm2c', name: 'M2C', fileURL: 'models/220425_M2C.fragments' },
    { id: 'sprint', name: 'SPRINT', fileURL: 'models/220425_SPRINT.fragments' },
    { id: 'swf', name: 'SWF', fileURL: 'models/220425_SWF.fragments' },
    { id: 'umar', name: 'UMAR', fileURL: 'models/220425_UMAR.fragments' },
    { id: 'visionwood', name: 'VISIONWOOD', fileURL: 'models/220425_VISIONWOOD.fragments' },
    { id: 'nest', name: 'NEST', fileURL: 'models/231121_NEST.fragments' }
  ],
};
const render = (args: any) => ({
  props: {
    data: args.data,
  },
  template: `<cue-bim-fragments-viewer style="height: 500px" [data]="data"></cue-bim-fragments-viewer>`,
});

export const Default: Story = {
  render,
  args: {
    data,
  },
};
