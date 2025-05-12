import { Directive, ElementRef, inject, OnInit, output } from '@angular/core';
import { MousePressHandler } from '../utils/mousepress-handler';

@Directive({ selector: '[libShortpress]' })
export class ShortPressDirective implements OnInit {
  private _elementRef = inject(ElementRef);

  libShortpress = output<MouseEvent>();

  ngOnInit() {
    MousePressHandler.getInstance().events.addListener(
      'shortPressedLeft',
      (event: MouseEvent) => {
        const clickedElement = this._elementRef?.nativeElement;
        if (clickedElement && clickedElement.contains(event.target as Node)) {
          this.libShortpress.emit(event);
        }
      }
    );
  }
}
