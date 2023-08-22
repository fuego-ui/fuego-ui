import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  ViewChild,
} from "@angular/core";
import { Subject, takeUntil, tap } from "rxjs";
import { AccordionService } from "./accordion.service";
import { cn } from "../utils";

@Component({
  selector: "accordion-content,[accordionContent]",
  standalone: true,
  template: `<div
    #content
    class="{{ classes }}"
    [id]="this.id"
    [attr.data-state]="dataState"
    role="region"
    [attr.aria-labelledby]="this.id + '-trigger' || ''"
    [style.--accordion-content-width]="getContentWidth()"
    [style.--accordion-content-height]="getContentHeight()"
    [style.height]="initialHeight === -1 ? 'auto' : 0"
    [attr.hidden]="
      (this.initialHeight === -1 && !this._expanded && !this.isVisible) || null
    "
    [attr.aria-hidden]="!this._expanded"
  >
    <div #innerContent class="pb-4 pt-0"><ng-content /></div>
  </div>`,
})
export class AccordionContentComponent implements AfterViewInit, OnDestroy {
  @Input("class") className!: string;

  @ViewChild("content") contentRef!: ElementRef;
  @ViewChild("innerContent") innerContentRef!: ElementRef;

  id!: string;
  _expanded!: boolean;
  isVisible!: boolean;

  initialHeight = 0;

  contentWidth!: number;
  contentHeight!: number;

  private element!: HTMLElement;

  unsubscribe = new Subject<boolean>();

  onAnimationEnd = (e: Event) => {
    if (!this._expanded) {
      this.isVisible = false;
    } else {
      this.isVisible = true;
    }
  };

  constructor(private accordionService: AccordionService) {
    this.accordionService.expanded$
      .pipe(
        takeUntil(this.unsubscribe),
        tap((val) => (this._expanded = val))
      )
      .subscribe();
  }

  ngAfterViewInit(): void {
    this.element = this.contentRef.nativeElement;
    this.contentHeight = this.innerContentRef.nativeElement.offsetHeight;
    this.initialHeight = -1;
    this.element.addEventListener("animationend", this.onAnimationEnd);
  }

  get dataState() {
    return this._expanded ? "open" : "closed";
  }

  get classes() {
    return cn(
      "overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
      this.className
    );
  }

  getContentWidth() {
    return "var(--collapsible-content-width)";
  }

  getContentHeight() {
    return this.contentHeight > 0
      ? this.contentHeight + "px"
      : "var(--collapsible-content-height)";
  }

  ngOnDestroy(): void {
    this.element.removeEventListener("animationend", this.onAnimationEnd);
  }
}
