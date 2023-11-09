import { Injectable, OnInit, signal } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable()
export class FueSelectService {
  value = signal("");

  private _valueChange = new Subject<any>();
  valueChanges = this._valueChange.asObservable();

  valueChange(val: any): void {
    this._valueChange.next(val);
  }
}
