import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Meta, moduleMetadata, StoryObj } from "@storybook/angular";
import { ModalService } from "./modal.service";
import { ModalComponent } from "./modal.component";
import { FueButtonDirective } from "../button/button.directive";
import { ModalRef } from "./modal-ref";

@Component({
  selector: "modal-demo",
  standalone: true,
  imports: [FueButtonDirective],
  template: `
    <button fueBtn (click)="openModal(modalContent)">Open Modal</button>
    <ng-template #modalContent>
      <div>
        <h3 class="font-bold text-lg">Hello!</h3>
        <p class="py-4">Press ESC key or click the button below to close</p>
        <div class="modal-action">
          <!-- if there is a button in form, it will close the modal -->
          <button fueBtn (click)="closeModal()">Close</button>
        </div>
      </div>
    </ng-template>
  `,
})
export class ModalDemo implements OnInit {
  modalRef?: ModalRef;
  constructor(private modalService: ModalService) {}

  ngOnInit() {}

  openModal(modalTpl: any) {
    this.modalRef = this.modalService.show(modalTpl);
  }

  closeModal() {
    this.modalRef?.close();
  }
}

/**
 * Need to create simple modal for content but also dialog configuration and reasons for dismissal
 */
const meta: Meta<ModalDemo> = {
  title: "Modal",
  component: ModalDemo,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, ModalComponent],
      providers: [ModalService],
    }),
  ],
};

export default meta;
type Story = StoryObj<ModalDemo>;

export const Default: Story = {
  render: () => ({
    props: { label: "Username" },
  }),
};
