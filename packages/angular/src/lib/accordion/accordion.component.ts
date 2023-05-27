import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostListener,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  inject,
  signal,
} from '@angular/core';

let nextId = 0;
@Component({
  standalone: true,
  selector: 'accordion-item',
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="collapse collapse-arrow border border-base-300 bg-base-100 rounded-sm {{
        className || ''
      }}"
      [ngClass]="{ 'collapse-open': expanded() }"
    >
      <div
        class="collapse-title cursor-pointer p-3 min-h-[2.5rem]"
        (click)="toggleAccordion()"
        (keydown)="onKeyDown($event)"
        [attr.aria-expanded]="expanded().toString()"
        [attr.aria-controls]="accordionId"
        tabindex="0"
      >
        {{ title }}
      </div>
      <div
        class="collapse-content px-3 pb-3"
        [hidden]="!expanded()"
        [attr.aria-hidden]="(!expanded()).toString()"
        [attr.id]="accordionId"
      >
        <ng-content></ng-content>
      </div>
    </div>
  `,
})
export class AccordionItemComponent {
  @Input() title!: string;
  @Input() className!: string;
  @Output() byToggle: EventEmitter<string> = new EventEmitter<string>();

  accordionId = `accordion-${nextId++}`;
  expanded = signal(false);

  private cdr = inject(ChangeDetectorRef);

  toggleAccordion(): void {
    this.expanded.set(!this.expanded());
    this.byToggle.emit(this.expanded() ? 'expanded' : 'collapsed');
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
    this.expanded.set(false);
    this.cdr.detectChanges();
  }
}
