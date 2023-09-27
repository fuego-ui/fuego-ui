export class ModalRef {
  constructor(private modalInstance: any, private closeFn: Function) {}

  close() {
    this.closeFn(this.modalInstance.modalInstance.modalId);
  }
}
