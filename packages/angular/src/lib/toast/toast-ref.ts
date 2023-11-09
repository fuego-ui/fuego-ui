export class ToastRef {
  constructor(private toastInstance: any, private closeFn: Function) {}

  close() {
    this.closeFn(this.toastInstance.toastInstance.toastId);
  }
}
