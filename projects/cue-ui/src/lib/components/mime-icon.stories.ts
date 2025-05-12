import type { Meta, StoryObj } from '@storybook/angular';
import { MimeIconComponent } from './mime-icon.component';

const meta: Meta<MimeIconComponent> = {
  title: 'Mime Icon',
  component: MimeIconComponent,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['xs', 's', 'm'],
    },
  },
};

export default meta;
type Story = StoryObj<MimeIconComponent>;

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
