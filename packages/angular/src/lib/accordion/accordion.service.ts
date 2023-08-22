import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class FueAccordionService {
  accordionId!: string;

  private readonly expandedSubject = new BehaviorSubject(false);
  readonly expanded$ = this.expandedSubject.asObservable();

  toggleAccordion() {
    this.expandedSubject.next(!this.expandedSubject.getValue());
  }

  collapse() {
    this.expandedSubject.next(false);
  }
}
