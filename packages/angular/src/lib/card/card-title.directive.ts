import { Directive } from '@angular/core';

@Directive({
  selector: 'fue-card-title',
  host: {
    class: 'card-title text-2xl font-semibold leading-none tracking-tight',
  },
})
export class CardTitleDirective {
  constructor() {}
}
