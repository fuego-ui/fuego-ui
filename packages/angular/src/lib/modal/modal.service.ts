import {
  Injectable,
  ComponentRef,
  ViewContainerRef,
  TemplateRef,
  EnvironmentInjector,
} from '@angular/core';
import { ModalComponent } from './modal.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modalComponentRef!: ComponentRef<ModalComponent>;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private injector: EnvironmentInjector
  ) {}

  openModal(contentTemplate: TemplateRef<any>): ModalComponent {
    // Create and attach the modal component dynamically
    const contentRef = contentTemplate.createEmbeddedView(null);
    this.modalComponentRef = this.viewContainerRef.createComponent(
      ModalComponent,
      {
        environmentInjector: this.injector,
        projectableNodes: [contentRef.rootNodes],
      }
    );

    this.modalComponentRef.instance.openModal();
    this.modalComponentRef.instance.closed.subscribe(() => {
      this.closeModal();
    });
    return this.modalComponentRef.instance;
  }

  closeModal(): void {
    this.modalComponentRef.destroy();
  }
}
