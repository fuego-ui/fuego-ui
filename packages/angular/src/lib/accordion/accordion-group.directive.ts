import {
  Directive,
  QueryList,
  ContentChildren,
  AfterContentInit,
  Input,
  HostBinding,
  OnDestroy,
  HostListener,
} from "@angular/core";
import { AccordionItemComponent } from "./accordion.component";
import { Subject, takeUntil } from "rxjs";
import { FocusKeyManager } from "@angular/cdk/a11y";
@Directive({
  standalone: true,
  selector: "accordion-group",
})
export class AccordionGroupDirective implements AfterContentInit, OnDestroy {
  @ContentChildren(AccordionItemComponent)
  accordionItems!: QueryList<AccordionItemComponent>;

  @Input() @HostBinding("class") className: string = "accordion-group";
  @Input() _type: "single" | "" = "";

  private keyManager!: FocusKeyManager<AccordionItemComponent>;

  @HostListener("keydown", ["$event"])
  manage(event: any) {
    this.keyManager.onKeydown(event);
  }

  unsubscribe = new Subject<boolean>();

  ngAfterContentInit() {
    this.keyManager = new FocusKeyManager(this.accordionItems).withWrap();
    this.keyManager.setFirstItemActive();

    if (this._type === "single") {
      this.accordionItems.forEach((item) => {
        item.expanded$
          .pipe(takeUntil(this.unsubscribe))
          .subscribe((expanded: boolean) => {
            expanded && this.closeOtherAccordionItems(item);
          });
      });
    }
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
