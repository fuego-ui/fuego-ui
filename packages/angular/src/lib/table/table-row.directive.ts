import { Directive, HostBinding, Input } from "@angular/core";
import { ClassValue } from "clsx";
import { cn } from "../utils";

@Directive({
  selector: "[fueTableRow]",
  standalone: true,
})
export class FueTableRowDirective {
  base =
    "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted";

  @Input("class") classNames: ClassValue = "";

  @HostBinding("class")
  get allClassNames() {
    return cn(this.base, this.classNames);
  }
}
