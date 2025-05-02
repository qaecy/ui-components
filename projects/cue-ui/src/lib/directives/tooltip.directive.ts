import {
  Directive,
  ElementRef,
  OnInit,
  input,
  OnDestroy,
  inject,
  effect,
} from '@angular/core';
import tippy, { Instance, Placement, Props } from 'tippy.js';

@Directive({
  selector: '[cueTooltip]',
})
export class TooltipDirective implements OnInit, OnDestroy {
  private _el = inject(ElementRef);
  cueTooltip = input.required<string>(); // Tooltip content
  tooltipPlacement = input<Placement|undefined>(undefined);

  private _tippyInstance!: Instance;
  private _options: Partial<Props> = {
    animation: 'shift-away',
    theme: 'cue', // Custom theme
    hideOnClick: false,
    trigger: 'click'
  };

  ngOnInit(): void {
    this._initializeTippy(this.cueTooltip());
    // Add custom theme styles for the tooltip
    const style = document.createElement('style');
    style.textContent = `
      .tippy-box[data-theme~='cue'] {
        background-color: #ff4d4f;
        color: white;
        border-radius: 4px;
        font-size: 14px;
        padding: 8px;
      }
      .tippy-box[data-theme~='cue-red'] .tippy-arrow {
        color: #ff4d4f;
      }
    `;
    document.head.appendChild(style);
  }

  onContentUpdated = effect(() => {
    this._updateTippy(this.cueTooltip(), this.tooltipPlacement());
  });

  onPlacementUpdated = effect(() => {
    this.tooltipPlacement();
    this._updateTippy(this.cueTooltip(), this.tooltipPlacement());
  });

  ngOnDestroy(): void {
    if (this._tippyInstance) {
      this._tippyInstance.destroy();
    }
  }

  private _initializeTippy(content: string): void {
    if(!content) return;
    this._tippyInstance = tippy(this._el.nativeElement, {
      content,
      ...this._options,
    }) as any;
  }

  private _updateTippy(content: string, placement?: Placement): void {
    if(!content) return;
    if (this._tippyInstance) {
      this._tippyInstance.setProps({
        content,
        placement,
        ...this._options,
      });
    }
  }
}
