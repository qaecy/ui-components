import {
  AfterViewInit,
  Component,
  effect,
  ElementRef,
  input,
  OnDestroy,
  output,
  signal,
  ViewChild,
} from '@angular/core';
import Split from 'split.js';
import { ResizedDirective, ResizedEvent } from '../directives';

export interface PanelSizes {
  left: number;
  right: number;
}

@Component({
  selector: 'cue-split-layout',
  imports: [ResizedDirective],
  template: `<div class="split">
    <div
      #splitLeft
      id="split-0"
      class="split-pane"
      cueResized
      (resized)="panelLeftResized($event)"
    >
      <ng-content select="[leftContent]"></ng-content>
    </div>
    <div
      #splitRight
      id="split-1"
      class="split-pane"
      cueResized
      (resized)="panelRightResized($event)"
    >
      <ng-content select="[rightContent]"></ng-content>
    </div>
  </div>`,
  styles: [
    `
      :host {
        display: contents;
      }

      .split {
        display: flex;
        height: 100%;
        width: 100%;
      }

      .split-pane {
        overflow: auto;
      }

      ::ng-deep .gutter {
        background-color: rgba(0, 0, 0, 0);
        background-repeat: no-repeat;
        background-position: 50%;
      }

      ::ng-deep .gutter.gutter-horizontal {
        background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAIklEQVQoU2M4c+bMfxAGAgYYmwGrIIiDjrELjpo5aiZeMwF+yNnOs5KSvgAAAABJRU5ErkJggg==');
        cursor: col-resize;
      }
    `,
  ],
})
export class SplitLayout implements AfterViewInit, OnDestroy {
  @ViewChild('splitLeft', { static: true }) splitLeft!: ElementRef;
  @ViewChild('splitRight', { static: true }) splitRight!: ElementRef;

  sizes = input<number[]>([50, 50]);
  minSizes = input<number[]>([150, 100]);
  gutterSize = input<number>(8);

  resized = output<PanelSizes>();

  private splitInstance?: Split.Instance;
  private _resultingSizeLeft = signal(0);
  private _resultingSizeRight = signal(0);

  setSizes = effect(() => {
    if (this.splitInstance === undefined) return;
    this.splitInstance?.setSizes(this.sizes());
  });

  setMinSizes = effect(() => {
    this.minSizes();
    this._updateSplitConfig();
  });

  setGutterSize = effect(() => {
    console.log('Gutter size changed');
    this.gutterSize();
    this._updateSplitConfig();
  });

  ngAfterViewInit(): void {
    this._createSplit();
  }

  ngOnDestroy(): void {
    this.splitInstance?.destroy();
  }

  panelLeftResized(event: ResizedEvent) {
    this._resultingSizeLeft.set(event.newRect.width);
  }

  panelRightResized(event: ResizedEvent) {
    this._resultingSizeRight.set(event.newRect.width);
  }

  private _updateSplitConfig() {
    console.log('Updating split config');
    if (this.splitInstance) {
      this.splitInstance.destroy();
      this.splitInstance = undefined;
      this._createSplit(); // Recreate with new settings
    }
  }

  private _createSplit() {
    console.log('Creating split instance');
    if (this.splitInstance !== undefined) return;
    const splitElements = [
      this.splitLeft.nativeElement,
      this.splitRight.nativeElement,
    ];
    this.splitInstance = Split(splitElements, {
      sizes: this.sizes(),
      minSize: this.minSizes(),
      gutterSize: this.gutterSize(),
      direction: 'horizontal',
      onDragEnd: () => {
        this.resized.emit({
          left: this._resultingSizeLeft(),
          right: this._resultingSizeRight(),
        });
      },
    });
  }
}
