import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { Card, cardVariants } from './card.component';
import { Typography } from './typography.component';
import { Button } from './button/button.component';
import { Grid } from './grid.component';
import { FlexContainer } from './flexcontainer.component';
import { ButtonLabel } from './button/button-label.component';
import { ButtonIcon } from './button/button-icon.component';
import { ButtonPadder } from './button/button-padder.component';

const meta: Meta<Card> = {
  title: 'Card',
  component: Card,
  decorators: [
    moduleMetadata({
      imports: [
        Typography,
        Button,
        ButtonLabel,
        ButtonIcon,
        ButtonPadder,
        Grid,
        FlexContainer,
      ],
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
            <cue-button variant="secondary" disabled="true">
              <cue-button-label>Disabled Secondary</cue-button-label>
            </cue-button>
            <cue-button variant="primary" disabled="true">
              <cue-button-label>Disabled Primary</cue-button-label>
            </cue-button>
            <cue-button variant="secondary">
              <cue-button-label>Secondary Button</cue-button-label>
            </cue-button>
            <cue-button variant="primary" tooltip="User">
              <cue-button-padder size="l">
                <cue-button-icon icon="user"/>
              </cue-button-padder>
              <cue-button-label>Primary Button</cue-button-label>
              <cue-button-padder size="l"/>
            </cue-button>
          </cue-flexcontainer>
      </cue-grid>
    </cue-card>
    `,
  }),
};
