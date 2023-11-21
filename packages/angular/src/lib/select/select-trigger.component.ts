import {
	Component,
	ElementRef,
	Input,
	OnDestroy,
	ViewChild,
	inject,
	signal,
} from "@angular/core";
import { ClassValue } from "clsx";
import { provideIcons } from "@ng-icons/core";
import { radixChevronDown } from "@ng-icons/radix-icons";
import { FueIconComponent } from "../icon";
import { cn } from "../utils";
import { FueSelectService } from "./select.service";
import { Subject, takeUntil, tap } from "rxjs";
import { AsyncPipe } from "@angular/common";

@Component({
	selector: "fue-select-trigger",
	standalone: true,
	imports: [FueIconComponent, AsyncPipe],
	providers: [provideIcons({ radixChevronDown })],
	template: ` @if({isExpanded: isExpanded$ |async}; as vm$){
		<button
			[class]="classes"
			#button
			role="combobox"
			type="button"
			[attr.aria-expanded]="vm$.isExpanded"
			[attr.aria-controls]=""
		>
			<ng-content /><fue-icon size="100%" name="radixChevronDown" />
		</button>
		}`,
})
export class FueSelectTriggerComponent implements OnDestroy {
	// readonly isExpanded$$ = signal(false);

	@ViewChild("button") buttonEl!: ElementRef;

	unsubscribe = new Subject<boolean>();

	private selectService = inject(FueSelectService);

	readonly isExpanded$ = this.selectService.openChanges;

	base =
		"flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-[180px]";

	@Input("class") classNames: ClassValue = "";

	get classes() {
		return cn(this.base, this.classNames);
	}

	focus() {
		this.buttonEl.nativeElement.focus();
	}

	ngOnDestroy(): void {
		this.unsubscribe.next(true);
		this.unsubscribe.complete();
	}
}
