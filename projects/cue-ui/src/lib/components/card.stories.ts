import type { Meta, StoryObj } from '@storybook/angular';
import { CardComponent } from './card.component';
import { cardColors } from '../shared/colors';

const meta: Meta<CardComponent> = {
  title: 'Card',
  component: CardComponent,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: {
        type: 'select',
      },
      options: cardColors,
    },
    appearance: {
      control: {
        type: 'select',
      },
      options: ["outlined", "raised"],
    },
    actionsAlign: {
      control: {
        type: 'select',
      },
      options: ["start", "end"],
    },
    actionButtons: {
      description: 'Array of action buttons',
    },
  },
};

const render = (args: any) => ({
  props: args,
  template: `<cue-card 
    style="font-family: var(--cue-font-family)"
    title="${args.title}" 
    subTitle="${args.subTitle}"
    color="${args.color}" 
    appearance="${args.appearance}">
      Card content goes here
    </cue-card>`,
});

export default meta;
type Story = StoryObj<CardComponent>;

export const Default: Story = {
  render,
  args: {
    title: 'Primary card',
    subTitle: 'Subtitle',
    color: "primary",
    appearance: "raised"
  },
};
export const NoTitle: Story = {
  render: (args: any) => ({
    props: args,
    template: `<cue-card style="font-family: var(--cue-font-family)"
      color="${args.color}" 
      appearance="${args.appearance}">
        Card content goes here
      </cue-card>`,
  }),
  args: {
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
export const ButtonAutoStyle: Story = {
  args: {
    title: 'Button card automatically styled',
    color: "accent",
    appearance: "raised",
    actionButtons: [
      {
        label: 'Button 1',
        action: () => console.log('Button 1 clicked'),
      },
    ],
    actionsAlign: "end",
  },
};
export const ButtonsStyled: Story = {
  args: {
    title: 'Button card automatically styled',
    color: "accent",
    appearance: "raised",
    actionButtons: [
      {
        label: 'Button 1',
        action: () => console.log('Button 1 clicked'),
        color: "secondary",
        appearance: "stroked",
        loading: true,
        disabled: false,
        tooltip: "I'm loading",
        icon: "home",
      },
      {
        label: 'Button 2',
        action: () => console.log('Button 2 clicked'),
        color: "primary",
        appearance: "filled",
        loading: false,
        failed: true,
        tooltip: "Something went wrong",
      },
    ],
    actionsAlign: "end",
  },
};