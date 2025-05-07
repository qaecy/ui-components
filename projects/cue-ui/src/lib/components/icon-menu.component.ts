import {
  Component,
  computed,
  input,
  linkedSignal,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
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

export const openDirections = ['left', 'right', 'top', 'down'];
export type OpenDirection = (typeof openDirections)[number];

export class IconMenuItem {
  id = uuid4();
  clickable = false;
  constructor(
    public icon: string,
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
  imports: [MatButtonModule, MatIconModule, TooltipDirective],
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
export class IconMenuComponent {
  menuItems = input.required<IconMenuItem[]>();
  openDirection = input<OpenDirection>('right');
  labelPosition = input<Placement | undefined>();
  hideWhenNotHovered = input(false);
  gap = input(2);
  size = input('30px');

  iconSize = computed(() => `calc(${this.size()} * 0.6)`);

  distanceBetween = computed(() => `${20 + this.gap()}px`);
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

  getTransform(i: number) {
    const offsetFromMain = '0px';
    const map: { [direction: OpenDirection]: string } = {
      right: `translateX(calc((${
        i * 1.2
      } * ${this.size()}) + ${offsetFromMain})`,
      left: `translateX(calc((-${
        i * 1.2
      } * ${this.size()}) - ${offsetFromMain})`,
      top: `translateY(calc((-${
        i * 1.2
      } * ${this.size()}) - ${offsetFromMain})`,
      down: `translateY(calc((${
        i * 1.2
      } * ${this.size()}) + ${offsetFromMain})`,
    };
    return map[this.openDirection()];
  }

  // onHover(isHovered: boolean) {
  //   console.log(isHovered)
  //   this.isHovered = isHovered;
  // }

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
