import { Directive, HostBinding, Input } from "@angular/core";
import { cn } from "../utils";
import { ClassValue } from "clsx";

@Directive({
  selector: "[fueBadge], fue-badge",
  standalone: true,
})
export class FueBadgeDirective {
  base =
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";

  @Input() variant = "default";
  @Input("class") classNames: ClassValue = "";

  @HostBinding("class")
  get allClassNames() {
    return cn(this.base, this.getVariantClasses(), this.classNames);
  }

  getVariantClasses() {
    switch (this.variant) {
      case "secondary":
        return "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80";
      case "destructive":
        return "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80";
      case "outline":
        return "text-foreground";
      default:
        return "border-transparent bg-primary text-primary-foreground hover:bg-primary/80";
    }
  }
}
