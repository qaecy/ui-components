import {
  Directive,
  ElementRef,
  EventEmitter,
  NgZone,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';

export class ResizedEvent {
  public newRect: DOMRectReadOnly;
  public oldRect?: DOMRectReadOnly;
  public isFirst: boolean;
  public element: Element;

  public constructor(
    newRect: DOMRectReadOnly,
    oldRect: DOMRectReadOnly | undefined,
    element: Element
  ) {
    this.newRect = newRect;
    this.oldRect = oldRect;
    this.isFirst = oldRect == null;
    this.element = element;
  }
}

@Directive({
  standalone: true,
  selector: '[cueResized]',
})
export class ResizedDirective implements OnInit, OnDestroy {
  private observer: ResizeObserver;
  private oldRect?: DOMRectReadOnly;

  @Output()
  public readonly resized;

  public constructor(
    private readonly element: ElementRef,
    private readonly zone: NgZone
  ) {
    this.resized = new EventEmitter<ResizedEvent>();
    this.observer = new ResizeObserver((entries) =>
      this.zone.run(() => this.observe(entries))
    );
  }

  public ngOnInit(): void {
    this.observer.observe(this.element.nativeElement);
  }

  public ngOnDestroy(): void {
    this.observer.disconnect();
  }

  private observe(entries: ResizeObserverEntry[]): void {
    const entry = entries[0];
    const resizedEvent = new ResizedEvent(
      entry.contentRect,
      this.oldRect,
      entry.target
    );
    this.oldRect = entry.contentRect;
    this.resized.emit(resizedEvent);
  }
}
