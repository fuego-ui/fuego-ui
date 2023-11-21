import {
	ChangeDetectionStrategy,
	Component,
	Input,
	inject,
} from "@angular/core";
import { FueSelectService } from "./select.service";
import { ClassValue } from "clsx";
import { cn } from "../utils";

@Component({
	selector: "fue-select-value",
	template: `<span>
		{{ value() && value()?.length ? value() : placeholder() }}
	</span>`,
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		"[class]": "classes",
	},
})
export class FueSelectValueComponent {
	private _selectService = inject(FueSelectService);

	readonly value = this._selectService.value;

	readonly placeholder = this._selectService.placeholder;

	base = "overflow-hidden pointer-events-none text-ellipsis";

	@Input("class") classNames: ClassValue = "";

	get classes() {
		return cn(this.base, this.classNames);
	}
}
