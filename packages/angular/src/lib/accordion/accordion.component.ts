import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostListener,
} from '@angular/core';

@Component({
  standalone: true,
  selector: 'accordion-item',
  imports: [CommonModule],
  template: `
    <div class="accordion-item">
      <div
        class="accordion-title"
        (click)="toggleAccordion()"
        (keydown)="onKeyDown($event)"
        [attr.aria-expanded]="expanded.toString()"
        [attr.aria-controls]="accordionId"
        tabindex="0"
      >
        {{ title }}
      </div>
      <div
        class="accordion-content"
        [ngClass]="{ expanded: expanded }"
        [hidden]="!expanded"
        [attr.aria-hidden]="(!expanded).toString()"
        [attr.id]="accordionId"
      >
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [
    `
      .accordion-item {
        cursor: pointer;
      }

      .accordion-title {
        font-weight: bold;
      }

      .accordion-content {
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.3s ease-in-out;
      }

      .accordion-content.expanded {
        max-height: 500px; /* Adjust the value as needed */
        transition: max-height 0.3s ease-in-out;
      }
    `,
  ],
})
export class AccordionItemComponent {
  private static nextId = 0;

  @Input() title!: string;
  @Input() className!: string;
  @Output() byOnToggle: EventEmitter<string> = new EventEmitter<string>();

  expanded = false;
  accordionId: string;

  constructor() {
    this.accordionId = `accordion-${AccordionItemComponent.nextId++}`;
  }

  toggleAccordion() {
    this.expanded = !this.expanded;
    this.byOnToggle.emit(this.expanded ? 'expanded' : 'collapsed');
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.code === 'Enter' || event.code === 'Space') {
      event.preventDefault();
      this.toggleAccordion();
    }
  }
}
