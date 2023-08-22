import { CommonModule } from "@angular/common";
import {
  Component,
  Input,
  HostListener,
  ChangeDetectionStrategy,
  ContentChild,
  AfterViewInit,
  Output,
  EventEmitter,
  OnDestroy,
} from "@angular/core";
import { AccordionTriggerComponent } from "./accordion-trigger.component";
import { AccordionService } from "./accordion.service";
import { BooleanInput, coerceBooleanProperty } from "@angular/cdk/coercion";
import { FocusableOption } from "@angular/cdk/a11y";
import { tap } from "rxjs";
import { cn } from "../utils";

let nextId = 0;
@Component({
  standalone: true,
  selector: "accordion-item",
  imports: [CommonModule],
  providers: [AccordionService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div *ngIf="{ expanded: expanded$ | async } as expanded" [class]="classes">
      <ng-content select="accordion-trigger"></ng-content>
      <ng-content select="accordion-content"></ng-content>
    </div>
  `,
})
export class AccordionItemComponent
  implements AfterViewInit, OnDestroy, FocusableOption
{
  @Input() className!: string;

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(disabled: BooleanInput) {
    this._disabled = coerceBooleanProperty(disabled);
  }
  private _disabled = false;

  /** Event emitted every time the AccordionItem is opened. */
  @Output() readonly opened: EventEmitter<void> = new EventEmitter<void>();

  /** Event emitted every time the AccordionItem is closed. */
  @Output() readonly closed: EventEmitter<void> = new EventEmitter<void>();

  /** Event emitted when the AccordionItem is destroyed. */
  @Output() readonly destroyed: EventEmitter<void> = new EventEmitter<void>();

  accordionId = `accordion-${nextId++}`;
  expanded$ = this.accordionService.expanded$.pipe(
    tap((expanded) => {
      if (expanded) {
        this.opened.emit();
      } else {
        this.closed.emit();
      }
    })
  );

  @ContentChild(AccordionTriggerComponent, { static: true })
  accordionTrigger!: AccordionTriggerComponent;

  constructor(private accordionService: AccordionService) {
    this.accordionService.accordionId = this.accordionId;
  }

  toggleAccordion(): void {
    if (!this.disabled) {
      this.accordionService.toggleAccordion();
    }
  }

  @HostListener("keydown", ["$event"])
  onKeyDown(event: KeyboardEvent): void {
    if (event.code === "Enter" || event.code === "Space") {
      event.preventDefault();
      event.stopPropagation();
      this.toggleAccordion();
    }
  }

  get classes() {
    return cn("border-b", this.className);
  }

  focus(): void {
    this.accordionTrigger.focus();
  }

  collapse(): void {
    this.accordionService.collapse();
  }

  ngAfterViewInit(): void {
    this.accordionTrigger.accordionId = this.accordionId;
  }

  ngOnDestroy(): void {
    this.destroyed.emit();
  }
}
