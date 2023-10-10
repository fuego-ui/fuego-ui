import {
  Component,
  Input,
  forwardRef,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
  signal,
  HostListener,
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { FueSliderThumbComponent } from "./slider-thumb.component";
import { cn } from "../utils";
import { ClassValue } from "clsx";
import { FueSliderTrackComponent } from "./slider-track.component";
import { NumberInput, coerceNumberProperty } from "@angular/cdk/coercion";

const SLIDER_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => FueSliderComponent),
  multi: true,
};

@Component({
  selector: "fue-slider",
  standalone: true,
  providers: [SLIDER_VALUE_ACCESSOR],
  imports: [FueSliderThumbComponent, FueSliderTrackComponent],
  template: `<span
    [class]="classes"
    (mousedown)="onMouseDown($event)"
    (mousemove)="onMouseMove($event)"
    (mouseup)="onMouseUp()"
    #slider
  >
    <span
      class="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary"
      aria-orientation="horizontal"
      data-orientation="horizontal"
    >
      <span
        class="absolute h-full bg-primary"
        [style.left]="0"
        [style.right]="'calc(100% - var(--thumb-position))'"
      ></span>
    </span>
    <span
      style="transform: translatex(-50%); position: absolute;"
      [style.left]="'calc(var(--thumb-position) + 0.8px)'"
    >
      <span
        class="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        role="slider"
        [attr.aria-valuemin]="min"
        [attr.aria-valuemax]="max"
        aria-orientation="horizontal"
        data-orientation="horizontal"
        tabindex="0"
      ></span>
    </span>
    <!-- <fue-slider-thumb [style.left]="value"></fue-slider-thumb> -->
  </span>`,
})
export class FueSliderComponent implements ControlValueAccessor {
  base = "relative flex touch-none select-none items-center w-[60%]";

  get classes() {
    return cn(this.base, this.classNames);
  }

  @Input("class") classNames: ClassValue = "";
  @Input() min: number = 0;
  @Input() max: number = 100;

  @Input()
  get value(): number {
    return this._value();
  }
  set value(valueMax: NumberInput) {
    this._value.set(coerceNumberProperty(valueMax));
  }
  private _value = signal(0);
  position = signal(0);

  @Output() valueChange = new EventEmitter<number>();

  @ViewChild("slider") slider!: ElementRef;

  @HostListener("document:mousemove", ["$event"]) // Listen for mousemove events on the entire document
  onMouseMoveGlobal(event: MouseEvent) {
    if (this.isDragging) {
      this.onMouseMove(event);
    }
  }

  @HostListener("document:mouseup", ["$event"]) // Listen for mouseup events on the entire document
  onMouseUpGlobal(event: MouseEvent) {
    if (this.isDragging) {
      this.onMouseUp();
    }
  }

  private isDragging: boolean = false;

  ngAfterViewInit() {
    this.updateThumbPosition();
  }

  onMouseDown(event: MouseEvent) {
    this.isDragging = true;
    this.updateValue(event);
  }

  onMouseMove(event: MouseEvent) {
    if (this.isDragging) {
      this.updateValue(event);
    }
  }

  onMouseUp() {
    this.isDragging = false;
  }

  private updateValue(event: MouseEvent) {
    const rect = this.slider.nativeElement.getBoundingClientRect();
    const newValue =
      this.min +
      ((this.max - this.min) * (event.clientX - rect.left)) / rect.width;

    this.value = Math.max(this.min, Math.min(this.max, newValue));
    this.valueChange.emit(this.value);
    this.updateThumbPosition();
    this.onModelChange(this.value); // Notify the form API about the change
    this.onTouch(); // Notify that the control has been touched
  }

  private updateThumbPosition() {
    const position = ((this.value - this.min) / (this.max - this.min)) * 100;
    this.slider.nativeElement.style.setProperty(
      "--thumb-position",
      `${position}%`
    );
  }

  // Functions to handle the ControlValueAccessor interface
  private onTouch: any;
  private onModelChange: any;

  writeValue(val: number): void {
    this.value = val;
    this.updateThumbPosition();
  }

  registerOnChange(fn: any): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Implement this if you want to disable the slider
  }
}
