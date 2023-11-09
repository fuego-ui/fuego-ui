import {
  Directive,
  ElementRef,
  HostBinding,
  Input,
  signal,
} from "@angular/core";
import { ClassValue } from "clsx";
import { cn } from "../utils";

@Directive({
  selector: "[fueInput]",
  standalone: true,
})
export class FueInputDirective {
  baseClass =
    "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

  textareaBaseClasses = "min-h-[80px]";

  isTextarea = signal(false);

  @Input("class") classNames: ClassValue = "";

  @HostBinding("class")
  get allclassNames() {
    return cn(
      this.baseClass,
      this.isTextarea() ? this.textareaBaseClasses : "",
      this.classNames
    );
  }

  @HostBinding() id!: string;

  constructor(elementRef: ElementRef) {
    if (elementRef && elementRef.nativeElement.nodeName === "TEXTAREA") {
      this.isTextarea.set(true);
    }
  }
}
