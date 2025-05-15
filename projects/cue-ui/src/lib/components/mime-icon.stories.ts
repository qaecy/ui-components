import type { Meta, StoryObj } from '@storybook/angular';
import { MimeIcon } from './mime-icon.component';

const meta: Meta<MimeIcon> = {
  title: 'Mime Icon',
  component: MimeIcon,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['xs', 's', 'm'],
    },
  },
};

export default meta;
type Story = StoryObj<MimeIcon>;

export const Default: Story = {
  args: {
    mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    size: 'm',
  },
};

export const NonSupported: Story = {
  args: {
    mime: 'application/png',
    size: 'm',
  },
};
