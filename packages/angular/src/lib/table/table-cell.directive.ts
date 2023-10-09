import { Directive, HostBinding, Input } from "@angular/core";
import { ClassValue } from "clsx";
import { cn } from "../utils";

@Directive({
  selector: "[fueTableCell]",
  standalone: true,
})
export class FueTableCellDirective {
  base = "p-4 align-middle [&:has([role=checkbox])]:pr-0";

  @Input("class") classNames: ClassValue = "";

  @HostBinding("class")
  get allClassNames() {
    return cn(this.base, this.classNames);
  }
}
