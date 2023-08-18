import { Directive } from '@angular/core';

@Directive({
  selector: 'fue-card-description',
  host: {
    class: 'text-sm text-white/75',
  },
})
export class CardDescriptionDirective {
  constructor() {}
}
