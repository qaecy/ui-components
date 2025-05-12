import {
  Directive,
  ElementRef,
  OnInit,
  input,
  OnDestroy,
  inject,
  computed,
  effect,
} from '@angular/core';
import tippy, { Instance, Props } from 'tippy.js';
import { v4 as uuid4 } from 'uuid';
import { DocRefData } from './inline-ref.component';

@Directive({
  selector: '[cueRefSummary]',
})
export class RefSummaryDirective implements OnInit, OnDestroy {
  private _el = inject(ElementRef);
  cueRefSummary = input<DocRefData>(); // Tooltip content
  truncateLen = input<number>(50); // Tooltip content

  private _truncatedId = uuid4();
  private _fullId = uuid4();
  private _labelId = uuid4();

  label = computed(() => {
    const files = this.cueRefSummary()?.documentData?.files;
    if(files === undefined || !files.length) return undefined;
    return `<strong id="${this._labelId}">${files[0].label}</strong>`;
  });
  full = computed(() => {
    const fullText = this.cueRefSummary()?.text;
    if (fullText === undefined) return '';
    return `${this.label()}<br>
    <span id="${this._fullId}">${fullText}</span>`;
  });
  truncated = computed(() => {
    const fullText = this.cueRefSummary()?.text;
    if (fullText === undefined) return '';
    const text =
      fullText.length > this.truncateLen()
        ? fullText.substring(0, this.truncateLen()) + '...'
        : fullText;
    return `${this.label()}<br>
    <span id="${this._truncatedId}">${text}</span>`;
  });

  private _tippyInstance!: Instance;
  private _options: Partial<Props> = {
    allowHTML: true,
    interactive: true,
    placement: 'bottom',
    animation: 'shift-away',
    theme: 'light',
  };

  ngOnInit(): void {
    this._initializeTippy(this.truncated());
    document.addEventListener('click', (event) => {
      if (!event.target) return;
      if ((event.target as HTMLElement).id === this._truncatedId) {
        console.log('Set full');
        this._updateTippy(this.full());
      } else if ((event.target as HTMLElement).id === this._fullId) {
        console.log('Set truncated');
        this._updateTippy(this.truncated());
      }
    });
  }

  onContentUpdated = effect(() => {
    this._updateTippy(this.truncated());
  });

  ngOnDestroy(): void {
    if (this._tippyInstance) {
      this._tippyInstance.destroy();
    }
  }

  private _initializeTippy(content: string): void {
    this._tippyInstance = tippy(this._el.nativeElement, {
      content,
      ...this._options,
    }) as any;
  }

  private _updateTippy(content: string): void {
    if (this._tippyInstance) {
      this._tippyInstance.setProps({
        content,
        ...this._options,
      });
    }
  }
}
