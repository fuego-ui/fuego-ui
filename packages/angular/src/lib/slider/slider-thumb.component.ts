import {
  ChangeDetectionStrategy,
  Component,
  Input,
  signal,
} from "@angular/core";
import { ClassValue } from "clsx";
import { cn } from "../utils";
import { NumberInput, coerceNumberProperty } from "@angular/cdk/coercion";

@Component({
  selector: "fue-slider-thumb",
  template: `<span
    [class]="classes"
    role="slider"
    [attr.aria-valuemin]="valueMin"
    [attr.aria-valuemax]="valueMax"
    aria-orientation="horizontal"
    data-orientation="horizontal"
    tabindex="0"
  ></span>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class FueSliderThumbComponent {
  base =
    "block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  @Input()
  get valueMax(): number {
    return this._valueMax();
  }
  set valueMax(valueMax: NumberInput) {
    this._valueMax.set(coerceNumberProperty(valueMax));
  }
  private _valueMax = signal(0);

  @Input()
  get valueMin(): number {
    return this._valueMin();
  }
  set valueMin(valueMin: NumberInput) {
    this._valueMin.set(coerceNumberProperty(valueMin));
  }
  private _valueMin = signal(0);

  @Input("class") classNames: ClassValue = "";

  get classes() {
    return cn(this.base, this.classNames);
  }
}
