import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { KeyValComponent } from './key-val.component';
import { KeyValList } from './key-val-list.component';

const meta: Meta<KeyValComponent> = {
  title: 'Key Value',
  component: KeyValComponent,
  decorators: [
    moduleMetadata({
      imports: [KeyValList],
    }),
  ],
  argTypes: {
    size: {
      control: {
        type: 'select',
      },
      options: ['m', 'l', 'xl'],
    },
  },
};

const render = (args: any) => ({
  props: args,
  template: `<cue-key-val-list>
    <cue-key-val size="${args.size}" key="${args.key}" val="${args.val}"></cue-key-val>
  </cue-key-val-list>`,
});

export default meta;
type Story = StoryObj<KeyValComponent>;

export const Default: Story = {
  render,
  args: {
    size: 'm',
    key: 'Area',
    val: '22.8 m²',
  },
};
