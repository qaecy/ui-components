import {
  afterRender,
  afterRenderEffect,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  model,
  OnDestroy,
} from '@angular/core';
import { DarkModeDirective } from '../directives';

@Component({
  selector: 'cue-logo',
  standalone: true,
  imports: [DarkModeDirective],
  template: `
    <svg
      cueDarkMode
      (darkModeChange)="handleDarkModeChange($event)"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 221.545 86.191"
      width="222"
      height="86"
      overflow="visible"
    >
      <path
        id="original-path"
        fill="none"
        stroke="transparent"
        stroke-miterlimit="10"
        stroke-width="12"
        d="M216.046 56.638s-10.561 24.201-36.192 22.991c-25.631-1.21-22.771-24.751-20.351-37.622 2.42-12.871 10.451-20.351 16.831-18.041 6.283 2.275 8.03 9.68 2.09 21.891-5.94 12.211-21.341 37.567-35.862 33.992-12.413-3.056-13.281-23.162-13.281-23.162V29.762v26.925c0 14.471-12.47 23.212-24.672 23.212s-24.672-8.301-24.672-23.212V29.829l-.006.105v13.031c0 20.416-16.55 36.966-36.966 36.966S6 63.381 6 42.966 22.55 6 42.966 6c6.91 0 13.377 1.896 18.91 5.196"
      />
    </svg>
  `,
  styles: `
  :host {display:block}
  svg {
    flex: 1;
    display:block;
    width:100%;
    height:auto;
  }
  `,
})
export class Logo implements OnDestroy {
  /*
   * input
   */
  size = input<'s' | 'm' | 'l'>('m');
  active = input(false);

  /*
   * color
   */
  isDarkMode = model(false);
  handleDarkModeChange(e: boolean) {
    this.isDarkMode.set(e);
    if (this.raf === -1) {
      this.animate();
    }
  }
  colorA = computed(
    () =>
      (this.isDarkMode() ? [221, 246, 18] : [18, 28, 43]) as [
        number,
        number,
        number
      ]
  ); // yellow / black;
  private colorB: [number, number, number] = [0, 202, 204]; // turqoise;

  private paths: SVGPathElement[] = [];
  private raf: number = -1;

  /*
   * properties & methods for animation
   * we store some properties on the object to reduce memory allocation during raf
   */
  private appearTime = 0;
  private disappearTime = 0;
  private tip = 0;
  private toe = 0;
  private mix = [0, 0, 0];
  private norm = 0;
  animate = (t?: number) => {
    if (t !== undefined) {
      this.tip = Math.min(1, (t - this.appearTime) * 0.0004);
      if (!this.active()) {
        this.toe = Math.min(1, (t - this.disappearTime) * 0.0006);
      }
    }

    this.paths.forEach((p, i) => {
      this.norm = (1 / this.paths.length) * i;
      this.mix = this.mixRgb(
        this.colorA(),
        this.colorB,
        Math.max(0, Math.min(1, (this.tip - this.norm) * 15))
      );
      p.setAttribute(
        'stroke',
        this.tip * this.paths.length > i &&
          (this.active() || this.toe * this.paths.length < i)
          ? this.rgbToSvg(this.mix as [number, number, number])
          : 'transparent'
      );
    });

    if (this.tip >= 1 && (this.active() || this.toe >= 1)) {
      this.raf = -1;
      return;
    }
    this.tip = 0;
    this.toe = 0;
    this.raf = requestAnimationFrame(this.animate);
  };
  activate() {
    this.appearTime = performance.now();
    this.animate(this.appearTime);
  }
  deactivate() {
    this.disappearTime = performance.now();
    if (this.raf === -1) {
      this.animate(this.disappearTime);
    }
  }

  /* methods for color mixing */
  mixChannel(a: number, b: number, mix: number) {
    return parseInt((a * mix + b * (1 - mix)).toFixed());
  }
  mixRgb(
    cA: [number, number, number],
    cB: [number, number, number],
    mix: number
  ) {
    return [
      this.mixChannel(cA[0], cB[0], mix),
      this.mixChannel(cA[1], cB[1], mix),
      this.mixChannel(cA[2], cB[2], mix),
    ] as [number, number, number];
  }
  rgbToSvg(c: [number, number, number]) {
    return `rgb(${c[0]},${c[1]},${c[2]})`;
  }

  /*
   * lifecycle hooks
   */
  constructor() {
    const elementRef = inject(ElementRef<HTMLElement>);

    afterRenderEffect((): void => {});

    afterRender({
      read: () => {
        if (this.paths.length) return;
        /*
         * let's calculate single segments from the logo path
         * to enable linear graident on a path
         */
        const svg = elementRef.nativeElement.querySelector('svg') as SVGElement;
        const path = elementRef.nativeElement.querySelector(
          '#original-path'
        ) as SVGPathElement;
        if (!path) return;

        const pathLength = path.getTotalLength();
        const resolution = 400;
        const positions: { x: number; y: number }[] = [];
        for (let i = 0; i < resolution; i++) {
          const point = path.getPointAtLength((pathLength / resolution) * i);
          positions.push({
            x: parseFloat(point.x.toFixed(2)),
            y: parseFloat(point.y.toFixed(2)),
          });
        }
        positions.push(path.getPointAtLength(pathLength));
        positions.reverse();

        positions.forEach((pos, i) => {
          if (i === 0 || i === 1) return;

          const p = document.createElementNS(
            'http://www.w3.org/2000/svg',
            'path'
          );
          p.setAttribute(
            'd',
            `M${positions[i - 2].x},${positions[i - 2].y}L${
              positions[i - 1].x
            },${positions[i - 1].y}L${pos.x},${pos.y}`
          );
          p.setAttribute('fill', 'none');
          p.setAttribute('stroke', 'transparent');
          p.setAttribute(
            'stroke-width',
            path?.getAttribute('stroke-width') || '1'
          );
          p.setAttribute(
            'stroke-miterlimit',
            path?.getAttribute('stroke-miterlimit') || '1'
          );
          svg.appendChild(p);
          this.paths.push(p);
        });
      },
    });
  }

  ngOnChanges(changes: any) {
    if (changes.active.currentValue) {
      this.activate();
    } else {
      this.deactivate();
    }
  }

  ngOnDestroy(): void {
    this.paths = [];
    cancelAnimationFrame(this.raf);
    this.raf = -1;
  }
}
