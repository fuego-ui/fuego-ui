import { Directive, HostBinding, Input } from "@angular/core";
import { ClassValue } from "clsx";
import { cn } from "../utils";

@Directive({
  selector: "fue-skeleton, [fueSkeleton]",
  standalone: true,
})
export class FueSkeletonDirective {
  base = "animate-pulse rounded-md bg-muted";

  @Input("class") classNames: ClassValue = "";

  @HostBinding("class")
  get allClassNames() {
    return cn(this.base, this.classNames);
  }
}
