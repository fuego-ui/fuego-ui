import {
  Directive,
  QueryList,
  ContentChildren,
  AfterContentInit,
  Input,
  HostBinding,
  OnDestroy,
} from '@angular/core';
import { AccordionItemComponent } from './accordion.component';
import { Subject, takeUntil } from 'rxjs';

@Directive({
  standalone: true,
  selector: 'accordion-group',
})
export class AccordionGroupDirective implements AfterContentInit, OnDestroy {
  @ContentChildren(AccordionItemComponent)
  accordionItems!: QueryList<AccordionItemComponent>;

  @Input() @HostBinding('class') className: string = 'accordion-group';

  unsubscribe = new Subject<boolean>();

  ngAfterContentInit() {
    this.accordionItems.forEach((item) => {
      item.expanded$
        .pipe(takeUntil(this.unsubscribe))
        .subscribe((expanded: boolean) => {
          if (expanded) {
            this.closeOtherAccordionItems(item);
          }
        });
    });
  }

  closeOtherAccordionItems(currentItem: AccordionItemComponent) {
    this.accordionItems.forEach((item) => {
      if (item !== currentItem) {
        item.collapse();
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next(true);
    this.unsubscribe.complete();
  }
}
