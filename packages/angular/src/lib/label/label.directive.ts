import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostBinding,
  Input,
  inject,
  signal,
} from "@angular/core";
import { ClassValue } from "clsx";
import { cn } from "../utils";
import { FueCheckboxComponent } from "../checkbox";

@Directive({
  selector: "[fueLabel]",
  standalone: true,
  host: {
    for: "forInput",
  },
})
export class FueLabelDirective implements AfterViewInit {
  base =
    "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70";

  @Input("class") classNames: ClassValue = "";

  forInput!: string;
  appearClickable = signal(false);

  checkboxInstance = inject(FueCheckboxComponent);

  @HostBinding("class")
  get allClassNames() {
    return cn(this.base, this.classNames, this.getCursor());
  }

  constructor(public labelElement: ElementRef) {
    // Check that at least some wrapper input component is being used else throw an error
    if (this.checkboxInstance) {
      console.log(this.checkboxInstance);
    }
  }

  getCursor() {
    return this.appearClickable() && "cursor-pointer";
  }

  ngAfterViewInit(): void {
    this.forInput = this.checkboxInstance.inputId;
  }
}
