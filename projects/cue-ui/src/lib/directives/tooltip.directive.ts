import {
  Directive,
  ElementRef,
  OnInit,
  input,
  OnDestroy,
  inject,
  effect,
  computed,
} from '@angular/core';
import tippy, { Instance, Placement, Props } from 'tippy.js';
import { contrastColors, TooltipColor } from '../shared/colors';

export type TooltipSize = 'small' | 'medium' | 'large';

@Directive({
  selector: '[cueTooltip]',
})
export class TooltipDirective implements OnInit, OnDestroy {
  private _el = inject(ElementRef);
  cueTooltip = input.required<string>(); // Tooltip content
  tooltipPlacement = input<Placement|undefined>(undefined);
  tooltipColor = input<TooltipColor>('primary'); // Tooltip color
  tooltipSize = input<TooltipSize>('medium'); // Tooltip size
  
  private _colorVar = computed(() => `var(--cue-${this.tooltipColor()})`);
  private _textColor = computed(() => `var(--cue-${contrastColors.get(this.tooltipColor()) ?? 'extra-light-gray'})`);
  private _style = document.createElement('style');

  private _tippyInstance!: Instance;
  private _options: Partial<Props> = {
    animation: 'shift-away',
    theme: 'cue', // Custom theme
  };

  updateStylesOnColorChange = effect(() => {
    this._updateStyles(this._colorVar(), this._textColor(), this.tooltipSize());
  });

  ngOnInit(): void {
    this._initializeTippy(this.cueTooltip());
    // Add custom theme styles for the tooltip    
    document.head.appendChild(this._style);
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

  private _updateStyles(bgColor: string, textColor: string, size: TooltipSize): void {
    const fontSize = size === 'small' ? '0.7rem' : size === 'large' ? '1rem' : '0.75rem';
    const padding = size === 'small' ? '1px' : size === 'large' ? '4px' : '2px';
    this._style.textContent = `
      .tippy-box[data-theme~='cue'] {
        background-color: ${bgColor};
        color: ${textColor};
        border-radius: 4px;
        font-family: var(--cue-font-family);
        font-size: ${fontSize};
        padding: ${padding};
      }
      .tippy-box[data-theme~='cue'] .tippy-arrow {
        color: ${bgColor};
      }
    `;
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
