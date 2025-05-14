import type { Meta, StoryObj } from '@storybook/angular';
import {
  BIMFragmentsViewer,
  BIMFragmentsViewerData,
} from './bim-fragments-viewer.component';
import { ModelDef } from '../bim-tiles-viewer/bim-tiles-viewer.component';

const meta: Meta<BIMFragmentsViewer> = {
  title: 'BIM Fragments Viewer',
  component: BIMFragmentsViewer,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<BIMFragmentsViewer>;

const allModels = [
  {
    id: 'backbone',
    name: 'Backbone',
    fileURL: 'models/220425_BACKBONE.fragments',
  },
  { id: 'dfab', name: 'DFAB', fileURL: 'models/220425_DFAB.fragments' },
  { id: 'hilo', name: 'HILO', fileURL: 'models/220425_HILO.fragments' },
  { id: 'm2c', name: 'M2C', fileURL: 'models/220425_M2C.fragments' },
  { id: 'sprint', name: 'SPRINT', fileURL: 'models/220425_SPRINT.fragments' },
  { id: 'swf', name: 'SWF', fileURL: 'models/220425_SWF.fragments' },
  { id: 'umar', name: 'UMAR', fileURL: 'models/220425_UMAR.fragments' },
  {
    id: 'visionwood',
    name: 'VISIONWOOD',
    fileURL: 'models/220425_VISIONWOOD.fragments',
  },
  { id: 'nest', name: 'NEST', fileURL: 'models/231121_NEST.fragments' },
];
const data: BIMFragmentsViewerData = {
  models: allModels,
};
const render = (args: any) => ({
  props: {
    data: args.data,
    showModelList: args.showModelList,
    loadInstantly: args.loadInstantly,
  },
  template: `<cue-bim-fragments-viewer style="height: 500px" [data]="data" [loadInstantly]="loadInstantly" [showModelList]="showModelList"></cue-bim-fragments-viewer>`,
});

export const Default: Story = {
  render,
  args: {
    data: {
      models: allModels,
    },
    loadInstantly: false,
    showModelList: true,
  },
};

export const SingleModel: Story = {
  render,
  args: {
    data: {
      models: [allModels[0]],
    },
    loadInstantly: true,
    showModelList: false,
  },
};

export const AllModelsInstantLoad: Story = {
  render,
  args: {
    data: {
      models: allModels,
    },
    loadInstantly: true,
    showModelList: false,
  },
};
