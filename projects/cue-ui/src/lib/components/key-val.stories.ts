import type { Meta, StoryObj } from '@storybook/angular';
import { KeyValComponent } from './key-val.component';

const meta: Meta<KeyValComponent> = {
  title: 'Key Value',
  component: KeyValComponent,
  tags: ['autodocs'],
  argTypes: {

  },
};

export default meta;
type Story = StoryObj<KeyValComponent>;

export const Default: Story = {
  args: {
    key: 'Area',
    val: '22.8 m²',
  },
};
