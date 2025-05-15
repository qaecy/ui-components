import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { AgentFAB } from './agent-fab.component';
import { Typography } from '../typography.component';
import { FlexContainer } from '../flexcontainer.component';

const meta: Meta<AgentFAB> = {
  title: 'Agent FAB',
  component: AgentFAB,
  tags: ['autodocs'],
  argTypes: {},
  decorators: [
      moduleMetadata({
        imports: [
          Typography,
          FlexContainer
        ],
      }),
    ],
};

export default meta;
type Story = StoryObj<AgentFAB>;

const render = (args: any) => ({
  props: args,
  template: `<cue-agent-fab>
      <cue-flexcontainer style="padding: 16px">
        <cue-typography>Hello from Cue</cue-typography>
      </cue-flexcontainer>
      </cue-agent-fab>`,
});

export const Default: Story = {
  render,
  args: {},
};
