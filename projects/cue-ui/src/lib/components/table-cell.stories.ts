import type { Meta, StoryObj } from '@storybook/angular';
import { TableCellComponent, displayTypes } from './table-cell.component';

const meta: Meta<TableCellComponent> = {
  title: 'Table cell',
  component: TableCellComponent,
  tags: ['autodocs'],
  argTypes: {
    valueType: {
      control: {
        type: 'select',
      },
      options: displayTypes,
    },
  },
};

export default meta;
type Story = StoryObj<TableCellComponent>;

export const Default: Story = {
  args: {
    value: 'Hello table cell',
    editable: false,
  },
};

export const TextEditable: Story = {
  args: {
    value: 'Hello table cell',
    editable: true,
  },
};

export const Truncated: Story = {
  args: {
    value:
      "I'm a loooooong text that must be truncated in order to display properly in a table cell",
    valueType: 'TRUNCATED',
  },
};

export const Checkbox: Story = {
  args: {
    value: false,
    valueType: 'CHECKBOX',
    editable: false,
  },
};
export const CheckboxEditable: Story = {
  args: {
    value: false,
    valueType: 'CHECKBOX',
    editable: true,
  },
};
export const Color: Story = {
  args: {
    value: 'red',
    valueType: 'COLOR',
    editable: false,
  },
};
const el = document.createElement('button');
el.innerHTML = 'Hello button';
el.addEventListener('click', () => console.log('Clicked button'));
export const HTML: Story = {
  args: {
    value: el,
    valueType: 'HTMLELEMENT',
    editable: false,
  },
};
