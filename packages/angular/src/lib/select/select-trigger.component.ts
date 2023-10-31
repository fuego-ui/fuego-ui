import { Component, Input } from "@angular/core";
import { ClassValue } from "clsx";
import { provideIcons } from "@ng-icons/core";
import { radixChevronDown } from "@ng-icons/radix-icons";
import { cn } from "../utils";
import { FueIconComponent } from "../icon";

@Component({
  selector: "fue-select-trigger",
  standalone: true,
  imports: [FueIconComponent],
  providers: [provideIcons({ radixChevronDown })],
  template: `<button [class]="classes">
    <ng-content /><fue-icon
      class="flex h-4 w-4"
      size="100%"
      name="radixChevronDown"
    />
  </button>`,
})
export class FueSelectTriggerComponent {
  base =
    "flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-[180px]";

  @Input("class") classNames: ClassValue = "";

  get classes() {
    return cn(this.base, this.classNames);
  }
}
