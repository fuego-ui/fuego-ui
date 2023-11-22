import {
	Component,
	ElementRef,
	HostBinding,
	Input,
	inject,
} from "@angular/core";
import { CdkOption } from "@angular/cdk/listbox";
import { ClassValue } from "clsx";
import { cn } from "../utils";
import { FocusOrigin, FocusableOption } from "@angular/cdk/a11y";

@Component({
	selector: "fue-option",
	standalone: true,
	hostDirectives: [CdkOption],
	template: `<span
			class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center"
			[attr.data-state]="checkedState"
		>
			@if (isChecked) {
			<span aria-hidden="true"
				><svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="h-4 w-4"
				>
					<polyline points="20 6 9 17 4 12"></polyline>
				</svg>
			</span>
			}
		</span>
		<ng-content />`,
})
export class FueOptionComponent implements FocusableOption {
	private _cdkSelectOption = inject(CdkOption, { host: true });

	private elementRef = inject(ElementRef);

	base =
		"relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50";

	@Input("class") classNames: ClassValue = "";

	@HostBinding("class")
	get allClassNames() {
		return cn(this.base, this.classNames);
	}

	@Input()
	set value(value: unknown | null) {
		this._cdkSelectOption.value = value;
	}

	@Input()
	set disabled(value: boolean) {
		this.disabled = value;
	}
	get disabled() {
		return this._disabled;
	}
	private _disabled = false;

	get isChecked() {
		return this._cdkSelectOption.isSelected();
	}

	get checkedState() {
		return this._cdkSelectOption.isSelected() ? "checked" : "unchecked";
	}

	focus(origin?: FocusOrigin | undefined): void {
		this.elementRef.nativeElement.focus();
	}
}
