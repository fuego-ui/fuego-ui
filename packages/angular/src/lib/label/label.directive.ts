import {
	Directive,
	ElementRef,
	HostBinding,
	Input,
	inject,
	signal,
} from "@angular/core";
import { ClassValue } from "clsx";
import { cn } from "../utils";

let nextId = 0;

@Directive({
	selector: "fue-label, [fueLabel]",
	standalone: true,
	host: {
		"[for]": "forInput()",
	},
})
export class FueLabelDirective {
	base =
		"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70";

	forInput = signal("");
	appearClickable = signal(false);

	public labelElement = inject(ElementRef);

	id = `fue-label-${nextId++}`;

	@Input("class") classNames: ClassValue = "";
	@Input("id") customId: string = "";

	@HostBinding("id")
	get elementId() {
		return this.customId || this.id;
	}

	@HostBinding("class")
	get allClassNames() {
		return cn(this.base, this.classNames);
	}
}
