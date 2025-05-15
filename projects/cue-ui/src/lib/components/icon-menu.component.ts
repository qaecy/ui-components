import {
  Component,
  computed,
  input,
  linkedSignal,
  signal,
} from '@angular/core';
import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { v4 as uuid4 } from 'uuid';
import { Placement } from 'tippy.js';
import { TooltipDirective } from '../directives';
import { FlexContainer } from './flexcontainer.component';
import { Button } from './button/button.component';
import { ButtonIcon } from './button/button-icon.component';
import { ButtonSize, ButtonVariant } from './button/types';
import { IconName } from './icons/types';

export const openDirections = ['left', 'right', 'top', 'down'];
export type OpenDirection = (typeof openDirections)[number];

export class IconMenuItem {
  id = uuid4();
  clickable = false;
  constructor(
    public icon: IconName,
    public label: string,
    public click: (() => void) | null = null
  ) {
    this.clickable = click !== null;
  }
}

@Component({
  selector: 'cue-icon-menu',
  templateUrl: './icon-menu.component.html',
  styleUrls: ['./icon-menu.component.scss'],
  imports: [FlexContainer, Button, ButtonIcon, TooltipDirective],
  animations: [
    trigger('iconAnimation', [
      transition(':enter', [
        query('.delayed', [
          style({ opacity: 0 }),
          stagger(100, [animate('300ms ease-in', style({ opacity: 1 }))]),
        ]),
      ]),
      transition(':leave', [
        query('.delayed', [
          stagger(-100, [animate('300ms ease-in', style({ opacity: 0 }))]),
        ]),
      ]),
    ]),
  ],
})
export class IconMenu {
  menuItems = input.required<IconMenuItem[]>();
  openDirection = input<OpenDirection>('right');
  labelPosition = input<Placement | undefined>();
  hideWhenNotHovered = input(false);
  variant = input<ButtonVariant>('tertiary');
  size = input<ButtonSize>('xs');

  mainItem = computed(() => this.menuItems()[0]);
  otherItems = computed(() => this.menuItems().slice(1));
  flexDirection = computed(() =>
    ['left', 'right'].includes(this.openDirection()) ? 'row' : 'column'
  );
  tooltipPlacement = linkedSignal(() => {
    if (this.labelPosition() !== undefined) return this.labelPosition();
    const od = this.openDirection();
    if (od === 'left' || od === 'right') return 'bottom';
    return 'right';
  });

  isExpanded = signal(false);

  hidden = linkedSignal(() => {
    if (!this.hideWhenNotHovered()) return false;
    return true;
  });

  // If the menu is expanded and there is no click functionality on it it becomes disabled
  mainIconDisabled = computed(() => {
    if (this.isExpanded() && !this.mainItem().clickable) return true;
    return false;
  });
  hovered?: string;

  onMouseEnter() {
    this.isExpanded.set(true);
    const timer = setInterval(() => {
      if (this.hovered === undefined) {
        this.isExpanded.set(false);
        if (this.hideWhenNotHovered()) this.hidden.set(true);
        clearInterval(timer);
      }
    }, 1000);
  }

  handleClick(idx: number) {
    this.isExpanded.set(false);
    if (this.hideWhenNotHovered()) this.hidden.set(true);
    const clickFunction = this.menuItems()[idx].click;
    if (!clickFunction) return;
    clickFunction();
  }

  onContainerHovered() {
    // Unhide the menu
    if (this.hideWhenNotHovered()) this.hidden.set(false);
  }
}
