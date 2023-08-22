import { Directive, HostBinding, Input } from "@angular/core";
import { cn } from "../utils";

@Directive({
  selector: "[fueBtn]",
  standalone: true,
})
export class FueButtonDirective {
  @Input() variant = "primary";
  @Input() className: string = "";
  @Input() size: "default" | "sm" | "icon" | "lg" = "default";

  @HostBinding("class")
  get classes() {
    return cn(
      this.base,
      this.getVariantClasses(),
      this.getSizeClasses(),
      this.className
    );
  }

  base = `inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50`;

  getVariantClasses() {
    switch (this.variant) {
      case "secondary":
        return "bg-secondary text-secondary-foreground hover:bg-secondary/80";
      case "destructive":
        return "bg-destructive text-destructive-foreground hover:bg-destructive/90";
      case "outline":
        return "border border-input bg-background hover:bg-accent hover:text-accent-foreground";
      case "ghost":
        return "hover:bg-accent hover:text-accent-foreground";
      case "link":
        return "text-primary underline-offset-4 hover:underline";
      default:
        // primary default
        return "bg-primary text-primary-foreground hover:bg-primary/90";
    }
  }

  getSizeClasses() {
    switch (this.size) {
      case "sm":
        return "h-9 rounded-md px-3";
      case "lg":
        return "h-11 rounded-md px-8";
      case "icon":
        return "h-10 w-10";
      default:
        return "h-10 px-4 py-2";
    }
  }
}
