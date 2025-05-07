import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[cueTruncate]',
})
export class TruncateDirective implements OnInit {
  @Input() truncateLength = 20;
  private originalText = '';
  private isTruncated = true;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.originalText = this.el.nativeElement.innerText;
    this.truncateText();
  }

  @HostListener('click') onClick() {
    this.isTruncated = !this.isTruncated;
    this.truncateText();
  }

  private truncateText() {
    const displayText =
      this.isTruncated && this.originalText.length > this.truncateLength
        ? this.originalText.substr(0, this.truncateLength) + '...'
        : this.originalText;
    this.renderer.setProperty(this.el.nativeElement, 'innerText', displayText);
    this.renderer.setProperty(this.el.nativeElement, 'title', this.originalText);
  }
}
