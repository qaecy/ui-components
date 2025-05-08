import type { Meta, StoryObj } from '@storybook/angular';
import { MimeIconComponent } from './mime-icon.component';

const meta: Meta<MimeIconComponent> = {
  title: 'Mime Icon',
  component: MimeIconComponent,
  tags: ['autodocs'],
  argTypes: {
    
  },
};

export default meta;
type Story = StoryObj<MimeIconComponent>;

export const Default: Story = {
  args: {
    mime: 'application/pdf',
    inline: false
  },
};

export const NonSupported: Story = {
  args: {
    mime: 'application/png',
    inline: false
  },
};