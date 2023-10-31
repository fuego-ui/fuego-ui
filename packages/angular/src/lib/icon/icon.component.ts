import {
  ChangeDetectionStrategy,
  Component,
  Input,
  signal,
  ViewEncapsulation,
} from "@angular/core";
import { IconName, NgIconComponent } from "@ng-icons/core";
import { ClassValue } from "clsx";
import { cn } from "../utils";

export type IconSize = "xs" | "sm" | "base" | "lg" | "xl" | "none" | string;

@Component({
  selector: "fue-icon",
  standalone: true,
  imports: [NgIconComponent],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ng-icon
    [class]="classes"
    [size]="size"
    [name]="_name()"
    [color]="_color()"
    [strokeWidth]="_strokeWidth()"
  />`,
})
export class FueIconComponent {
  protected readonly _name = signal<IconName | string>("");
  protected readonly _size = signal<IconSize>("base");
  protected readonly _color = signal<string | undefined>(undefined);
  protected readonly _strokeWidth = signal<string | number | undefined>(
    undefined
  );

  @Input({ required: true })
  set name(value: IconName | string) {
    this._name.set(value);
  }

  @Input()
  set size(value: IconSize) {
    this._size.set(value);
  }

  @Input()
  set color(value: string | undefined) {
    this._color.set(value);
  }

  @Input()
  set strokeWidth(value: string | number | undefined) {
    this._strokeWidth.set(value);
  }

  @Input("class") classNames: ClassValue = "";

  get classes() {
    return cn(this.getSizeClasses(), this.classNames);
  }

  getSizeClasses() {
    switch (this.size) {
      case "xs":
        return "h-3 w-3";
      case "sm":
        return "h-4 w-4";
      case "base":
        return "h-6 w-6";
      case "lg":
        return "h-8 w-8";
      case "xl":
        return "h-12 w-12";
      default:
        return "";
    }
  }
}
