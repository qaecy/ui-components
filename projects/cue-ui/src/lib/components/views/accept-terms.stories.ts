import type { Meta, StoryObj } from '@storybook/angular';
import { AcceptTermsView } from './accept-terms.view';

const meta: Meta<AcceptTermsView> = {
  title: 'View: Accept terms',
  component: AcceptTermsView,
  tags: ['autodocs'],
  argTypes: {
    clickedConfirm: { action: 'clicked-confirm' },
  },
};

export default meta;
type Story = StoryObj<AcceptTermsView>;

const termsURL = 'https://www.qaecy.com/termsofuse';
export const Default: Story = {
  args: {
    outdatedAgreed: false,
    termsURL,
  },
};

export const Outdated: Story = {
  args: {
    outdatedAgreed: true,
    termsURL,
  },
};
