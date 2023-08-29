import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[focusTrap]',
  standalone: true,
})
export class FocusTrapDirective {
  constructor(private elementRef: ElementRef) {}

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Tab') {
      const focusableElements = this.getFocusableElements();
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        // If Shift + Tab is pressed and the first focusable element is focused,
        // move the focus to the last focusable element.
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        // If Tab is pressed and the last focusable element is focused,
        // move the focus to the first focusable element.
        event.preventDefault();
        firstElement.focus();
      }
    }
  }

  private getFocusableElements(): HTMLElement[] {
    const focusableElements = Array.from(
      this.elementRef.nativeElement.querySelectorAll(
        'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
      )
    ) as HTMLElement[];

    return focusableElements.filter(
      (element) => !element.hasAttribute('disabled')
    );
  }
}
