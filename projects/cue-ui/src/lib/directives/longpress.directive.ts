import { Directive, ElementRef, inject, OnInit, output } from '@angular/core';
import { MousePressHandler } from '../utils/mousepress-handler';

@Directive({ selector: '[libLongpress]' })
export class LongPressDirective implements OnInit {
  private _elementRef = inject(ElementRef);

  libLongpress = output<MouseEvent>();

  ngOnInit() {
    MousePressHandler.getInstance().events.addListener(
      'longPressedLeft',
      (event: MouseEvent) => {
        const clickedElement = this._elementRef?.nativeElement;
        if (clickedElement && clickedElement.contains(event.target as Node)) {
          this.libLongpress.emit(event);
        }
      }
    );
  }
}
