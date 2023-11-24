import {
	Component,
	ElementRef,
	Input,
	OnDestroy,
	ViewChild,
	computed,
	inject,
} from "@angular/core";
import { radixChevronDown } from "@ng-icons/radix-icons";
import { FueSelectService } from "./select.service";
import { provideIcons } from "@ng-icons/core";
import { FueIconComponent } from "../icon";
import { ClassValue } from "clsx";
import { Subject } from "rxjs";
import { cn } from "../utils";

@Component({
	selector: "fue-select-trigger",
	standalone: true,
	imports: [FueIconComponent],
	providers: [provideIcons({ radixChevronDown })],
	template: ` <button
		[class]="classes"
		#button
		role="combobox"
		type="button"
		[id]="selectTriggerId()"
		[disabled]="selectDisable()"
		[attr.aria-expanded]="isExpanded()"
		[attr.aria-controls]="selectContentId() + ''"
	>
		<ng-content /><fue-icon size="100%" name="radixChevronDown" />
	</button>`,
})
export class FueSelectTriggerComponent implements OnDestroy {
	@ViewChild("button") buttonEl!: ElementRef;

	unsubscribe = new Subject<boolean>();

	private _selectService = inject(FueSelectService);

	readonly isExpanded = this._selectService.isExpanded;

	readonly selectTriggerId = computed(
		() => `${this._selectService.id()}--trigger`
	);
	readonly selectContentId = computed(
		() => `${this._selectService.id()}--content`
	);

	readonly selectDisable = this._selectService.disabled;

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
