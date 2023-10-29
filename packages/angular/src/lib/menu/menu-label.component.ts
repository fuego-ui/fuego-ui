import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from "@angular/core";
import { cn } from "../utils";
import { ClassValue } from "clsx";

@Component({
  selector: "fue-menu-label",
  template: `<ng-content />`,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FueMenuLabelComponent {
  base = "px-2 py-1.5 text-sm font-semibold";

  @Input("class") classNames: ClassValue = "";

  @HostBinding("class")
  get allClassNames() {
    return cn(this.base, this.classNames);
  }
}
