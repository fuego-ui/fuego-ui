import { CdkMenuTrigger } from "@angular/cdk/menu";
import {
  Directive,
  Input,
  TemplateRef,
  effect,
  inject,
  signal,
} from "@angular/core";

export type FueMenuAlign = "start" | "center" | "end" | undefined;

@Directive({
  selector: "[fueMenuTriggerFor]",
  standalone: true,
  hostDirectives: [
    {
      directive: CdkMenuTrigger,
      inputs: ["cdkMenuTriggerFor: fueMenuTriggerFor"],
    },
  ],
})
export class FueMenuTriggerDirective {
  private readonly _cdkTrigger = inject(CdkMenuTrigger, { host: true });
  private readonly _align = signal<FueMenuAlign>(undefined);
  @Input()
  set align(value: any) {
    this._align.set(value);
  }

  @Input()
  set fueMenuTriggerFor(value: TemplateRef<unknown> | null) {
    this._cdkTrigger.menuTemplateRef = value;
  }

  constructor() {
    effect(() => {
      const align = this._align();
      if (!align) return;
      this._cdkTrigger.menuPosition = [
        {
          originX: align,
          originY: "bottom",
          overlayX: align,
          overlayY: "top",
        },
        {
          originX: align,
          originY: "top",
          overlayX: align,
          overlayY: "bottom",
        },
      ];
    });
  }
}
