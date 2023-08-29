import { Directive, HostBinding, Input } from "@angular/core";
import { ClassValue } from "clsx";
import { cn } from "../utils";
@Directive({
  selector: "fue-card-content, [fueCardContent]",
  standalone: true,
})
export class FueCardContentDirective {
  base = "block p-6 pt-0";
  @Input("class") classNames: ClassValue = "";

  @HostBinding("class")
  get allClassNames() {
    return cn(this.base, this.classNames);
  }
}
