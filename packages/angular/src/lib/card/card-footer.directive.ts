import { Directive, HostBinding, Input } from "@angular/core";
import { ClassValue } from "clsx";
import { cn } from "../utils";

@Directive({
  selector: "fue-card-footer, [fueCardFooter]",
  standalone: true,
})
export class FueCardFooterDirective {
  base = "flex items-center p-6 pt-0";
  @Input("class") classNames: ClassValue = "";

  @HostBinding("class")
  get allClassNames() {
    return cn(this.base, this.classNames);
  }
}
