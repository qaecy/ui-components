import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { Switch } from './switch.component';
import { Card } from '../card.component';
import { Typography } from '../typography.component';
import { FlexContainer } from '../flexcontainer.component';
import { DarkmodeSwitch } from './darkmode-switch.component';

const meta: Meta<DarkmodeSwitch> = {
  title: 'Drakmode Switch',
  component: DarkmodeSwitch,
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
  },
};

const render = (args: any) => ({
  props: args,
  template: `<cue-darkmode-switch [checked]="${args.checked}" />`,
});

export default meta;
type Story = StoryObj<Switch>;

export const Default: Story = {
  render,
  args: {
    checked: true,
  },
};
