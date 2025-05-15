import { Component, computed, effect, input, linkedSignal, signal } from '@angular/core';
import { ResizedDirective, ResizedEvent } from '../directives/resized.directive';

@Component({
  selector: 'cue-side-nav',
  imports: [ResizedDirective],
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  host: {
    '[style.--nav-width]': `isMobile() ? '100%' : resultingSideNavWidth()`,
    '[style.--bounce-duration]': `showBounceAnimation() && !isOpen ? '2s' : '0s'`,
    '[style.--nav-toggle-left]': `isMobile() ? 'calc(100% - 16px)' : '200px'`,
    '[class.nav-open]': 'isOpen',
  },
})
export class SideNav {
  navWidth = input<string>('200px');
  mobileBreakpoint = input<number>(576); // small
  keepOpenBreakpoint = input<number>(992); // lg
  showSideNav = input<boolean>(true);
  parentBorderRadius = input<string>('0px');
  showBounceAnimation = input(true);
  foldOver = input(true); // Not implemented but should fold over the content rather than squeezing it

  resultingSideNavWidth = linkedSignal(() => {
    const sideNavHidden = !this.showSideNav();
    return sideNavHidden ? '0' : this.navWidth();
  });

  isOpen = false;
  hideDragHandle = signal(false);
  isMobile = signal(false);
  parentWidth = signal(500);
  contentMargin = '0';
  isLargeScreen = computed(() => this.parentWidth() > this.keepOpenBreakpoint());
  private _dragStartX = 0;
  private _isDragging = false;

  onBreakpointChange = effect(() => {
    this.mobileBreakpoint();
    this.keepOpenBreakpoint();
    this._updateResponsiveness();
  });

  toggle() {
    this.isOpen = !this.isOpen;
    this._updateContentMargin();
  }

  handleDrag(e: MouseEvent, action: 'start' | 'move' | 'end') {
    if (action === 'start') {
      this._dragStartX = e.clientX;
      this._isDragging = true;
    } else if (action === 'move' && this._isDragging) {
      const dragDistance = e.clientX - this._dragStartX;
      if (Math.abs(dragDistance) > 30) {
        this.isOpen = dragDistance > 0;
      }
    } else if (action === 'end') {
      this._isDragging = false;
    }
  }

  onResize(ev: ResizedEvent) {
    this.parentWidth.set(ev.newRect.width);
    this._updateResponsiveness();
  }

  private _updateContentMargin() {
    let width = this.resultingSideNavWidth();
    if (this.isMobile()) width = '100%';
    this.contentMargin = this.isOpen ? width : '0';
  }

  private _updateResponsiveness() {
    const isMobile = this.parentWidth() < this.mobileBreakpoint();
    this.isMobile.set(isMobile);
    this.isOpen = this.isLargeScreen();
    this.hideDragHandle.set(this.isLargeScreen());
    this._updateContentMargin();
  }
}
