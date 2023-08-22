import {
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
  ViewChild,
} from "@angular/core";
import { FueAccordionService } from "./accordion.service";
import { Subject, takeUntil, tap } from "rxjs";
import { cn } from "../utils";
import { NgIconComponent, provideIcons } from "@ng-icons/core";
import { radixChevronDown } from "@ng-icons/radix-icons";

@Component({
  selector: "fue-accordion-trigger",
  template: ` <div
    role="heading"
    class="flex"
    [attr.data-state]="dataState"
    [attr.aria-level]="ariaLevel"
  >
    <button
      #btn
      class="{{ getClasses() }}"
      [attr.data-state]="dataState"
      [attr.aria-expanded]="expanded"
      [attr.aria-pressed]="expanded"
      [attr.aria-controls]="ariaControls"
      [attr.id]="attrId"
    >
      <ng-content />
      <ng-icon
        class="h-4 w-4 shrink-0 transition-transform duration-200"
        name="radixChevronDown"
      />
    </button>
  </div>`,
  standalone: true,
  imports: [NgIconComponent],
  viewProviders: [provideIcons({ radixChevronDown })],
})
export class FueAccordionTriggerComponent implements OnDestroy {
  @Input() @HostBinding("class") className!: string;
  @Input() ariaLevel = "3";
  @ViewChild("btn", { static: true }) trigger!: ElementRef;

  accordionId!: string;
  expanded!: any;

  unsubscribe = new Subject<boolean>();

  constructor(private accordionService: FueAccordionService) {
    this.accordionService.expanded$
      .pipe(
        takeUntil(this.unsubscribe),
        tap((val) => (this.expanded = val))
      )
      .subscribe();
  }

  @HostListener("click", ["$event"])
  onClick(event: MouseEvent) {
    this.accordionService.toggleAccordion();
  }

  @HostListener("keydown", ["$event"])
  onKeyDown(event: KeyboardEvent): void {
    if (event.code === "Enter" || event.code === "Space") {
      event.preventDefault();
      event.stopPropagation();
      this.accordionService.toggleAccordion();
    }
  }

  getClasses() {
    return cn(
      "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>*]:rotate-180",
      this.className
    );
  }

  focus(): void {
    this.trigger.nativeElement.focus();
  }

  get ariaControls() {
    return this.accordionId || "";
  }

  get attrId() {
    return this.accordionId + "-trigger" || "";
  }

  get dataState() {
    return this.expanded ? "open" : "closed";
  }

  ngOnDestroy(): void {
    this.unsubscribe.next(true);
    this.unsubscribe.complete();
  }
}
