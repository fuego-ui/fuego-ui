import {
  Injectable,
  ApplicationRef,
  TemplateRef,
  inject,
  ViewContainerRef,
} from "@angular/core";
import { ModalComponent } from "./modal.component";
import { ModalRef } from "./modal-ref";
import { take } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ModalService {
  modalStack: any[] = [];
  closedModalStack: any[] = [];

  vcr = inject(ViewContainerRef);
  applicationRef = inject(ApplicationRef);

  show(template: TemplateRef<any>): ModalRef {
    // Automatically close all existing modals
    this.closeAllModals();

    const modalInstance = this.createAndShowModal(template);
    return new ModalRef(modalInstance, this.closeModal.bind(this));
  }

  createAndShowModal(template: TemplateRef<any>): any {
    // Create a component reference from the component
    const componentRef = this.vcr.createComponent(ModalComponent);

    // Attach the content
    componentRef.instance.content = template;

    // Listen for close event
    componentRef.instance.close
      .pipe(take(1))
      .subscribe((modalId) => this.closeModal(modalId));

    const modalRef = new ModalRef(
      componentRef.instance,
      this.closeModal.bind(this)
    );

    // Add to stack
    this.modalStack.push({ componentRef, modalRef });

    return modalRef;
  }

  closeAllModals(): void {
    while (this.modalStack.length) {
      const modal = this.modalStack.pop();
      this.closedModalStack.push(modal);
      this.applicationRef.detachView(modal.componentRef.hostView);
      modal.componentRef.destroy();
    }
  }

  closeModal(modalId: string): void {
    const index = this.modalStack.findIndex(
      (m) => m.componentRef.instance.modalId === modalId
    );

    if (index !== -1) {
      const modal = this.modalStack.splice(index, 1)[0];
      this.closedModalStack.push(modal);
      modal.componentRef.instance.closeModal();
      modal.componentRef.instance.modalEl.nativeElement.addEventListener(
        "animationend",
        (e: AnimationEvent) => {
          if (e.animationName === "exit") {
            modal.componentRef.instance.modalEl.nativeElement.close();
            modal.componentRef.destroy();
          }
        },
        { once: true }
      );
    }

    // Relaunch the last modal in the closed stack if it exists
    // if (this.closedModalStack.length) {
    //   const lastClosedModal = this.closedModalStack.pop();
    //   this.createAndShowModal(lastClosedModal.componentRef.instance.content);
    // }
  }
}
