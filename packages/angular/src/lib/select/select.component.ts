import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { ControlValueAccessor, NgControl } from "@angular/forms";
import { FueSelectService } from "./select.service";

@Component({
  selector: "fue-select",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: "inline-block",
  },
  template: `<ng-content />`,
  providers: [FueSelectService],
})
export class FueSelectComponent implements ControlValueAccessor {
  value!: string;

  ngControl = inject(NgControl);

  constructor() {
    // this._uniqueId = nextId++;
    if (this.ngControl != null) {
      // Setting the value accessor directly (instead of using
      // the providers) to avoid running into a circular import.
      this.ngControl.valueAccessor = this;
    }
  }

  onChange!: (value: any) => void;
  onTouched!: () => void;

  onSelectionChange(event: any) {
    this.value = event.source.value;
    this.onChange(this.value);
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

  setDisabledState?(isDisabled: boolean): void {}
}
