import { Directive, HostBinding, Input, OnInit, inject } from "@angular/core";
import { CdkListbox, ListboxValueChangeEvent } from "@angular/cdk/listbox";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { FueSelectService } from "./select.service";
import { ClassValue } from "clsx";
import { cn } from "../utils";
import { tap } from "rxjs";

@Directive({
	selector: "fue-select-content",
	standalone: true,
	hostDirectives: [CdkListbox],
	host: {
		"[attr.aria-labelledBy]": "labelledBy()",
		"[attr.aria-controlledBy]": "id() +'-trigger'",
	},
})
export class FueSelectContentComponent implements OnInit {
	base =
		"top-[2px] relative z-50 min-w-[8rem] overflow-scroll rounded-md border bg-popover text-popover-foreground shadow-md p-1 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2";

	private _cdkListbox = inject(CdkListbox, { host: true });

	private _selectService = inject(FueSelectService);

	labelledBy = this._selectService.labelId;

	id = this._selectService.id;

	@Input("class") classNames: ClassValue = "";

	@HostBinding("class")
	get allClassNames() {
		return cn(this.base, this.classNames);
	}

	constructor() {
		this._cdkListbox.valueChange
			.asObservable()
			.pipe(
				takeUntilDestroyed(),
				tap((val: ListboxValueChangeEvent<any>) =>
					this._selectService.listBoxValueChangeEvent$.next(val)
				)
			)
			.subscribe();
	}

	ngOnInit(): void {
		if (this._selectService.multiple()) {
			this._cdkListbox.multiple = true;
		}
	}

	focusList(): void {
		this._cdkListbox.focus();
	}
}
