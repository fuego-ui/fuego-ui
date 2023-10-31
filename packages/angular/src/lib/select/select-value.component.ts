import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  inject,
  signal,
} from "@angular/core";
import { cn } from "../utils";
import { ClassValue } from "clsx";
import { FueSelectService } from "./select.service";
import { Subject, takeUntil, tap } from "rxjs";

@Component({
  selector: "fue-select-value",
  template: `<span>{{ value() ? value() : placeholder }}</span>`,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FueSelectValueComponent implements OnInit, OnDestroy {
  private _selectService = inject(FueSelectService);

  base = "";

  @Input() placeholder: string = "";

  @Input("class") classNames: ClassValue = "";

  @HostBinding("class")
  get allClassNames() {
    return cn(this.base, this.classNames);
  }

  value = signal("");

  unsubscribe = new Subject<boolean>();

  ngOnInit(): void {
    this._selectService.valueChanges
      .pipe(
        takeUntil(this.unsubscribe),
        tap((val) => this.value.set(val))
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next(true);
    this.unsubscribe.complete();
  }
}
