import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { SplitLayout } from './split-layout.component';
import { Card } from './card.component';
import { Container } from './container.component';
import { Typography } from './typography.component';
import { FlexContainer } from './flexcontainer.component';

const meta: Meta<SplitLayout> = {
  title: 'Split Layout',
  component: SplitLayout,
  tags: ['autodocs'],
  argTypes: {
    sizes: {
      control: { type: 'object' },
      defaultValue: [50, 50],
      description:
        'Defines the sizes of the individual content areas as an array of numbers.',
    },
    minSizes: {
      control: { type: 'object' },
      defaultValue: [100, 100],
      description:
        'Defines the minimum sizes of the individual content areas in pixels.',
    },
    gutterSize: {
      control: {
        type: 'number',
      },
      defaultValue: 8,
      description: 'Defines the size of the gutter.',
    },
  },
  decorators: [
    moduleMetadata({
      imports: [Typography, Card, Container, FlexContainer, Container],
    }),
  ],
};

const templateLeft = `<cue-container leftContent style="height:100%">
          <cue-flexcontainer direction="column">
            <cue-card variant="primary">
              <cue-typography>I'm a blue card</cue-typography>
            </cue-card>
            <cue-card variant="accent" style="flex:1">
              <cue-typography>I'm a green card</cue-typography>
            </cue-card>
            <cue-card  variant="fade" style="flex:1">
              <cue-typography>I'm fade card</cue-typography>
            </cue-card>
          </cue-flexcontainer>
        </cue-container>`;
const templateRight = `<cue-container rightContent style="height:100%">
        <cue-flexcontainer direction="column">
          <cue-card variant="default" style="flex:1">
            <cue-typography>I'm a default card</cue-typography>
          </cue-card>
        </cue-flexcontainer>
        </cue-container>`;

export default meta;
type Story = StoryObj<SplitLayout>;

const render = (args: any) => ({
  props: {
    sizes: args.sizes,
    minSizes: args.minSizes,
    gutterSize: args.gutterSize,
  },
  // play: async (x: any) => {
  //   console.log(x)
  // },
  template: `<cue-container width="100%" height="500px"><cue-split-layout
    [sizes]="sizes" [minSizes]="minSizes" [gutterSize]="gutterSize" (resized)="newSize = $event">
        ${templateLeft}
        ${templateRight}
  </cue-split-layout></cue-container>`,
});

export const Default: Story = {
  render,
  args: {},
};

export const ThirtySeventy: Story = {
  render,
  args: {
    sizes: [30, 70],
    minSizes: [100, 100],
    gutterSize: 8,
  },
};

export const Cards: Story = {
  render: (args: any) => ({
    props: {
      sizes: args.sizes,
      minSizes: args.minSizes,
      gutterSize: args.gutterSize,
    },
    template: `
      <cue-split-layout
        style="height: 80vh; width: 100%;"
        [sizes]="sizes"
        [minSizes]="minSizes"
        [gutterSize]="gutterSize"
        (resized)="newSize = $event"
      >
        ${templateLeft}
        ${templateRight}
      </cue-split-layout>`,
  }),
  args: {
    sizes: [30, 70],
    minSizes: [150, 100],
    gutterSize: 20,
  },
};
