import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  signal,
} from "@angular/core";
import { NgIf } from "@angular/common";
import { ClassValue } from "clsx";
import { cn } from "../utils";
import { FueLabelDirective } from "../label/label.directive";
import { FocusableOption } from "@angular/cdk/a11y";
import { BooleanInput, coerceBooleanProperty } from "@angular/cdk/coercion";

let nextId = 0;

/**
 * TODO: Do we really need to have a tap given
 * the label is also clickable
 */

@Component({
  selector: "fue-radio",
  standalone: true,
  imports: [NgIf, FueLabelDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <div class="flex items-center space-x-2">
    <button
      #radioBtn
      type="button"
      role="radio"
      [disabled]="disabled"
      [tabIndex]="checked() ? '0' : '-1'"
      [attr.data-state]="checked() ? 'checked' : 'unchecked'"
      [class]="classes"
      [attr.aria-checked]="checked()"
      (click)="_onToggle()"
    >
      <!-- friendship -->
      <span
        *ngIf="checked()"
        class="flex items-center justify-center pointer-events-none"
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
          class="h-2.5 w-2.5 fill-current text-current"
        >
          <circle cx="12" cy="12" r="10"></circle>
        </svg>
      </span>
    </button>
    <input
      #input
      type="radio"
      class="absolute pointer-none opacity-0 m-0 left-7"
      tabIndex="-1"
      [attr.aria-label]="ariaLabel || null"
      [attr.aria-labelledby]="ariaLabelledby"
      [attr.aria-describedby]="ariaDescribedby"
      [attr.name]="name"
      [attr.value]="value"
      [checked]="checked()"
      [disabled]="disabled"
      [id]="inputId"
      [required]="required"
      [value]="value"
    />
    <div (click)="_preventBubblingFromLabel($event)">
      <ng-content />
    </div>
  </div>`,
})
export class FueRadioComponent implements AfterContentInit, FocusableOption {
  base =
    "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

  private _uniqueId!: number;

  private _disabled = signal(false);

  checked = signal(false);

  get inputId(): string {
    return `${this.id || "fue-radio-" + this._uniqueId}`;
  }

  get classes() {
    return cn(this.base, this.classNames);
  }

  @Input("class") classNames: ClassValue = "";
  @Input() name: string | null = null;
  @Input() value!: string;
  @Input() id!: string;

  @Input()
  get disabled(): boolean {
    return this._disabled();
  }
  set disabled(disabled: BooleanInput) {
    this._disabled.set(coerceBooleanProperty(disabled));
  }

  @Output() select = new EventEmitter<void>();

  @ViewChild("input", { static: true }) input!: ElementRef;
  @ViewChild("radioBtn", { static: true }) radioBtn!: ElementRef;

  @ContentChild(FueLabelDirective)
  labelEl!: FueLabelDirective;

  constructor() {
    this._uniqueId = nextId++;
  }

  _onToggle(): void {
    if (!this.disabled && !this.checked()) {
      this._emitChangeEvent();
    }
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

  focus(): void {
    this._onToggle();
    this.radioBtn.nativeElement.focus();
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
      this.input.nativeElement.checked = true;
    }
    this.select.emit();
  }
}
