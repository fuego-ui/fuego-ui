import { Directive, HostBinding, Input } from "@angular/core";
import { cn } from "../utils";
import { ClassValue } from "clsx";

@Directive({
  selector: "[fueAlertTitle],fue-alert-title",
  standalone: true,
})
export class FueAlertTitleDirective {
  base = `mb-1 font-medium leading-none tracking-tight`;

  @Input("class") classNames: ClassValue = "";

  @HostBinding("class")
  get allClassNames() {
    return cn(this.base, this.classNames);
  }
}
