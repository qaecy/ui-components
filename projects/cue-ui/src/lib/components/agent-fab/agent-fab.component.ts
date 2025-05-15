import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ShortPressDirective, LongPressDirective } from '../../directives';
import { Button } from '../button/button.component';
import { ButtonIcon } from '../button/button-icon.component';

type Position = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

@Component({
  selector: 'cue-agent-fab',
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    ShortPressDirective,
    LongPressDirective,
    Button,
    ButtonIcon
  ],
  templateUrl: './agent-fab.component.html',
  styleUrls: ['./agent-fab.component.scss'],
})
export class AgentFAB implements AfterViewInit {
  fabText = input('Chat with');
  containerHeight = input('400px');
  containerWidth = input('250px');
  position = input<Position>('bottom-right');
  margin = input(20);

  fabWrapper = viewChild<ElementRef>('fabWrapper');

  isActive = signal(false);
  isDragging = signal(false);
  fabHovered = false;
  startX = 0;
  startY = 0;
  isTop = false;
  isLeft = false;

  // onDragStateChange = effect(() => {
  //   console.log(this.isDragging())
  // })

  ngAfterViewInit() {
    this.setPosition(this.position());
  }

  // Sets position to one of the corners
  setPosition(position: Position) {
    const fab = this.fabWrapper()?.nativeElement;

    if (position.includes('top')) {
      fab.style.top = `${this.margin()}px`;
    } else {
      fab.style.bottom = `${this.margin()}px`;
    }
    if (position.includes('left')) {
      fab.style.left = `${this.margin()}px`;
    } else {
      fab.style.right = `${this.margin()}px`;
    }

    setTimeout(() => {
      fab.style.transition = '';
    }, 300);
  }

  toggleActive() {
    if (!this.isDragging()) {
      this.isActive.set(!this.isActive());
      this.positionPopup();
    }
  }

  closePopup() {
    this.isActive.set(false);
  }

  // Handles positioning of popup relative to fab
  positionPopup() {
    const fab = this.fabWrapper()?.nativeElement;
    const popup = fab.querySelector('.popup-content');
    const rect = fab.getBoundingClientRect();
    this.isTop = rect.top < window.innerHeight / 2;
    this.isLeft = rect.left < window.innerWidth / 2;

    popup.style.transition = 'all 0.3s ease-in-out';

    if (this.isTop) {
      popup.style.top = '100%';
      popup.style.bottom = 'auto';
    } else {
      popup.style.bottom = '100%';
      popup.style.top = 'auto';
    }

    if (this.isLeft) {
      popup.style.left = '0';
      popup.style.right = 'auto';
    } else {
      popup.style.right = '0';
      popup.style.left = 'auto';
    }

    setTimeout(() => {
      popup.style.transition = '';
    }, 300);
  }

  onMouseDown(event: MouseEvent) {
    // event.stopImmediatePropagation();
    // event.stopPropagation();
  }

  onMouseUp(event: MouseEvent) {
    this.isDragging.set(false);
    setTimeout(() => {
      if (this.isTop && this.isLeft) {
        this.setPosition('top-left');
      } else if (this.isTop && !this.isLeft) {
        this.setPosition('top-right');
      } else if (!this.isTop && this.isLeft) {
        this.setPosition('bottom-left');
      } else {
        this.setPosition('bottom-right');
      }
    }, 30);
  }

  startDrag(event: MouseEvent) {
    console.log('LongPress');
    this.closePopup();
    this.isDragging.set(true);
    this.startX = event.clientX;
    this.startY = event.clientY;
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.isDragging()) return;
    if (event.buttons === 1) {
      const fab = this.fabWrapper()?.nativeElement;
      const width = window.innerWidth;
      const height = window.innerHeight;
      const positionRight = `${width - event.clientX - this.margin() / 2}px`;
      const positionLeft = `${event.clientX}px`;
      const positionBottom = `${height - event.clientY - this.margin() / 2}px`;
      const positionTop = `${event.clientY}px`;

      const pctWidth =
        ((width - event.clientX - this.margin() / 2) / width) * 100;
      const pctHeight =
        ((height - event.clientY - this.margin() / 2) / width) * 100;

      this.isLeft = pctWidth > 50;
      this.isTop = pctHeight > 50;

      if (this.isLeft) {
        fab.style.right = null;
        fab.style.left = positionLeft;
      } else {
        fab.style.right = positionRight;
        fab.style.left = null;
      }

      if (this.isTop) {
        fab.style.top = positionTop;
        fab.style.bottom = null;
      } else {
        fab.style.top = null;
        fab.style.bottom = positionBottom;
      }
    }
  }

  // snapToEdge() {
  //   const fab = this.fabWrapper()?.nativeElement;
  //   const rect = fab.getBoundingClientRect();
  //   const isRight = rect.left > window.innerWidth / 2;
  //   const isBottom = rect.top > window.innerHeight / 2;

  //   fab.style.transition = 'all 0.3s ease-in-out';
  //   fab.style.right = isRight
  //     ? '20px'
  //     : `${window.innerWidth - rect.right + rect.width / 2}px`;
  //   fab.style.bottom = isBottom
  //     ? '20px'
  //     : `${window.innerHeight - rect.bottom + rect.height / 2}px`;

  //   setTimeout(() => {
  //     fab.style.transition = '';
  //   }, 300);
  // }
}
