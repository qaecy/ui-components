import type { Meta, StoryObj } from '@storybook/angular';
import { DraggableCard, positions } from './draggable-card.component';
import { cardVariants } from './card.component';

const meta: Meta<DraggableCard> = {
  title: 'Card Draggable',
  component: DraggableCard,
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: {
        type: 'select',
      },
      options: positions,
    },
    variant: {
      control: {
        type: 'select',
      },
      options: cardVariants,
    },
  },
};

export default meta;
type Story = StoryObj<DraggableCard>;

const render = (args: any) => ({
  props: {
    postion: args.position,
    label: args.label,
    variant: args.variant,
    padded: args.padded,
    shadow: args.shadow,
  },
  template: `<div style="width: 100%; height: 500px">
    <cue-draggable-card position="${args.position}" [label]="label" [variant]="variant" [padded]="padded" [shadow]="shadow">
      <cue-typography>
        Card content goes here
      </cue-typography>
    </cue-draggable-card>
    </div>`,
});

export const Default: Story = {
  render,
  args: {
    label: '',
    position: 'top-left',
    variant: 'default',
    padded: true,
    shadow: false,
  },
};

export const Label: Story = {
  render,
  args: {
    label: 'Legend',
    position: 'bottom-right',
    variant: 'default',
    padded: false,
    shadow: false,
  },
};
