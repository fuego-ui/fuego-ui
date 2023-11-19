import {
	ChangeDetectionStrategy,
	Component,
	Input,
	inject,
} from "@angular/core";
import { cn } from "../utils";
import { ClassValue } from "clsx";
import { FueSelectService } from "./select.service";
import { AsyncPipe, NgIf } from "@angular/common";
import { map } from "rxjs";
import { ListboxValueChangeEvent } from "@angular/cdk/listbox";

@Component({
	selector: "fue-select-value",
	imports: [NgIf, AsyncPipe],
	template: `<span *ngIf="{ value: selectValue$ | async } as vm$">{{
		vm$.value && vm$.value.length ? vm$.value : placeholder
	}}</span>`,
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		"[class]": "classes",
	},
})
export class FueSelectValueComponent {
	private _selectService = inject(FueSelectService);

	selectValue$ = this._selectService.valueChanges.pipe(
		map((val: ListboxValueChangeEvent<any>) => val.value)
	);

	base = "overflow-hidden pointer-events-none text-ellipsis";

	@Input() placeholder: string = "";

	@Input("class") classNames: ClassValue = "";

	get classes() {
		return cn(this.base, this.classNames);
	}
}
