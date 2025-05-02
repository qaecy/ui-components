import type { Meta, StoryObj } from '@storybook/angular';
import { NavBarComponent } from './nav-bar.component';

const meta: Meta<NavBarComponent> = {
  title: 'Nav Bar',
  component: NavBarComponent,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<NavBarComponent>;

const render = (args: any) => ({
  props: args,
  template: `<div style="width: 100%; height: 500px; border: 1px solid; border-radius: ${args.parentBorderRadius}; font-family: var(--cue-font-family);">
  <cue-nav-bar 
    navWidth="${args.navWidth}" 
    [showSideNav]="${args.showSideNav}" 
    parentBorderRadius="${args.parentBorderRadius}"
    [mobileBreakpoint]="${args.mobileBreakpoint}"
    [showBounceAnimation]="${args.showBounceAnimation}"
    [keepOpenBreakpoint]="${args.keepOpenBreakpoint}">
      <div sidebarContent style="padding: 16px;">
        <p class="mat-typography">Sidebar Content</p>
      </div>
      <div mainContent style="padding: 16px;">
        <p class="mat-typography">Main Content</p>
      </div>
    </cue-nav-bar>
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
