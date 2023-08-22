import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  ViewChild,
  inject,
  signal,
} from "@angular/core";
import { ClassValue } from "clsx";
import { tap } from "rxjs";
import { AccordionService } from "./accordion.service";
import { cn } from "../utils";
import { AsyncPipe, NgIf } from "@angular/common";

@Component({
  selector: "accordion-content",
  standalone: true,
  imports: [AsyncPipe, NgIf],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div
    *ngIf="{ expanded: expanded$ | async } as state"
    #content
    class="{{ classes }}"
    [id]="this.id"
    [attr.data-state]="state.expanded ? 'open' : 'closed'"
    role="region"
    [attr.aria-labelledby]="this.id + '-trigger' || ''"
    [style.--accordion-content-width]="getContentWidth()"
    [style.--accordion-content-height]="getContentHeight()"
    [style.height]="initialHeight() === -1 ? 'auto' : 0"
    [attr.hidden]="
      (this.initialHeight() === -1 && !state.expanded && !this.isVisible()) ||
      null
    "
    [attr.aria-hidden]="!state.expanded"
  >
    <div #innerContent class="pb-4 pt-0"><ng-content /></div>
  </div>`,
})
export class AccordionContentComponent implements AfterViewInit {
  @Input("class") className!: ClassValue;

  @ViewChild("content") contentRef!: ElementRef;
  @ViewChild("innerContent") innerContentRef!: ElementRef;

  accordionService = inject(AccordionService);

  id!: string;

  isVisible = signal<boolean | null>(null);
  initialHeight = signal(0);

  contentWidth!: number;
  contentHeight!: number;

  expanded$ = this.accordionService.expanded$.pipe(
    tap((curr) => {
      if (!curr) {
        setTimeout(() => {
          this.isVisible.set(false);
        }, 150);
      } else {
        this.isVisible.set(true);
      }
    })
  );

  constructor() {
    this.id = this.accordionService.accordionId;
  }

  ngAfterViewInit(): void {
    this.contentHeight = this.innerContentRef.nativeElement.offsetHeight;
    this.initialHeight.set(-1);
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
}
