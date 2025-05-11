import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { Logo } from './logo.component';

const meta: Meta<Logo> = {
  title: 'Logo',
  component: Logo,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
};

const render = (args: any) => ({
  props: args,
  template: `<div style="max-width:20em;"><cue-logo [size]="size" [active]="active" /></div>`,
});

export default meta;
type Story = StoryObj<Logo>;

export const Default: Story = {
  render,
  args: {
    active: true,
  },
};
