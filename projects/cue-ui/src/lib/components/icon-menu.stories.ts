import type { Meta, StoryObj } from '@storybook/angular';
import {
  IconMenuComponent,
  IconMenuItem,
  openDirections,
} from './icon-menu.component';

const meta: Meta<IconMenuComponent> = {
  title: 'Icon Menu',
  component: IconMenuComponent,
  tags: ['autodocs'],
  argTypes: {
    openDirection: {
      control: {
        type: 'select',
      },
      options: openDirections,
      description: 'In what direction should the menu fold out?',
    },
  },
};

export default meta;
type Story = StoryObj<IconMenuComponent>;

export const Default: Story = {
  args: {
    menuItems: [
      new IconMenuItem('home', 'Home', () => console.log('Clicked home')),
    ],
  },
};

export const MultipleEntries: Story = {
  args: {
    menuItems: [
      new IconMenuItem('home', 'Home', () => console.log('Clicked home')),
      new IconMenuItem('settings', 'Settings', () =>
        console.log('Clicked settings')
      ),
    ],
  },
};

export const FoldDown: Story = {
  args: {
    menuItems: [
      new IconMenuItem('home', 'Home', () => console.log('Clicked home')),
      new IconMenuItem('settings', 'Settings', () =>
        console.log('Clicked settings')
      ),
    ],
    openDirection: "down",
    labelPosition: "right"
  },
};
