import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { Menu, MenuWrap, MenuItem } from './';
import { Typography } from '../typography.component';
import { Button, ButtonIcon, ButtonPadder, ButtonLabel } from '../button';
import { SvgIcon } from '../icons/svg-icon.component';

const meta: Meta<Menu> = {
  title: 'Menu',
  component: Menu,
  tags: ['autodocs'],
  argTypes: {
    positioning: {
      control: {
        type: 'select',
      },
      options: ['topleft', 'topright', 'bottomleft', 'bottomright'],
    },
  },
  decorators: [
    moduleMetadata({
      imports: [
        SvgIcon,
        MenuWrap,
        MenuItem,
        Typography,
        Button,
        ButtonLabel,
        ButtonIcon,
        ButtonPadder,
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj<Menu>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <cue-menu positioning="${args.positioning}">
        <cue-button #trigger trigger variant="tertiary">
          <cue-button-padder/>
          <cue-button-label>Klick</cue-button-label>
          <cue-button-padder>
            <cue-button-icon icon="arrow-dropdown"/>
          </cue-button-padder>
        </cue-button>
        <cue-menu-wrap menu>
          <cue-menu-item>
            <cue-svg-icon before name="delete" />
            here
          </cue-menu-item>
          <cue-menu-item [selected]="true">
            <cue-svg-icon before name="delete" />
            here
          </cue-menu-item>
          <cue-menu-item>
            <cue-svg-icon before name="delete" />
            here
          </cue-menu-item>
        </cue-menu-wrap>
      </cue-menu>
`,
  }),
  args: {
    positioning: 'bottomright',
  },
};
