import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { Switch } from './switch.component';
import { Card } from '../card.component';
import { Typography } from '../typography.component';
import { FlexContainer } from '../flexcontainer.component';

const meta: Meta<Switch> = {
  title: 'Input Switch',
  component: Switch,
  decorators: [
    moduleMetadata({
      imports: [Card, Typography, FlexContainer],
    }),
  ],
  argTypes: {
    checked: {
      control: {
        type: 'boolean',
      },
    },
    size: {
      control: {
        type: 'select',
      },
      options: ['xs', 's', 'm'],
    },
    disabled: {
      control: {
        type: 'boolean',
      },
    },
  },
};

const render = (args: any) => ({
  props: args,
  template: `<cue-input-switch [checked]="${args.checked}" [disabled]="${args.disabled}" size="${args.size}" />`,
});

export default meta;
type Story = StoryObj<Switch>;

export const Default: Story = {
  render,
  args: {
    checked: true,
    disabled: false,
    size: 'm',
  },
};

export const InsideCards: Story = {
  render: (args: any) => ({
    props: args,
    template: `
      <cue-flexcontainer align="center" justify="space-between">
        <cue-typography>Body</cue-typography>
        <cue-flexcontainer>
            ${render({ ...args, checked: false }).template}
            ${render(args).template}
        </cue-flexcontainer>
      </cue-flexcontainer>
    <cue-card variant="default">
      <cue-flexcontainer align="center" justify="space-between">
        <cue-typography>Default</cue-typography>
        <cue-flexcontainer>
            ${render({ ...args, checked: false }).template}
            ${render(args).template}
        </cue-flexcontainer>
      </cue-flexcontainer>
    </cue-card>
    <cue-card variant="primary">
      <cue-flexcontainer align="center" justify="space-between">
        <cue-typography>Primary</cue-typography>
        <cue-flexcontainer>
            ${render({ ...args, checked: false }).template}
            ${render(args).template}
        </cue-flexcontainer>
      </cue-flexcontainer>
    </cue-card>
    <cue-card variant="secondary">
      <cue-flexcontainer align="center" justify="space-between">
        <cue-typography>Secondary</cue-typography>
        <cue-flexcontainer>
            ${render({ ...args, checked: false }).template}
            ${render(args).template}
        </cue-flexcontainer>
      </cue-flexcontainer>
    </cue-card>
    <cue-card variant="accent">
      <cue-flexcontainer align="center" justify="space-between">
        <cue-typography>Accent</cue-typography>
        <cue-flexcontainer>
            ${render({ ...args, checked: false }).template}
            ${render(args).template}
        </cue-flexcontainer>
      </cue-flexcontainer>
    </cue-card>
    <cue-card variant="fade">
      <cue-flexcontainer align="center" justify="space-between">
        <cue-typography>Fade</cue-typography>
        <cue-flexcontainer>
            ${render({ ...args, checked: false }).template}
            ${render(args).template}
        </cue-flexcontainer>
      </cue-flexcontainer>
    </cue-card>
    `,
  }),
  args: {
    checked: false,
    size: 'm',
    iconChecked: 'dark-mode',
    icon: 'light-mode',
  },
};
