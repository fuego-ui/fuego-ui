import { Directive, HostBinding, Input, OnInit, inject } from "@angular/core";
import { CdkListbox } from "@angular/cdk/listbox";
import { ClassValue } from "clsx";
import { FueSelectService } from "./select.service";
import { Subject, takeUntil, tap } from "rxjs";
import { cn } from "../utils";

@Directive({
	selector: "fue-select-content",
	standalone: true,
	hostDirectives: [CdkListbox],
})
export class FueSelectContentComponent implements OnInit {
	base =
		"top-[2px] relative z-50 min-w-[8rem] overflow-scroll rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2";

	private _cdkListbox = inject(CdkListbox, { host: true });

	private _selectService = inject(FueSelectService);

	@Input("class") classNames: ClassValue = "";

	@HostBinding("class")
	get allClassNames() {
		return cn(this.base, this.classNames);
	}

	destroyed = new Subject<boolean>();

	ngOnInit(): void {
		this._cdkListbox.valueChange
			.asObservable()
			.pipe(
				takeUntil(this.destroyed),
				tap((val) => this._selectService.valueChange(val))
			)
			.subscribe();

		if (this._selectService.multiple()) {
			this._cdkListbox.multiple = true;
		}
	}

	focusList(): void {
		this._cdkListbox.focus();
	}

	ngOnDestroy(): void {
		this.destroyed.next(true);
		this.destroyed.complete();
	}
}
