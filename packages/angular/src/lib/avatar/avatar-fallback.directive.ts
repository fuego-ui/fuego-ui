import { Directive, HostBinding, Input } from "@angular/core";
import { cn } from "../utils";
import { ClassValue } from "clsx";

@Directive({
  selector: "[fueAvatarFallback]",
  standalone: true,
})
export class FueAvatarFallbackDirective {
  base =
    "flex h-full w-full items-center justify-center rounded-full bg-muted top-0 left-0 absolute";

  @Input("class") classNames: ClassValue = "";

  @HostBinding("class")
  get allClassNames() {
    return cn(this.base, this.classNames);
  }
}
