import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  Input,
  ViewChild,
  inject,
  signal,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { ClassValue } from "clsx";
import { cn } from "../utils";
import { ControlValueAccessor, NgControl } from "@angular/forms";
import { FueLabelDirective } from "../label/label.directive";

let nextId = 0;

@Component({
  selector: "fue-switch",
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <div class="flex items-center space-x-2">
    <button
      [attr.data-state]="checked() ? 'checked' : 'unchecked'"
      [class]="classes"
      [disabled]="disabled()"
      type="button"
      role="checkbox"
      (blur)="_onBlur()"
      (click)="_onToggle()"
    >
      <span
        [attr.data-state]="checked() ? 'checked' : 'unchecked'"
        class="pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
      >
      </span>
    </button>
    <input
      #input
      type="checkbox"
      class="absolute pointer-none opacity-0 m-0 left-7"
      [attr.aria-label]="ariaLabel || null"
      [attr.aria-labelledby]="ariaLabelledby"
      [attr.aria-describedby]="ariaDescribedby"
      [attr.name]="name"
      [attr.value]="value"
      [checked]="checked()"
      [disabled]="disabled()"
      [id]="inputId"
      [required]="required"
      [tabIndex]="tabIndex"
    />
    <div (click)="_preventBubblingFromLabel($event)">
      <ng-content />
    </div>
  </div>`,
})
export class FueSwitchComponent implements ControlValueAccessor {
  base =
    "peer inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input";

  @Input("class") classNames: ClassValue = "";
  @Input() name: string | null = null;
  @Input() value!: string;
  @Input() id!: string;

  private _uniqueId!: number;

  get inputId(): string {
    return `${this.id || "fue-switch-" + this._uniqueId}`;
  }

  disabled = signal(false);

  checked = signal(false);

  @ViewChild("input", { static: true }) input!: ElementRef;

  @ContentChild(FueLabelDirective, { static: false, descendants: true })
  labelEl!: FueLabelDirective;

  ngControl = inject(NgControl);

  constructor() {
    this._uniqueId = nextId++;
    if (this.ngControl != null) {
      // Setting the value accessor directly (instead of using
      // the providers) to avoid running into a circular import.
      this.ngControl.valueAccessor = this;
    }
  }

  _onToggle(): void {
    if (!this.disabled()) {
      this.checked.set(!this.checked());
      this._emitChangeEvent();
    }
  }

  _onBlur(): void {
    Promise.resolve().then(() => {
      this.onTouched();
    });
  }

  _preventBubblingFromLabel($event: MouseEvent): void {
    /*
     * Taking Materials word on label click events
     *
     * Separately need to allow 'a' links to be clickable but also
     * not prevent checkbox toggle
     *
     * While maybe not the best thing ever, seems to be a
     * very common thing, links within checkboxes "label"
     */
    if (
      !!$event.target &&
      this.labelEl.labelElement.nativeElement.contains(
        $event.target as HTMLElement
      )
    ) {
      const targetEl = $event.target as HTMLElement;
      if (!(targetEl.tagName.toLowerCase() === "a")) {
        this._onToggle();
      }

      $event.stopPropagation();
    }
  }

  get classes() {
    return cn(this.base, this.classNames);
  }

  private _emitChangeEvent() {
    // this._controlValueAccessorChangeFn(this.checked);
    // this.change.emit(this._createChangeEvent(this.checked));
    // Assigning the value again here is redundant, but we have to do it in case it was
    // changed inside the `change` listener which will cause the input to be out of sync.
    if (this.input) {
      this.input.nativeElement.checked = this.checked();
    }
  }

  // ControlValueAccessor methods
  writeValue(value: any): void {
    console.log(value);
    // this.input.nativeElement.checked = value;
    this.checked.set(!!value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  private onChange = (value: any) => {};
  private onTouched = () => {};
}
