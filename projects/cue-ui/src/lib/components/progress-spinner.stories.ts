import type { Meta, StoryObj } from '@storybook/angular';
import { ProgressSpinnerComponent } from './progress-spinner.component';

const meta: Meta<ProgressSpinnerComponent> = {
  title: 'Progress spinner',
  component: ProgressSpinnerComponent,
  tags: ['autodocs'],
  argTypes: {
  },
};

export default meta;
type Story = StoryObj<ProgressSpinnerComponent>;

export const Default: Story = {
  args: {
    size: "48px",
    inline: false,
    colorInner: "light-dark(var(--cue-primary), var(--cue-accent))",
    colorOuter: "light-dark(var(--cue-secondary), var(--cue-primary))"
  },
};

export const Inline: Story = {
  render: (args) => ({
    props: args,
    template: `<p>Hello <cue-progress-spinner [inline]="${args.inline}"></cue-progress-spinner></p>`,
  }),
  args: {
    inline: true,
    colorInner: "light-dark(var(--cue-primary), var(--cue-accent))",
    colorOuter: "light-dark(var(--cue-secondary), var(--cue-primary))"
  },
};
