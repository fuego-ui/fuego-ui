import { Component } from '@angular/core';

@Component({
  selector: 'fue-card-header',
  host: {
    class: 'flex flex-col space-y-1.5 p-6',
  },
  template: `<ng-content></ng-content>`,
})
export class CardHeaderComponent {}
