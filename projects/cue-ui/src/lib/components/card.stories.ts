import type { Meta, StoryObj } from '@storybook/angular';
import { CardComponent } from './card.component';

const meta: Meta<CardComponent> = {
  title: 'Card',
  component: CardComponent,
  argTypes: {
    color: {
      control: {
        type: 'select',
      },
      options: ["primary", "accent"],
    },
    appearance: {
      control: {
        type: 'select',
      },
      options: ["outlined", "raised"],
    },
  },
};

export default meta;
type Story = StoryObj<CardComponent>;

export const Default: Story = {
  args: {
    title: 'Primary card',
    subTitle: 'Subtitle',
    color: "primary",
    appearance: "raised"
  },
};
export const Accent: Story = {
  args: {
    title: 'Accent card',
    color: "accent",
    appearance: "raised"
  },
};
export const Outlined: Story = {
  args: {
    title: 'Outlined card',
    color: "accent",
    appearance: "outlined"
  },
};