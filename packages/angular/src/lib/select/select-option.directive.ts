import { Directive, HostBinding, Input, inject } from "@angular/core";
import { CdkOption } from "@angular/cdk/listbox";
import { ClassValue } from "clsx";
import { cn } from "../utils";
import { CdkMenuItem } from "@angular/cdk/menu";

@Directive({
  selector: "[fueSelectOption]",
  standalone: true,
  hostDirectives: [CdkOption, CdkMenuItem],
  host: {
    "(keydown)": "_onKeydown($event)",
  },
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

  _onKeydown(event: KeyboardEvent) {
    console.log("ncjds");
    // switch (event.keyCode) {
    //   case SPACE:
    //   case ENTER:
    //     // Skip events that will trigger clicks so the handler doesn't get triggered twice.
    //     if (!hasModifierKey(event) && !eventDispatchesNativeClick(this._elementRef, event)) {
    //       this.trigger({keepOpen: event.keyCode === SPACE && !this.closeOnSpacebarTrigger});
    //     }
    //     break;

    //   case RIGHT_ARROW:
    //     if (!hasModifierKey(event)) {
    //       if (this._parentMenu && this._isParentVertical()) {
    //         if (this._dir?.value !== 'rtl') {
    //           this._forwardArrowPressed(event);
    //         } else {
    //           this._backArrowPressed(event);
    //         }
    //       }
    //     }
    //     break;

    //   case LEFT_ARROW:
    //     if (!hasModifierKey(event)) {
    //       if (this._parentMenu && this._isParentVertical()) {
    //         if (this._dir?.value !== 'rtl') {
    //           this._backArrowPressed(event);
    //         } else {
    //           this._forwardArrowPressed(event);
    //         }
    //       }
    //     }
    //     break;
    // }
  }
}
