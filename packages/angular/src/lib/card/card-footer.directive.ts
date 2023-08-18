import { Directive } from '@angular/core';

@Directive({
  selector: 'fue-card-footer',
  host: {
    class: 'flex items-center p-6 pt-0',
  },
})
export class CardFooterDirective {
  constructor() {}
}
