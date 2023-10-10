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
  selector: "fue-slider-track",
  template: `<span
    [class]="classes"
    aria-orientation="horizontal"
    data-orientation="horizontal"
  >
    <span
      class="absolute h-full bg-primary"
      style="left: 0%; right: 55%;"
    ></span>
  </span>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class FueSliderTrackComponent {
  base = "relative h-2 w-full grow overflow-hidden rounded-full bg-secondary";

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
