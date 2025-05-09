import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { TestButton } from './testbutton.component';
import { ButtonIcon } from './button-icon.component';
import { ButtonLabel } from './button-label.component';
import { ButtonPadder } from './button-padder.component';
import { IconName } from '../icons/svg-icon.component';

const meta: Meta<{
  variant: string;
  size: string;
  label: string | undefined;
  iconBefore: IconName | undefined;
  iconAfter: IconName | undefined;
  disabled: boolean;
}> = {
  title: 'TestButton',
  component: TestButton,
  decorators: [
    moduleMetadata({
      imports: [ButtonIcon, ButtonLabel, ButtonPadder],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: {
        type: 'select',
      },
      options: ['primary', 'secondary', 'tertiary'],
    },
    size: {
      control: {
        type: 'select',
      },
      options: ['xs', 's', 'm'],
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
    [disabled]="${args.disabled}">
      <cue-button-padder>
        <cue-button-icon icon="gear"></cue-button-icon>
      </cue-button-padder>
      <cue-button-label>Click Me!</cue-button-label>
      <cue-button-padder justify="end">
        <cue-button-icon icon="loading"></cue-button-icon>
      </cue-button-padder>
    </cue-testbutton>`,
});

export const Default: Story = {
  render,
  args: {
    variant: 'primary',
    size: 'm',
    disabled: false,
  },
};

export const IconOnly: Story = {
  render: (args: any) => ({
    props: args,
    template: `<cue-testbutton
      variant="${args.variant}"
      size="${args.size}"
      [disabled]="${args.disabled}">
          <cue-button-icon icon="user"/>
      </cue-testbutton>`,
  }),
  args: {
    variant: 'primary',
    size: 'm',
    disabled: false,
  },
};

export const IconBeforeCompact: Story = {
  render: (args: any) => ({
    props: args,
    template: `<cue-testbutton
      variant="${args.variant}"
      size="${args.size}"
      [disabled]="${args.disabled}">
          <cue-button-icon icon="unknown"/>
          <cue-button-label>Click Me!</cue-button-label>
          <cue-button-padder size="s"/>
      </cue-testbutton>`,
  }),
  args: {
    variant: 'primary',
    size: 'xs',
    disabled: false,
  },
};
