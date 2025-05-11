// dark-mode.directive.ts
import {
  Directive,
  computed,
  signal,
  DestroyRef,
  inject,
  Output,
  EventEmitter,
  effect,
} from '@angular/core';

@Directive({
  selector: '[cueDarkMode]',
  standalone: true,
  exportAs: 'darkModeDetector',
})
export class DarkModeDirective {
  private readonly destroyRef = inject(DestroyRef);
  private readonly _isDarkMode = signal(this.hasDarkClass());

  // Expose as a computed property
  isDarkMode = computed(() => this._isDarkMode());

  // Emit when dark mode changes
  @Output() darkModeChange = new EventEmitter<boolean>();

  constructor() {
    // Watch for class changes on body
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'class'
        ) {
          const newValue = this.hasDarkClass();
          if (newValue !== this._isDarkMode()) {
            this._isDarkMode.set(newValue);
          }
        }
      });
    });

    // Start observing the body element
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class'],
    });

    // Clean up on destroy
    this.destroyRef.onDestroy(() => observer.disconnect());

    // Log changes (optional)
    effect(() => {
      console.log(`Dark mode changed to: ${this._isDarkMode()}`);
      this.darkModeChange.emit(this._isDarkMode());
    });
  }

  private hasDarkClass(): boolean {
    return document.body.classList.contains('dark');
  }

  // Optional method to toggle dark mode
  toggleDarkMode() {
    document.body.classList.toggle('dark');
  }
}
