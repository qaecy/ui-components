import type { Meta, StoryObj } from '@storybook/angular';
import { BIMFragmentsViewer } from './bim-fragments-viewer.component';

const meta: Meta<BIMFragmentsViewer> = {
  title: 'BIM Fragments Viewer',
  component: BIMFragmentsViewer,
  tags: ['autodocs'],
  argTypes: {
    
  },
};

export default meta;
type Story = StoryObj<BIMFragmentsViewer>;

export const Default: Story = {
  args: {

  },
};