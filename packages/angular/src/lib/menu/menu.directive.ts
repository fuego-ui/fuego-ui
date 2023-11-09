import {
  ContentChildren,
  Directive,
  HostBinding,
  Input,
  QueryList,
} from "@angular/core";
import { CdkMenu } from "@angular/cdk/menu";
import { ClassValue } from "clsx";
import { cn } from "../utils";
import { FueMenuItemDirective } from "./menu-item.directive";

@Directive({
  selector: "[fueMenu],[fueSubMenu]",
  standalone: true,
  hostDirectives: [CdkMenu],
})
export class FueMenuDirective {
  base = `z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2`;
  @Input("class") classNames: ClassValue = "";

  @HostBinding("class")
  get allClassNames() {
    return cn(this.base, this.classNames);
  }

  //   @ContentChildren<FueMenuItemDirective> menuItems: QueryList<>
}
