import {
  AfterContentInit,
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
  imports: [CommonModule, FueLabelDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <div class="flex items-center space-x-2">
    <button
      type="button"
      role="switch"
      [attr.data-state]="dataState"
      [class]="classes"
      [disabled]="disabled()"
      (blur)="_onBlur()"
      (click)="_onToggle()"
      [attr.ariaLabelledby]="labelledBy()"
      [attr.aria-checked]="checked()"
    >
      <span
        [attr.data-state]="dataState"
        class="pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
      >
      </span>
    </button>
    <div (click)="_preventBubblingFromLabel($event)">
      <ng-content />
    </div>
  </div>`,
})
export class FueSwitchComponent
  implements ControlValueAccessor, AfterContentInit
{
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

  get dataState(): string {
    return this.checked() ? "checked" : "unchecked";
  }

  disabled = signal(false);

  checked = signal(false);

  labelledBy = signal("");

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

  ngAfterContentInit(): void {
    if (this.labelEl) {
      this.labelEl.forInput.set(this.inputId);
      this.labelledBy.set(this.labelEl.elementId);
    }
  }

  // ControlValueAccessor methods
  writeValue(value: any): void {
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
