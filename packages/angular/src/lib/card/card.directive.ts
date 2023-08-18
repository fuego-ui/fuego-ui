import { Directive } from '@angular/core';

@Directive({
  selector: 'fue-card',
  host: {
    class: 'card text-white',
  },
})
export class CardDirective {}
