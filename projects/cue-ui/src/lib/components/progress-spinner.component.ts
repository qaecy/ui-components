import { Component, ElementRef, ViewChild, computed, input } from '@angular/core';

@Component({
    selector: 'cue-progress-spinner',
    template: ` <span
        #spinner
        [class]="inline() ? 'loader-inline' : 'loader'"
        [style.--size]="spinnerSize()"
        [style.--ci]="colorInner()"
        [style.--co]="colorOuter()"
    ></span>`,
    styles: [
        `
            .loader {
                width: var(--size);
                height: var(--size);
                border-radius: 50%;
                display: inline-block;
                position: relative;
                border: 2px solid var(--co);
                box-sizing: border-box;
                animation: rotation 1s linear infinite;
            }
            .loader::after {
                content: '';
                box-sizing: border-box;
                position: absolute;
                left: 4px;
                top: 4px;
                border: 2px solid var(--ci);
                width: calc(var(--size) / 4);
                height: calc(var(--size) / 4);
                border-radius: 50%;
            }

            .loader-inline {
                width: var(--size);
                height: var(--size);
                border: calc(var(--size) / 8) solid var(--co);;
                border-radius: 50%;
                display: inline-block;
                position: relative;
                box-sizing: border-box;
                animation: rotation 1s linear infinite;
            }
            .loader-inline::after {
                content: '';
                box-sizing: border-box;
                position: absolute;
                left: 0;
                top: 0;
                background: var(--ci);
                width: calc(var(--size) / 2);
                height: calc(var(--size) / 2);
                transform: translate(-50%, 50%);
                border-radius: 50%;
            }

            @keyframes rotation {
                0% {
                    transform: rotate(0deg);
                }
                100% {
                    transform: rotate(360deg);
                }
            }
        `,
    ],
})
export class ProgressSpinnerComponent {
    @ViewChild('spinner', { static: true }) spinnerElement!: ElementRef;

    size = input<string>('48px');
    inline = input<boolean>(false);
    scale = input<number>(0.8);
    colorInner = input<string>(
        'light-dark(var(--cue-primary), var(--cue-accent))'
    );
    colorOuter = input<string>(
        'light-dark(var(--cue-secondary), var(--cue-primary))'
    );

    spinnerSize = computed(() => {
        return !this.inline() ? this.size() : this.getParentSize(this.scale());
    });

    getParentSize(scale: number) {
        const parentElement = this.spinnerElement.nativeElement.parentElement.parentElement;
        return parentElement ? `${parentElement.offsetHeight * scale}px` : '48px';
    }
}
