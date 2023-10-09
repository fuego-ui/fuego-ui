import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { ClassValue } from "clsx";
import { cn } from "../utils";

@Component({
  selector: "fue-table",
  template: `<table [class]="classes">
    <ng-content />
  </table>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  styles: [
    `
      .caption-bottom {
        caption-side: bottom;
      }
    `,
  ],
})
export class FueTableComponent {
  base = "w-full caption-bottom text-sm";

  get classes() {
    return cn(this.base, this.classNames);
  }

  @Input("class") classNames: ClassValue = "";
}
