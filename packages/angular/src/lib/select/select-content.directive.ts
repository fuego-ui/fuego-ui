import {
  Directive,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  inject,
} from "@angular/core";
import { CdkListbox } from "@angular/cdk/listbox";
import { ClassValue } from "clsx";
import { cn } from "../utils";
import { CdkMenu } from "@angular/cdk/menu";
import { Subject, map, takeUntil, tap } from "rxjs";
import { FueSelectService } from "./select.service";

@Directive({
  selector: "[fueSelectContent]",
  standalone: true,
  hostDirectives: [CdkListbox, CdkMenu],
})
export class FueSelectContentDirective implements OnInit, OnDestroy {
  base = `relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2`;
  private _cdkListbox = inject(CdkListbox, { host: true });
  private _select = inject(FueSelectService);
  @Input("class") classNames: ClassValue = "";

  @HostBinding("class")
  get allClassNames() {
    return cn(this.base, this.classNames);
  }

  unsubscribe = new Subject<boolean>();

  ngOnInit(): void {
    this._cdkListbox.valueChange
      .pipe(
        takeUntil(this.unsubscribe),
        map((val) => val.value[0]),
        tap((val) => this._select.valueChange(val))
      )
      .subscribe();
  }

  getValue() {
    return this._cdkListbox.value;
  }

  ngOnDestroy(): void {
    this.unsubscribe.next(true);
    this.unsubscribe.complete();
  }
}
