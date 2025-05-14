import {
  Component,
  computed,
  contentChild,
  effect,
  ElementRef,
  inject,
  input,
  signal,
  SimpleChanges,
} from '@angular/core';
import { v4 as uuid4 } from 'uuid';
import { FlexContainer } from '../flexcontainer.component';
import { Button } from '../button';

export type MenuPositioning =
  | 'topleft'
  | 'topright'
  | 'bottomleft'
  | 'bottomright';

@Component({
  selector: 'cue-menu',
  imports: [FlexContainer],
  host: {
    '[class]': 'getClass()',
  },
  template: `<ng-content select="[trigger]" />
    <div
      popover
      class="popover"
      [attr.id]="popoverId()"
      (beforetoggle)="onBeforeToggle($event)"
      (toggle)="onToggle($event)"
    >
      <ng-content select="[menu]" />
    </div>`,
  styles: `
   :host {
      --transform-y: calc(-1 * var(--cue-menu-item-height));
    }
    :host.topleft, :host.topright {
      --transform-y: var(--cue-menu-item-height);
    }

    [popover]:popover-open {
        opacity: 1;
        transform: translate(0,0);
      }

    [popover] {
      position: absolute;
      inset: unset;

      margin:0;
      border:0;
      padding:0;
      background: transparent;

      /* Final state of the exit animation */
      opacity: 0;
      transform: translate(0,var(--transform-y));
      transition:
        opacity 0.3s,
        transform 0.3s,
        overlay 0.3s allow-discrete,
        display 0.3s allow-discrete;
        transition: all .3s ease allow-discrete;

    }

    @starting-style {
      [popover]:popover-open {
        opacity: 0;
        transform: translate(0,var(--transform-y));
      }
    }

  :host.bottomright{
    [popover] {
      right: calc(anchor(right));
      top: calc(anchor(bottom));
    }
  }
  :host.bottomleft{
    [popover] {
      left: calc(anchor(left));
      top: calc(anchor(bottom));
    }
  }

  :host.topleft{
    [popover] {
      left: calc(anchor(left));
      bottom: calc(anchor(top));
    }
  }
  :host.topright{
    [popover] {
      right: calc(anchor(right));
      bottom: calc(anchor(top));
    }
}

`,
})
export class Menu {
  popoverId = input<string>(uuid4());
  positioning = input<MenuPositioning>('bottomright');

  isOpen = input<boolean | undefined>(undefined);

  private triggerButton = contentChild.required<Button>('trigger');

  getClass = computed(() => this.positioning());

  onBeforeToggle(event: ToggleEvent) {
    if (this.isOpen() !== undefined) event.preventDefault();
  }

  onToggle(event: ToggleEvent) {
    const popoverNode = event.target as HTMLElement;
    if (!popoverNode) return;
    const button = (popoverNode.querySelector('button:not(.selected)') ||
      popoverNode.querySelector('button')) as HTMLButtonElement;
    if (button) {
      button.focus();
    }
  }

  constructor() {
    const elementRef = inject(ElementRef);

    effect(() => {
      this.triggerButton()
        .buttonElement()
        .nativeElement.setAttribute('popovertarget', this.popoverId());
    });

    effect(() => {
      if (this.isOpen() === true) {
        elementRef.nativeElement.querySelector('.popover').showPopover();
      } else if (this.isOpen() === false) {
        elementRef.nativeElement.querySelector('.popover').hidePopover();
      }
    });
  }
}
