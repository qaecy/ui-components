import type { Meta, StoryObj } from '@storybook/angular';
import { ColumnDef, TableComponent } from './table.component';

const meta: Meta<TableComponent> = {
  title: 'Table',
  component: TableComponent,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<TableComponent>;

const data = [
  {
    id: '1',
    name: 'Mads',
    lastName: 'Rasmussen',
    halfWayToHundred: false,
    avatarColor: "#72818C"
  },
  {
    id: '2',
    name: 'Christian',
    lastName: 'Frausing',
    halfWayToHundred: false,
    avatarColor: "#333333"
  },
  {
    id: '3',
    name: 'Manos',
    lastName: 'Argyris',
    halfWayToHundred: false,
    avatarColor: "#FF0305"
  },
  {
    id: '4',
    name: 'Philipp',
    lastName: 'Dohmen',
    halfWayToHundred: true,
    avatarColor: "#DD4535"
  },
];

const columnDefs = [
    new ColumnDef("name", "Name", "left")
]

export const Default: Story = {
  args: {
    data,
    columnDefs
  },
};

const lastNameDef = new ColumnDef("lastName", "Last Name", "right");
lastNameDef.editable = true;
const hundredDef = new ColumnDef("halfWayToHundred", "½-hundred", "right");
hundredDef.type = "CHECKBOX";
const colorDef = new ColumnDef("avatarColor", "Avatar color", "center");
colorDef.type = "COLOR";
const columnDefsAdv = [
    new ColumnDef("name", "Name", "left"),
    lastNameDef,
    hundredDef,
    colorDef
]

export const Advanced: Story = {
    args: {
      data,
      columnDefs: columnDefsAdv
    },
};
  