import { Component, ElementRef, Input, ViewChild } from "@angular/core";
import { ClassValue } from "clsx";
import { provideIcons } from "@ng-icons/core";
import { radixChevronDown } from "@ng-icons/radix-icons";
import { FueIconComponent } from "../icon";
import { cn } from "../utils";

@Component({
	selector: "fue-select-trigger",
	standalone: true,
	imports: [FueIconComponent],
	providers: [provideIcons({ radixChevronDown })],
	template: `<button [class]="classes" #button>
		<ng-content /><fue-icon size="100%" name="radixChevronDown" />
	</button>`,
})
export class FueSelectTriggerComponent {
	@ViewChild("button") buttonEl!: ElementRef;

	base =
		"flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-[180px]";

	@Input("class") classNames: ClassValue = "";

	get classes() {
		return cn(this.base, this.classNames);
	}

	focus() {
		this.buttonEl.nativeElement.focus();
	}
}
