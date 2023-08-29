import { Directive, HostBinding, Input } from "@angular/core";
import { cn } from "../utils";
import { ClassValue } from "clsx";

@Directive({
  selector: "[fueAlertDescription], fue-alert-description",
  standalone: true,
})
export class FueAlertDescriptionDirective {
  base = `text-sm [&_p]:leading-relaxed`;

  @Input("class") classNames: ClassValue = "";

  @HostBinding("class")
  get allClassNames() {
    return cn(this.base, this.classNames);
  }
}
