import {
  OnInit,
  OnChanges,
  Directive,
  Input,
  HostBinding,
  Renderer2,
  ElementRef,
  SimpleChanges,
  input,
  effect,
} from '@angular/core';

// https://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

@Directive({
  standalone: true,
  selector: '[cueLoadingOverlay]',
})
export class LoadingOverlayDirective implements OnInit {

  displayLoading = input(false);
  loadingMessage = input('');

  displayLoadingChanged = effect(() => {
    this.setVisible(this.displayLoading());
  });

  @HostBinding('style.position') hostPosition = 'relative'; // Set host position to relative

  public uid = '';

  constructor(private targetEl: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    const loadingContainer = this.buildLoadingContainer();
    this.renderer.appendChild(this.targetEl.nativeElement, loadingContainer);
  }

  setVisible(visible: boolean) {
    const container = this.targetEl.nativeElement;
    const div = container.querySelector('.' + this.uid);
    if (div) {
      this.renderer.setStyle(div, 'display', visible ? 'flex' : 'none');
    }
  }

  buildLoadingContainer(): HTMLElement {
    this.uid = 'loading-container-' + uuidv4();

    const loadingContainer = this.renderer.createElement('div');
    this.renderer.setStyle(
      loadingContainer,
      'display',
      this.displayLoading() ? 'flex' : 'none'
    );
    this.renderer.setStyle(loadingContainer, 'flex-direction', 'column');
    this.renderer.setStyle(loadingContainer, 'z-index', 1000);

    // Inherit border radius from host
    const borderRadius = getComputedStyle(
      this.targetEl.nativeElement
    ).getPropertyValue('border-radius');
    console.log(borderRadius);
    if (borderRadius)
      this.renderer.setStyle(loadingContainer, 'border-radius', borderRadius);
    const style = document.createElement('style');
    style.textContent = `
      .lds-facebook {
        display: inline-block;
        position: relative;
        width: 80px;
        height: 80px;
      }
      .lds-facebook div {
        display: inline-block;
        position: absolute;
        left: 8px;
        width: 16px;
        background: #000;
        animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
      }
      .lds-facebook div:nth-child(1) {
        left: 8px;
        animation-delay: -0.24s;
        background: #fff;
      }
      .lds-facebook div:nth-child(2) {
        left: 32px;
        animation-delay: -0.12s;
        background: #fff;
      }
      .lds-facebook div:nth-child(3) {
        left: 56px;
        animation-delay: 0;
        background: #fff;
      }
      @keyframes lds-facebook {
        0% {
          top: 8px;
          height: 64px;
        }
        50%, 100% {
          top: 24px;
          height: 32px;
        }
      }
    `;
    document.head.appendChild(style);

    this.renderer.setStyle(loadingContainer, 'justify-content', 'center');
    this.renderer.setStyle(loadingContainer, 'align-items', 'center');
    this.renderer.addClass(loadingContainer, this.uid);
    this.renderer.setStyle(loadingContainer, 'position', 'absolute');
    this.renderer.setStyle(loadingContainer, 'top', '0');
    this.renderer.setStyle(loadingContainer, 'bottom', '0');
    this.renderer.setStyle(loadingContainer, 'left', '0');
    this.renderer.setStyle(loadingContainer, 'right', '0');
    this.renderer.setStyle(loadingContainer, 'border-radius', '10px');
    this.renderer.setStyle(loadingContainer, 'z-index', '1000');
    this.renderer.setStyle(
      loadingContainer,
      'background-color',
      'rgba(200,200,200,0.2)'
    );

    // custom spinner -- start
    const spinnerContainer = this.renderer.createElement('div');
    this.renderer.addClass(spinnerContainer, 'lds-facebook');
    const spinnerInnerDiv1 = this.renderer.createElement('div');
    const spinnerInnerDiv2 = this.renderer.createElement('div');
    const spinnerInnerDiv3 = this.renderer.createElement('div');

    this.renderer.appendChild(spinnerContainer, spinnerInnerDiv1);
    this.renderer.appendChild(spinnerContainer, spinnerInnerDiv2);
    this.renderer.appendChild(spinnerContainer, spinnerInnerDiv3);

    this.renderer.appendChild(loadingContainer, spinnerContainer);
    // custom spinner -- end

    // message -- start
    const messageContainer = this.renderer.createElement('div');
    this.renderer.setStyle(messageContainer, 'color', '#fff');
    this.renderer.setStyle(messageContainer, 'font-size', '1.2em');
    this.renderer.setStyle(messageContainer, 'font-family', 'var(--cue-font-family)');
    this.renderer.addClass(messageContainer, 'spinner-message');
    messageContainer.innerHTML = this.loadingMessage();

    this.renderer.appendChild(loadingContainer, messageContainer);
    // message -- end

    return loadingContainer;
  }

}
