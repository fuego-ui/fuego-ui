import { Component } from '@angular/core';

@Component({
  selector: 'fue-card-content',
  template: `<ng-content></ng-content>`,
  host: {
    class: 'card-body',
  },
})
export class CardContentComponent {}
