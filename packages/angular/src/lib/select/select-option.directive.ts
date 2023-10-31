import { Directive, HostBinding, Input, inject } from "@angular/core";
import { CdkOption } from "@angular/cdk/listbox";
import { ClassValue } from "clsx";
import { cn } from "../utils";
import { CdkMenuItem } from "@angular/cdk/menu";

@Directive({
  selector: "[fueSelectOption]",
  standalone: true,
  hostDirectives: [CdkOption, CdkMenuItem],
})
export class FueSelectOptionDirective {
  private _cdkSelectOption = inject(CdkOption, { host: true });

  base =
    "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50";

  @Input("class") classNames: ClassValue = "";

  @HostBinding("class")
  get allClassNames() {
    return cn(this.base, this.classNames);
  }

  @Input()
  set fueSelectOption(value: unknown | null) {
    this._cdkSelectOption.value = value;
  }

  // @Output()
  // triggered = this._cdkSelectOption._clicked.next($event);
}
