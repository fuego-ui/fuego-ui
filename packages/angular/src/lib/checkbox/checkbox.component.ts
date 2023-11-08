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
import { NgIf } from "@angular/common";
import { ClassValue } from "clsx";
import { cn } from "../utils";
import { ControlValueAccessor, NgControl } from "@angular/forms";
import { FueLabelDirective } from "../label/label.directive";

let nextId = 0;

/**
 * TODO: Do we really need to have a tap given
 * the label is also clickable
 */

@Component({
  selector: "fue-checkbox",
  standalone: true,
  imports: [NgIf, FueLabelDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <div class="flex items-center space-x-2">
    <button
      type="button"
      role="checkbox"
      [attr.data-state]="checked() ? 'checked' : 'unchecked'"
      [class]="classes"
      [disabled]="disabled()"
      [attr.aria-checked]="checked()"
      (blur)="_onBlur()"
      (click)="_onToggle()"
    >
      <span
        *ngIf="checked()"
        class="flex items-center justify-center text-current"
        style="pointer-events: none;"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="h-4 w-4"
        >
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </span>
    </button>
    <input
      #input
      type="checkbox"
      class="absolute pointer-none opacity-0 m-0 left-7"
      tabIndex=""
      [attr.aria-label]="ariaLabel || null"
      [attr.aria-labelledby]="ariaLabelledby"
      [attr.aria-describedby]="ariaDescribedby"
      [attr.name]="name"
      [attr.value]="value"
      [checked]="checked()"
      [disabled]="disabled()"
      [id]="inputId"
      [required]="required"
    />
    <div (click)="_preventBubblingFromLabel($event)">
      <ng-content />
    </div>
  </div>`,
})
export class FueCheckboxComponent
  implements ControlValueAccessor, AfterContentInit
{
  base =
    "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground";

  @Input("class") classNames: ClassValue = "";
  @Input() name: string | null = null;
  @Input() value!: string;
  @Input() id!: string;
  @Input() required: boolean = false;
  @Input("aria-label") ariaLabel = "";
  @Input("aria-labelledBy") ariaLabelledby = "";
  @Input("aria-describedBy") ariaDescribedby = "";

  private _uniqueId!: number;

  get inputId(): string {
    return `${this.id || "fue-checkbox-" + this._uniqueId}`;
  }

  disabled = signal(false);

  checked = signal(false);

  @ViewChild("input", { static: true }) input!: ElementRef;

  @ContentChild(FueLabelDirective)
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

  ngAfterContentInit(): void {
    if (this.labelEl) {
      this.labelEl.forInput.set(this.inputId);
    }
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
