import type { Meta, StoryObj } from '@storybook/angular';
import { ContractsView } from './contracts.view';
import { contracts } from './contracts-sample';

const meta: Meta<ContractsView> = {
  title: 'View: Contracts',
  component: ContractsView,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<ContractsView>;

export const Default: Story = {
  args: {
    contracts: contracts
  },
};