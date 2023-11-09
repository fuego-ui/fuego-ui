import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from "@angular/core";
import { cn } from "../utils";
import { ClassValue } from "clsx";

@Component({
  selector: "fue-select-label",
  template: `<ng-content />`,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FueSelectLabelComponent {
  base = "py-1.5 pl-8 pr-2 text-sm font-semibold";

  @Input("class") classNames: ClassValue = "";

  @HostBinding("class")
  get allClassNames() {
    return cn(this.base, this.classNames);
  }
}
