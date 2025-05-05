import type { Meta, StoryObj } from '@storybook/angular';
import { SideNavComponent } from './side-nav.component';

const meta: Meta<SideNavComponent> = {
  title: 'Side Nav',
  component: SideNavComponent,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<SideNavComponent>;

const render = (args: any) => ({
  props: args,
  template: `<div style="width: 100%; height: 500px; border: 1px solid; border-radius: ${args.parentBorderRadius}; font-family: var(--cue-font-family);">
  <cue-side-nav 
    navWidth="${args.navWidth}" 
    [showSideNav]="${args.showSideNav}" 
    parentBorderRadius="${args.parentBorderRadius}"
    [mobileBreakpoint]="${args.mobileBreakpoint}"
    [showBounceAnimation]="${args.showBounceAnimation}"
    [keepOpenBreakpoint]="${args.keepOpenBreakpoint}">
      <div sideNavContent style="padding: 16px;">
        <p class="mat-typography">Side Nav Content</p>
      </div>
      <div mainContent style="padding: 16px;">
        <p class="mat-typography">Main Content</p>
      </div>
    </cue-side-nav>
  </div>`,
});

export const Default: Story = {
  render,
  args: {
    navWidth: '200px',
    showSideNav: true,
    parentBorderRadius: '30px',
    mobileBreakpoint: 576,
    keepOpenBreakpoint: 992,
    showBounceAnimation: true,
  },
};

export const AlwaysOpen: Story = {
  render,
  args: {
    navWidth: '200px',
    showSideNav: true,
    parentBorderRadius: '30px',
    mobileBreakpoint: 576,
    keepOpenBreakpoint: 0,
    showBounceAnimation: false,
  },
};
