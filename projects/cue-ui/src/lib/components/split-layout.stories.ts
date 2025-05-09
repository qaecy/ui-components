import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { SplitLayoutComponent } from './split-layout.component';
import { Card } from './card.component';

const meta: Meta<SplitLayoutComponent> = {
  title: 'Split Layout',
  component: SplitLayoutComponent,
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
      imports: [Card],
    }),
  ],
};

export default meta;
type Story = StoryObj<SplitLayoutComponent>;

const render = (args: any) => ({
  props: {
    sizes: args.sizes,
    minSizes: args.minSizes,
    gutterSize: args.gutterSize,
  },
  // play: async (x: any) => {
  //   console.log(x)
  // },
  template: `<cue-split-layout style="display: block; height: 500px; width: 100%;"
    [sizes]="sizes" [minSizes]="minSizes" [gutterSize]="gutterSize" (resized)="newSize = $event">
    <div leftContent>Left
      @if(newSize){<br><span>New size: {{newSize.left}}px</span>}
    </div>
    <div rightContent>Right
      @if(newSize){<br><span>New size: {{newSize.right}}px</span>}
    </div>
  </cue-split-layout>`,
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
    template: `<cue-split-layout style="display: block; height: 500px; width: 100%; display: flex; font-family: var(--cue-font-family);"
      [sizes]="sizes" [minSizes]="minSizes" [gutterSize]="gutterSize" (resized)="newSize = $event">
      <div leftContent style="display: flex; flex-direction: column; gap: 1rem; height: 100%;">
        <cue-card height="200px">
          I'm a blue card
        </cue-card>
        <cue-card height="150px" color="accent">
          I'm a green card
        </cue-card>
        <cue-card height="calc(500px - 2rem - 350px)" color="accent" appearance="outlined">
          I'm an outlined card
        </cue-card>
      </div>
      <div rightContent>
        <cue-card height="500px" appearance="outlined">
          I'm an outlined card
        </cue-card>
      </div>
    </cue-split-layout>`,
  }),
  args: {
    sizes: [30, 70],
    minSizes: [150, 100],
    gutterSize: 20,
  },
};
