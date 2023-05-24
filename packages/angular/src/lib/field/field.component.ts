import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  Optional,
  Self,
  ChangeDetectionStrategy,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'fue-field',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="getWrapperClasses()">
      <label [for]="inputId">{{ label }}</label>
      <ng-container [ngSwitch]="inputType">
        <textarea
          *ngSwitchCase="'textarea'"
          [id]="inputId"
          [class.disabled]="isDisabled"
          (focus)="onFocus()"
          (blur)="onBlur()"
          (input)="onChange($event.target.value)"
          >{{ value }}</textarea
        >
        <input
          *ngSwitchDefault
          type="text"
          [id]="inputId"
          [class.disabled]="isDisabled"
          (focus)="onFocus()"
          (blur)="onBlur()"
          (input)="onChange($event.target.value)"
          [value]="value"
        />
      </ng-container>
    </div>
  `,
  styleUrls: ['./field.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldComponent implements ControlValueAccessor {
  @Input() className!: string;
  @Input() inputType: string = 'text';
  @Input() label!: string;
  @Input() disabled: boolean = false;
  isFocused: boolean = false;
  inputId: string = `field-input-${uniqueId()}`;
  value: any;
  onChange: any = () => {};
  onTouched: any = () => {};

  isDisabledSignal = signal(this.disabled);

  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  get isDisabled(): boolean {
    return this.isDisabledSignal();
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabledSignal.set(isDisabled);
  }

  getWrapperClasses(): string {
    const classes = [this.className];
    if (this.isDisabled) {
      classes.push('disabled');
    }
    return classes.join(' ');
  }

  onFocus(): void {
    this.isFocused = true;
  }

  onBlur(): void {
    this.isFocused = false;
    this.onTouched();
  }
}

let idCounter = 0;

function uniqueId(): string {
  return `uid-${idCounter++}`;
}
