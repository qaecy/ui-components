import type { Meta, StoryObj } from '@storybook/angular';
import { IconComponent, supportedIcons } from './icon.component';

const meta: Meta<IconComponent> = {
  title: 'Icon',
  component: IconComponent,
  argTypes: {
    icon: {
      control: {
        type: 'select',
      },
      options: supportedIcons,
    },
    inline: {
      control: {
        type: 'boolean',
      },
    },
  },
};

export default meta;
type Story = StoryObj<IconComponent>;

export const Default: Story = {
  args: {
    icon: 'filter',
    inline: false
  },
};
