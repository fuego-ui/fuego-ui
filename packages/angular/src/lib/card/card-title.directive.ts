import { Directive, HostBinding, Input } from "@angular/core";
import { ClassValue } from "clsx";
import { cn } from "../utils";

@Directive({
  selector: "fue-card-title, [fueCardTitle]",
  standalone: true,
})
export class FueCardTitleDirective {
  base = "text-2xl font-semibold leading-none tracking-tight";
  @Input("class") classNames: ClassValue = "";

  @HostBinding("class")
  get allClassNames() {
    return cn(this.base, this.classNames);
  }
}
