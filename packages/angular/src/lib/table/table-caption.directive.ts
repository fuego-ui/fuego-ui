import { Directive, HostBinding, Input } from "@angular/core";
import { ClassValue } from "clsx";
import { cn } from "../utils";

@Directive({
  selector: "[fueTableCaption]",
  standalone: true,
})
export class FueTableCaptionDirective {
  base = "mt-4 text-sm text-muted-foreground";

  @Input("class") classNames: ClassValue = "";

  @HostBinding("class")
  get allClassNames() {
    return cn(this.base, this.classNames);
  }
}
