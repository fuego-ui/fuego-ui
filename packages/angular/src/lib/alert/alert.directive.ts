import { Directive, HostBinding, Input } from "@angular/core";
import { cn } from "../utils";
import { ClassValue } from "clsx";

@Directive({
  selector: "[fueAlert]",
  standalone: true,
  host: {
    role: "alert",
  },
})
export class FueAlertDirective {
  @Input() variant = "default";
  @Input("class") classNames: ClassValue = "";

  @HostBinding("class")
  get allClassNames() {
    return cn(this.base, this.getVariantClasses(), this.classNames);
  }

  base = `relative w-full rounded-lg border p-4 [&>ng-icon~*]:pl-7 [&> ng-icon+div]:translate-y-[-3px] [&>ng-icon]:absolute [&>ng-icon]:left-4 [&>ng-icon]:top-4 [&>ng-icon]:text-foreground`;

  getVariantClasses() {
    switch (this.variant) {
      case "destructive":
        return "border-destructive/50 text-destructive dark:border-destructive [&>ng-icon]:text-destructive";
      default:
        // primary default
        return "bg-background text-foreground";
    }
  }
}
