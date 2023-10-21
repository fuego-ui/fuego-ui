import { CommonModule } from "@angular/common";
import { Meta, moduleMetadata, StoryObj } from "@storybook/angular";
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FueToastComponent } from "./toast.component";
import { FueLabelDirective } from "../label/label.directive";
import { Component, OnInit } from "@angular/core";
import { FueButtonDirective } from "../button/button.directive";
import { ToastService } from "./toast.service";

@Component({
  selector: "toast-demo",
  standalone: true,
  imports: [FueButtonDirective],
  template: ` <button fueBtn (click)="openToast()">Open Toast</button> `,
})
export class ToastDemo {
  constructor(private toastService: ToastService) {}

  openToast() {
    this.toastService.showToast("Hello World!", {
      // duration: 5000,
      dismissible: true,
    });
  }
}

const meta: Meta<FueToastComponent> = {
  title: "Toast",
  decorators: [
    moduleMetadata({
      imports: [CommonModule, ToastDemo, FueLabelDirective, FueToastComponent],
      providers: [ToastService],
    }),
  ],
};

export default meta;
type Story = StoryObj<FueToastComponent>;

export const Default: Story = {
  render: () => ({
    props: { box: new FormControl(false) },
    template: `<toast-demo></toast-demo>`,
  }),
};
