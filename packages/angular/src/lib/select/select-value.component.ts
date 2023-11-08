import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  inject,
} from "@angular/core";
import { cn } from "../utils";
import { ClassValue } from "clsx";
import { FueSelectService } from "./select.service";
import { AsyncPipe, NgIf } from "@angular/common";

@Component({
  selector: "fue-select-value",
  imports: [NgIf, AsyncPipe],
  template: `<span *ngIf="{ value: selectValue$ | async } as vm$">{{
    vm$.value ? vm$.value : placeholder
  }}</span>`,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FueSelectValueComponent {
  private _selectService = inject(FueSelectService);

  selectValue$ = this._selectService.valueChanges;

  base = "";

  @Input() placeholder: string = "";

  @Input("class") classNames: ClassValue = "";

  @HostBinding("class")
  get allClassNames() {
    return cn(this.base, this.classNames);
  }
}
