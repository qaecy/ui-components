import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { SvgIcon } from './svg-icon.component';
import { FlexContainer } from '../flexcontainer.component';
import { SvgIconOverview } from './svg-icon-overview.component';

const meta: Meta<SvgIconOverview> = {
  title: 'SvgIcons',
  component: SvgIconOverview,
  decorators: [
    moduleMetadata({
      imports: [FlexContainer],
    }),
  ],
};

const render = (args: any) => ({
  props: args,
  template: `<cue-svg-icon-overview />`,
});

export default meta;
type Story = StoryObj<SvgIcon>;

export const Default: Story = {
  render,
  args: {},
};
