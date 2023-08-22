import { Directive, HostBinding, Input } from "@angular/core";
import { ClassValue } from "clsx";
import { cn } from "../utils";

@Directive({
  selector: "fue-card, [fueCard]",
  standalone: true,
})
export class FueCardDirective {
  base =
    "flex flex-col rounded-lg border bg-card text-card-foreground shadow-sm";
  @Input("class") classNames: ClassValue = "";

  @HostBinding("class")
  get allClassNames() {
    return cn(this.base, this.classNames);
  }
}
