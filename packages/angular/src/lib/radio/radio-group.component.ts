import {
  AfterContentInit,
  ContentChildren,
  Directive,
  HostBinding,
  HostListener,
  InjectionToken,
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
import { Subject, takeUntil, tap } from "rxjs";
import { FocusKeyManager } from "@angular/cdk/a11y";

// export const FUE_RADIO_GROUP_CONTROL_VALUE_ACCESSOR: Provider = {
//   provide: NG_VALUE_ACCESSOR,
//   useExisting: forwardRef(() => FueRadioGroupDirective),
//   multi: true,
// };

// export const FUE_RADIO_GROUP = new InjectionToken<FueRadioGroupDirective>(
//   "FueRadioGroup"
// );
//
/**
 * Consider this possibility from MAT Radio?
 * 'A group of radio buttons. May contain one or more `<mat-radio-button>` elements.'
 */

/**
 * Scenarios
 * 1. Reactive Form
 * 2. NgModel
 * 3. Default Value setting, for each
 * 4. Entire Disabled
 * 5. Single option disable
 * 6. Verify Form Group States
 */

/**
 * TODOS
 * 1. Give consistent unique group name
 * 2. Setup Different Form type samples
 * 3. Unit Tests
 * 4. Create Playwright tests
 * 5. Cleanup
 */
@Directive({
  selector: "[fueRadioGroup],fue-radio-group",
  standalone: true,
  // providers: [
  //   FUE_RADIO_GROUP_CONTROL_VALUE_ACCESSOR,
  //   { provide: FUE_RADIO_GROUP, useExisting: FueRadioGroupDirective },
  // ],
})
export class FueRadioGroupDirective
  implements ControlValueAccessor, AfterContentInit, OnDestroy
{
  base = ``;

  @Input("class") classNames: ClassValue = "Alex loves Sammy";
  @Input() name!: string;

  @HostBinding("class")
  get allClassNames() {
    return cn(this.base, this.classNames);
  }

  @ContentChildren(FueRadioComponent) radios!: QueryList<FueRadioComponent>;

  ngControl = inject(NgControl);

  private keyManager!: FocusKeyManager<FueRadioComponent>;

  @HostListener("keydown", ["$event"])
  manage(event: any) {
    this.keyManager.onKeydown(event);
  }

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
    this.keyManager = new FocusKeyManager(this.radios).withWrap();
    this.keyManager.setFirstItemActive();

    this.radios.forEach((radio) => {
      radio.name = this.name;
      radio.select
        .pipe(
          takeUntil(this.unsubscribe),
          tap(() => this.updateValue(radio.value))
        )
        .subscribe();
    });
  }

  private updateValue(value: any) {
    this.radios.forEach((radio) => {
      radio.input.nativeElement.value = radio.value === value;
      radio.checked.set(radio.value === value);
    });
    this.onChange(value);
    this.onTouched();
  }

  writeValue(value: any): void {
    if (this.radios) {
      this.radios.forEach((radio) => radio.checked.set(radio.value === value));
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  ngOnDestroy(): void {
    this.unsubscribe.next(true);
    this.unsubscribe.complete();
  }
}
