import type { Meta, StoryObj } from '@storybook/angular';
import { TooltipDirective } from './tooltip.directive';
import { allColors } from '../shared/colors';

const meta: Meta<TooltipDirective> = {
  title: 'Tooltip',
  component: TooltipDirective,
  tags: ['autodocs'],
  argTypes: {
    tooltipColor: {
      control: {
        type: 'select',
      },
      options: allColors,
    },
    tooltipSize: {
      control: {
        type: 'select',
      },
      options: ["small", "medium", "large"],
    },
    tooltipPlacement: {
      control: {
        type: 'select',
      },
      options: [
        "auto",
        "auto-start", 
        "auto-end",
        "top-start", 
        "top-end", 
        "bottom-start", 
        "bottom-end", 
        "right-start", 
        "right-end", 
        "left-start", 
        "left-end"
      ],
    },
  },
};

export default meta;
type Story = StoryObj<TooltipDirective>;

const render = (args: any) => ({
  props: args,
  template: `<p 
    style="font-family: var(--cue-font-family); border-color: var(--cue-primary); color: var(--cue-on-primary); width: fit-content; margin: 200px" 
    cueTooltip="${args.cueTooltip}" 
    tooltipColor="${args.tooltipColor}" 
    tooltipSize="${args.tooltipSize}" 
    tooltipPlacement="${args.tooltipPlacement}">Hover me
  </p>`,
});

export const DefaultTooltip: Story = {
  render,
  args: {
    cueTooltip: 'Hello',
    tooltipColor: 'primary',
    tooltipSize: 'medium',
    tooltipPlacement: "auto"
  },
};

export const FixedPlacement: Story = {
  render,
  args: {
    cueTooltip: 'Hello',
    tooltipColor: 'accent',
    tooltipSize: 'small',
    tooltipPlacement: 'top-end',
  },
};
