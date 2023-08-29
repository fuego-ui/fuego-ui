import { Directive, HostBinding, Input } from "@angular/core";
import { ClassValue } from "clsx";
import { cn } from "../utils";

@Directive({
  selector: "fue-card-description, [fueCardDescription]",
  standalone: true,
})
export class FueCardDescriptionDirective {
  base = "text-sm text-muted-foreground";
  @Input("class") classNames: ClassValue = "";

  @HostBinding("class")
  get allClassNames() {
    return cn(this.base, this.classNames);
  }
}
