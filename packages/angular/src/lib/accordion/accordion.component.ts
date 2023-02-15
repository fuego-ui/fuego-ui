import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'fue-accordion',
  template: `<div
    tabindex="0"
    [ngClass]="className"
    (onClick)="expanded = !expanded"
    class="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box {{
      expanded ? 'collapse-open' : 'collapse-close'
    }}"
  >
    <div class="collapse-title text-xl font-medium">
      <ng-content select="fue-accordion-header"></ng-content>
    </div>
    <div class="collapse-content">
      <ng-content select="fue-accordion-content"></ng-content>
    </div>
  </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionComponent {
  @Input() className: any;

  expanded = false;
}
