import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { Card, cardVariants } from './testcard.component';
import { Typography } from './typography.component';
import { TestButton } from './testbutton.component';
import { Grid } from './grid.component';
import { FlexContainer } from './flexcontainer.component';

const meta: Meta<Card> = {
  title: 'TestCard',
  component: Card,
  decorators: [
    moduleMetadata({
      imports: [Typography, TestButton, Grid, FlexContainer],
    }),
  ],
  argTypes: {
    variant: {
      control: {
        type: 'select',
      },
      options: cardVariants,
    },
    shadow: {
      control: {
        type: 'boolean',
      },
    },
  },
};

const render = (args: any) => ({
  props: args,
  template: `<cue-card
    variant="${args.variant}" [shadow]="${args.shadow}">
    <cue-typography>
      Card content goes here
    </cue-typography>
    </cue-card>`,
});

export default meta;
type Story = StoryObj<Card>;

export const Default: Story = {
  render,
  args: {
    variant: 'default',
    shadow: false,
  },
};

export const WithContent: Story = {
  render: (args: any) => ({
    props: args,
    template: `<cue-card variant="${args.variant}" [shadow]="${args.shadow}">
      <cue-grid>
        <cue-typography size="l">
        This is a title
        </cue-typography>
          <img src="https://placehold.co/600x400" alt="Placeholder image" style="display:block; max-width:20em;width: 100%; height: 100%; object-fit: cover; border-radius: 8px;" />
          <cue-flexcontainer justify="end">
            <cue-testbutton variant="secondary">Secondary Button</cue-testbutton>
            <cue-testbutton variant="primary">Primary Button</cue-testbutton>
          </cue-flexcontainer>
      </cue-grid>
    </cue-card>
    `,
  }),
};
