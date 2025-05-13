import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { allColors } from '../shared/colors';
import { LoadingOverlayDirective } from './loading-overlay.directive';
import { Card, Typography } from '../components';

const meta: Meta<LoadingOverlayDirective> = {
  title: 'Loading overlay',
  component: LoadingOverlayDirective,
  tags: ['autodocs'],
  argTypes: {},
  decorators: [
    moduleMetadata({
      imports: [Typography, Card],
    }),
  ],
};

export default meta;
type Story = StoryObj<LoadingOverlayDirective>;

const render = (args: any) => ({
  props: {
    displayLoading: args.displayLoading,
    loadingMessage: args.loadingMessage
  },
  template: `<cue-card cueLoadingOverlay [displayLoading]="displayLoading" [displayLoading]="displayLoading" [loadingMessage]="loadingMessage">
    <cue-typography>
      <p>Just</p>
      <p>Showing some content on the card...</p>
    </cue-typography>
  </cue-card>`,
});

export const Default: Story = {
  render,
  args: {
    displayLoading: true,
    loadingMessage: '',
  },
};

export const LoadingMessage: Story = {
  render,
  args: {
    displayLoading: true,
    loadingMessage: 'Getting documents...',
  },
};