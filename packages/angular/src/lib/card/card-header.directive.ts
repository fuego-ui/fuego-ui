import { Directive, HostBinding, Input } from "@angular/core";
import { ClassValue } from "clsx";
import { cn } from "../utils";

@Directive({
  selector: "fue-card-header, , [fueCardHeader]",
  standalone: true,
})
export class FueCardHeaderDirective {
  base = "flex flex-col space-y-1.5 p-6";
  @Input("class") classNames: ClassValue = "";

  @HostBinding("class")
  get allClassNames() {
    return cn(this.base, this.classNames);
  }
}
