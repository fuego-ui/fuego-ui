import { Directive, HostBinding } from '@angular/core';
import { Subject, takeUntil, tap } from 'rxjs';
import { AccordionService } from './accordion.service';

@Directive({
  selector: 'accordion-content',
  standalone: true,
  host: {
    class: 'collapse-content pb-4 px-0',
  },
})
export class AccordionContentDirective {
  id!: string;
  _expanded!: boolean;

  unsubscribe = new Subject<boolean>();

  constructor(private accordionService: AccordionService) {
    this.accordionService.expanded$
      .pipe(
        takeUntil(this.unsubscribe),
        tap((val) => (this._expanded = val))
      )
      .subscribe();
  }

  set expanded(val: boolean) {
    this._expanded = val;
  }

  @HostBinding('attr.role')
  get role() {
    return 'region';
  }

  @HostBinding('attr.hidden')
  get hidden() {
    return !this._expanded || null;
  }

  @HostBinding('attr.aria-hidden')
  get ariaHidden() {
    return !this._expanded;
  }

  @HostBinding('attr.aria-labelledby')
  get labelledBy() {
    return this.id + '-trigger' || '';
  }

  @HostBinding('attr.id')
  get attrId() {
    return this.id || '';
  }
}
