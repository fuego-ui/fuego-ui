import { CommonModule } from "@angular/common";
import {
  Component,
  Input,
  ChangeDetectionStrategy,
  HostBinding,
  ContentChild,
  AfterContentInit,
} from "@angular/core";
import { cn } from "../utils";
import { ClassValue } from "clsx";
import { InputDirective } from "./input.directive";
import { FueLabelDirective } from "../label";

let id = 0;
@Component({
  selector: "fue-field",
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-content select="fue-label"></ng-content>
    <ng-content></ng-content>
    <ng-content select="fue-description"></ng-content>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldComponent implements AfterContentInit {
  baseClass = "flex flex-col gap-1.5";
  baseId = id++;
  inputId: string = `fue-field-input-${this.baseId}`;
  fieldId = `fue-field-${this.baseId}`;

  @Input("class") classNames: ClassValue = "";

  @HostBinding("class")
  get allclassNames() {
    return cn(this.baseClass, this.classNames);
  }

  @ContentChild(FueLabelDirective)
  label!: FueLabelDirective;

  @ContentChild(InputDirective)
  input!: InputDirective;

  ngAfterContentInit(): void {
    if (this.input) {
      this.input.id = this.inputId;
    }

    if (this.label) {
      this.label.forInput.set(this.inputId);
    }
  }
}
