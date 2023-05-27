import {
  Directive,
  QueryList,
  ContentChildren,
  AfterContentInit,
  Input,
  HostBinding,
} from '@angular/core';
import { AccordionItemComponent } from './accordion.component';

@Directive({
  standalone: true,
  selector: 'accordion-group',
})
export class AccordionGroupDirective implements AfterContentInit {
  @ContentChildren(AccordionItemComponent)
  accordionItems!: QueryList<AccordionItemComponent>;

  @Input() @HostBinding('class') className: string = 'accordion-group';

  ngAfterContentInit() {
    this.accordionItems.forEach((item) => {
      item.byToggle.subscribe((state: string) => {
        if (state === 'expanded') {
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
}
