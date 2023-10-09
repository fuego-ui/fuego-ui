import {
  AfterContentInit,
  ContentChildren,
  Directive,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  Provider,
  QueryList,
  forwardRef,
  inject,
  signal,
} from "@angular/core";
import { cn } from "../utils";
import { ClassValue } from "clsx";
import { FueRadioComponent } from "./radio.component";
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NgControl,
} from "@angular/forms";
import { Subject, takeUntil } from "rxjs";

// export const RADIO_GROUP_CONTROL_VALUE_ACCESSOR: Provider = {
//   provide: NG_VALUE_ACCESSOR,
//   useExisting: forwardRef(() => FueRadioGroupDirective),
//   multi: true,
// };

@Directive({
  selector: "[fueRadioGroup],fue-radio-group",
  standalone: true,
  //   providers: [RADIO_GROUP_CONTROL_VALUE_ACCESSOR],
})
export class FueRadioGroupDirective
  implements ControlValueAccessor, AfterContentInit, OnDestroy
{
  base = ``;

  @Input("class") classNames: ClassValue = "";
  @Input() name!: string;

  @HostBinding("class")
  get allClassNames() {
    return cn(this.base, this.classNames);
  }

  @ContentChildren(FueRadioComponent) radios!: QueryList<FueRadioComponent>;

  ngControl = inject(NgControl);

  checked = signal(false);
  disabled = signal(false);

  private onChange = (value: any) => {};
  private onTouched = () => {};

  unsubscribe = new Subject<boolean>();

  constructor() {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngAfterContentInit(): void {
    console.log(this.radios);
    this.radios.forEach((radio) => {
      radio.name = this.name;
      radio.select.pipe(takeUntil(this.unsubscribe)).subscribe(() => {
        console.log("on sub");
        console.log(radio);
        console.log(radio.value);
        this.updateValue(radio.value);
      });
    });
  }

  private updateValue(value: any) {
    this.radios.forEach((radio) => {
      console.log(radio.input.nativeElement.value);
      console.log(value);
      radio.input.nativeElement.value = radio.value === value;
      radio.checked.set(radio.value === value);
    });
    this.onChange(value);
    this.onTouched();
  }

  // ControlValueAccessor methods
  writeValue(value: any): void {
    // this.input.nativeElement.checked = value;
    // this.checked.set(!!value);
    if (this.radios) {
      this.radios.forEach((radio) => {
        console.log(radio.value);
        radio.checked.set(radio.value === value);
      });
    }
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

  ngOnDestroy(): void {
    this.unsubscribe.next(true);
    this.unsubscribe.complete();
  }
}
