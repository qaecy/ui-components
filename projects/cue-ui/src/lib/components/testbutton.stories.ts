import type { Meta, StoryObj } from '@storybook/angular';
import { TestButton } from './testbutton.component';
import { supportedIcons } from './icon.component';

const meta: Meta<TestButton> = {
  title: 'TestButton',
  component: TestButton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: {
        type: 'select',
      },
      options: ['primary', 'secondary'],
    },
    size: {
      control: {
        type: 'select',
      },
      options: ['s', 'm'],
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
      options: ['', ...supportedIcons],
    },
  },
};

export default meta;
type Story = StoryObj<TestButton>;

const render = (args: any) => ({
  props: args,
  template: `<cue-testbutton
    variant="${args.variant}"
    size="${args.size}"
    [loading]="${args.loading}"
    [disabled]="${args.disabled}"
    [failed]="${args.failed}"
    icon="${args.icon}">
      Click Me!
    </cue-testbutton>`,
});

export const Default: Story = {
  render,
  args: {
    variant: 'secondary',
    size: 's',
    loading: false,
    disabled: false,
    failed: false,
    icon: '',
  },
};
