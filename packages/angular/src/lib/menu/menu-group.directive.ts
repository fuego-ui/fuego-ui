import { Directive } from "@angular/core";
import { CdkMenuGroup } from "@angular/cdk/menu";

@Directive({
  selector: "[fueMenuGroup]",
  standalone: true,
  hostDirectives: [CdkMenuGroup],
})
export class FueMenuGroupDirective {}
