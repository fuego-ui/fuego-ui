import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[fueBtn]',
  standalone: true,
  host: {
    class: 'btn',
    '[class.btn-primary]': 'isPrimary()',
    '[class.btn-secondary]': 'isSecondary()',
    '[class.btn-destructive]': 'isDestructive()',
    '[class.btn-outline]': 'isOutline()',
    '[class.btn-ghost]': 'isGhost()',
    '[class.btn-link]': 'isLink()',
  },
})
export class ButtonDirective {
  @Input() variant = 'primary';

  constructor() {}

  isPrimary() {
    return this.variant === 'primary';
  }

  isSecondary() {
    return this.variant === 'secondary';
  }

  isDestructive() {
    return this.variant === 'destructive';
  }

  isOutline() {
    return this.variant === 'outline';
  }

  isGhost() {
    return this.variant === 'ghost';
  }

  isLink() {
    return this.variant === 'link';
  }
}
