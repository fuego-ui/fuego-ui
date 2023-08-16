import { Directive, HostBinding, HostListener, OnDestroy } from '@angular/core';
import { AccordionService } from './accordion.service';
import { Subject, takeUntil, tap } from 'rxjs';

@Directive({
  selector: 'accordion-trigger',
  standalone: true,
  host: {
    class:
      'collapse-title cursor-pointer px-0 py-3 min-h-[2.5rem] hover:underline',
  },
})
export class AccordionTriggerDirective implements OnDestroy {
  accordionId!: string;
  expanded!: any;

  unsubscribe = new Subject<boolean>();

  constructor(private accordionService: AccordionService) {
    this.accordionService.expanded$
      .pipe(
        takeUntil(this.unsubscribe),
        tap((val) => (this.expanded = val))
      )
      .subscribe();
  }

  @HostBinding('attr.aria-expanded')
  get ariaExpanded() {
    return this.expanded;
  }

  @HostBinding('attr.aria-controls')
  get ariaControls() {
    return this.accordionId || '';
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    this.accordionService.toggleAccordion();
  }

  @HostBinding('attr.id')
  get attrId() {
    return this.accordionId + '-trigger' || '';
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (event.code === 'Enter' || event.code === 'Space') {
      event.preventDefault();
      event.stopPropagation();
      this.accordionService.toggleAccordion();
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe.next(true);
    this.unsubscribe.complete();
  }
}
