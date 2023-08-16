import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  HostListener,
  ChangeDetectionStrategy,
  ContentChild,
  AfterViewInit,
} from '@angular/core';
import { AccordionTriggerDirective } from './accordion-trigger.directive';
import { AccordionContentDirective } from './accordion-content.directive';
import { AccordionService } from './accordion.service';

let nextId = 0;
@Component({
  standalone: true,
  selector: 'accordion-item',
  imports: [CommonModule],
  providers: [AccordionService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      *ngIf="{ expanded: expanded$ | async } as expanded"
      class="collapse collapse-arrow border-b-2 border-base-300 bg-base-100 rounded-sm {{
        className || ''
      }}"
      [ngClass]="{ 'collapse-open': expanded.expanded }"
    >
      <ng-content select="accordion-trigger"></ng-content>
      <ng-content select="accordion-content"></ng-content>
    </div>
  `,
})
export class AccordionItemComponent implements AfterViewInit {
  @Input() title!: string;
  @Input() className!: string;

  accordionId = `accordion-${nextId++}`;
  expanded$ = this.accordionService.expanded$;

  @ContentChild(AccordionTriggerDirective, { static: true })
  accordionTrigger!: AccordionTriggerDirective;

  @ContentChild(AccordionContentDirective, { static: false })
  accordionContent!: AccordionContentDirective;

  constructor(private accordionService: AccordionService) {}

  toggleAccordion(): void {
    this.accordionService.toggleAccordion();
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (event.code === 'Enter' || event.code === 'Space') {
      event.preventDefault();
      event.stopPropagation();
      this.toggleAccordion();
    }
  }

  collapse(): void {
    this.accordionService.collapse();
  }

  ngAfterViewInit(): void {
    this.accordionTrigger.accordionId = this.accordionId;
    this.accordionContent.id = this.accordionId;
  }
}
