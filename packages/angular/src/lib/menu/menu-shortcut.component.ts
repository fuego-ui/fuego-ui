import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from "@angular/core";
import { cn } from "../utils";
import { ClassValue } from "clsx";

@Component({
  selector: "fue-menu-shortcut",
  template: `<ng-content />`,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FueMenuShortcutComponent {
  base = "ml-auto text-xs tracking-widest opacity-60";

  @Input("class") classNames: ClassValue = "";

  @HostBinding("class")
  get allClassNames() {
    return cn(this.base, this.classNames);
  }
}
