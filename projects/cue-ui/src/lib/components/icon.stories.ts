import type { Meta, StoryObj } from '@storybook/angular';
import { IconComponent, supportedIcons } from './icon.component';

const meta: Meta<IconComponent> = {
  title: 'Icon',
  component: IconComponent,
  tags: ['autodocs'],
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
      description: 'If true, the icon will be displayed inline with the text.',
      defaultValue: false,
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

export const Inline: Story = {
  render: (args: any) => ({
    props: args,
    template: `<span style="font-family: var(--cue-font-family)">I'm an inline icon <cue-icon [icon]="icon" [inline]="inline"></cue-icon></span>`,
  }),
  args: {
    icon: 'filter',
    inline: true
  },
};

export const SVGIcon: Story = {
  args: {
    icon: 'file_pdf',
    inline: false
  },
};