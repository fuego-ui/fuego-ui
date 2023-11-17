import { CdkMenuItem } from "@angular/cdk/menu";
import {
	Directive,
	HostBinding,
	Input,
	Output,
	inject,
	signal,
} from "@angular/core";
import { ClassValue } from "clsx";
import { cn } from "../utils";
import { BooleanInput } from "@angular/cdk/coercion";

@Directive({
	selector: "[fueMenuItem]",
	standalone: true,
	hostDirectives: [CdkMenuItem],
})
export class FueMenuItemDirective {
	base =
		"relative w-full flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50";

	private _cdkMenuItem = inject(CdkMenuItem, { host: true });

	// private _tabIndex = signal(-1);

	@Input("class") classNames: ClassValue = "";

	@HostBinding("class")
	get allClassNames() {
		return cn(this.base, this.classNames);
	}

	get disabled() {
		return this._cdkMenuItem.disabled;
	}

	@Input()
	set disabled(value: BooleanInput) {
		this._cdkMenuItem.disabled = !!value;
	}

	@Output()
	triggered = this._cdkMenuItem.triggered;

	// TODO: Need to fix focus issue
	// @Output()
	// resetItemFocus = new EventEmitter<any>();

	// @HostBinding("attr.tabIndex")
	// @HostListener("hover")
	// hover() {
	//   if (!this.disabled) {
	//     this.resetItemFocus.next("");
	//     this._tabIndex.set(1);
	//   }
	// }

	// unfocusable() {
	//   this._tabIndex.set(0);
	// }
}
