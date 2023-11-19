import { ListboxValueChangeEvent } from "@angular/cdk/listbox";
import { Injectable, signal } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()
export class FueSelectService {
	value = signal("");

	multiple = signal(false);

	private _valueChange = new Subject<any>();
	valueChanges = this._valueChange.asObservable();

	valueChange(val: ListboxValueChangeEvent<any>): void {
		this._valueChange.next(val);
	}
}
