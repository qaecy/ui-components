import type { Meta, StoryObj } from '@storybook/angular';
import { ButtonComponent, supportedColors } from './button.component';
import { supportedIcons } from './icon.component';

const meta: Meta<ButtonComponent> = {
  title: 'Button',
  component: ButtonComponent,
  argTypes: {
    appearance: {
      control: {
        type: 'select',
      },
      options: ['stroked', 'filled'],
    },
    color: {
      control: {
        type: 'select',
      },
      options: supportedColors,
    },
    loading: {
      control: {
        type: 'boolean',
      },
    },
    icon: {
      control: {
        type: 'select',
      },
      options: ["", ...supportedIcons],
    },
  },
};

export default meta;
type Story = StoryObj<ButtonComponent>;

const render = (args: any) => ({
  props: args,
  template: `<cue-button 
    appearance="${args.appearance}" 
    color="${args.color}"
    [loading]="${args.loading}" 
    [disabled]="${args.disabled}" 
    [failed]="${args.failed}" 
    icon="${args.icon}">
      Click Me!
    </cue-button>`,
});

export const Default: Story = {
  render,
  args: {
    appearance: 'stroked',
    color: "primary",
    loading: false,
    disabled: false,
    failed: false,
    icon: "",
  },
};

export const Filled: Story = {
  render,
  args: {
    appearance: 'filled',
    color: "primary",
    loading: false,
    disabled: false,
    failed: false,
    icon: "",
  },
};
