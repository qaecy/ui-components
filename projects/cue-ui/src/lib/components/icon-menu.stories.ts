import type { Meta, StoryObj } from '@storybook/angular';
import {
  IconMenu,
  IconMenuItem,
  openDirections,
} from './icon-menu.component';

const meta: Meta<IconMenu> = {
  title: 'Icon Menu',
  component: IconMenu,
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
type Story = StoryObj<IconMenu>;

export const Default: Story = {
  args: {
    menuItems: [
      new IconMenuItem('settings', 'Home', () => console.log('Clicked home')),
    ],
  },
};

export const MultipleEntries: Story = {
  args: {
    menuItems: [
      new IconMenuItem('add', 'Home', () => console.log('Clicked home')),
      new IconMenuItem('settings', 'Settings', () =>
        console.log('Clicked settings')
      ),
      new IconMenuItem('delete', 'Settings', () =>
        console.log('Clicked settings')
      ),
      new IconMenuItem('download', 'Settings', () =>
        console.log('Clicked settings')
      ),
      new IconMenuItem('folder', 'Settings', () =>
        console.log('Clicked settings')
      ),
    ],
  },
};

export const FoldDown: Story = {
  args: {
    menuItems: [
      new IconMenuItem('add', 'Home', () => console.log('Clicked home')),
      new IconMenuItem('settings', 'Settings', () =>
        console.log('Clicked settings')
      ),
      new IconMenuItem('delete', 'Settings', () =>
        console.log('Clicked settings')
      ),
      new IconMenuItem('download', 'Settings', () =>
        console.log('Clicked settings')
      ),
    ],
    openDirection: 'down',
    labelPosition: 'right',
  },
};
