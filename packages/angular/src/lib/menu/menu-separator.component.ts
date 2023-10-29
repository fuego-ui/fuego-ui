import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from "@angular/core";
import { ClassValue } from "clsx";
import { cn } from "../utils";

@Component({
  selector: "fue-menu-separator",
  template: ``,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FueMenuSeparatorComponent {
  base = "block -mx-1 my-1 h-px bg-muted";

  @Input("class") classNames: ClassValue = "";

  @HostBinding("class")
  get allClassNames() {
    return cn(this.base, this.classNames);
  }
}
