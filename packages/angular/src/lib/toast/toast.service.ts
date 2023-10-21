import {
  Injectable,
  ComponentRef,
  ApplicationRef,
  inject,
  ViewContainerRef,
  OnDestroy,
} from "@angular/core";
import { FueToastComponent } from "./toast.component";
import { take } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ToastService implements OnDestroy {
  private toasts: ComponentRef<FueToastComponent>[] = [];
  private toastContainer!: HTMLElement;
  private toastList!: HTMLUListElement;

  toastContainerBaseClasses =
    "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px] gap-2";

  modalStack: any[] = [];
  closedModalStack: any[] = [];

  vcr = inject(ViewContainerRef);
  appRef = inject(ApplicationRef);

  constructor() {
    this.initializeToastContainer();
  }

  private initializeToastContainer() {
    this.toastContainer = document.createElement("div");
    this.toastContainer.setAttribute("role", "list");
    this.toastContainer.setAttribute("aria-label", "Notifications");

    // Create an ordered list for the toasts
    this.toastList = document.createElement("ol");
    this.toastList.classList.add(...this.toastContainerBaseClasses.split(" "));
    this.toastContainer.appendChild(this.toastList);

    document.body.appendChild(this.toastContainer);
  }

  showToast(
    message: string,
    options?: { duration?: number; dismissible?: boolean }
  ) {
    const toastRef = this.vcr.createComponent(FueToastComponent);

    // Access the instance and set the message
    const instance = toastRef.instance;
    instance.message = message;
    if (options && options.dismissible) {
      instance.dismissible = true;
      instance.dismiss.pipe(take(1)).subscribe(() => {
        toastRef.destroy();
      });
    }

    const listItem = document.createElement("li");
    listItem.appendChild(toastRef.location.nativeElement);

    // Append to our toast container
    this.toastList.appendChild(listItem);

    // Store for reference (e.g., for later removal)
    this.toasts.push(toastRef);

    // Optional: auto-remove after some duration
    if (options && options.duration) {
      console.log("We adding time");
      setTimeout(() => {
        this.removeToast(toastRef);
      }, options.duration);
    }
  }

  private removeToast(toastRef: ComponentRef<FueToastComponent>) {
    this.appRef.detachView(toastRef.hostView);
    toastRef.destroy();
  }

  ngOnDestroy(): void {
    // Remove any remaining toasts
    this.toasts.forEach((toastRef) => {
      this.appRef.detachView(toastRef.hostView);
      toastRef.destroy();
    });

    // Remove the toastContainer from the DOM
    if (this.toastContainer) {
      document.body.removeChild(this.toastContainer);
    }
  }
}
