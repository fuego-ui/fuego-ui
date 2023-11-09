import { Component, ElementRef, Input, ViewChild, inject } from "@angular/core";
import { ClassValue } from "clsx";
import { provideIcons } from "@ng-icons/core";
import { radixChevronDown } from "@ng-icons/radix-icons";
import { cn } from "../utils";
import { FueIconComponent } from "../icon";
import { FueSelectService } from "./select.service";
import { tap } from "rxjs";
import { AsyncPipe, NgIf } from "@angular/common";

@Component({
  selector: "fue-select-trigger",
  standalone: true,
  imports: [FueIconComponent, NgIf, AsyncPipe],
  providers: [provideIcons({ radixChevronDown })],
  template: `<button
    [class]="classes"
    #button
    *ngIf="{ selectValue: selectValue$ | async }"
  >
    <ng-content /><fue-icon
      class="flex h-4 w-4"
      size="100%"
      name="radixChevronDown"
    />
  </button>`,
})
export class FueSelectTriggerComponent {
  @ViewChild("button") buttonEl!: ElementRef;

  private _selectService = inject(FueSelectService);

  selectValue$ = this._selectService.valueChanges.pipe(
    tap(() => this.buttonEl.nativeElement.focus())
  );

  base =
    "flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-[180px]";

  @Input("class") classNames: ClassValue = "";

  get classes() {
    return cn(this.base, this.classNames);
  }
}
