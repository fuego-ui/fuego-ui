import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
  signal,
} from "@angular/core";
import { Subject } from "rxjs";
import { cn } from "../utils";
import { NgTemplateOutlet } from "@angular/common";
import { A11yModule } from "@angular/cdk/a11y";

let id = 0;
@Component({
  selector: "fue-ui-modal",
  template: `
    <dialog
      #modal
      id="modalId"
      [class]="dialogReset"
      role="document"
      [attr.data-state]="openState"
      [attr.open]="_isOpen()"
      (keydown.escape)="closeModal()"
    >
      <div
        #modalContent
        [class]="classes"
        cdkTrapFocus
        [attr.data-state]="openState"
      >
        <ng-container *ngTemplateOutlet="content"></ng-container>
      </div>
    </dialog>
    <div
      [class]="backdrop"
      [attr.aria-hidden]="true"
      (click)="closeModal()"
    ></div>
  `,
  standalone: true,
  imports: [A11yModule, NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent implements OnInit {
  /**
   * Maybe need to provide a version that does not use dialog from browser
   * to support non-browser (Ionic)
   */

  dialogReset =
    "pointer-auto visible fixed z-[51] bg-transparent p-0 inset-0 m-0 grid max-w-none max-h-none items-center text-inherit";

  base =
    "fixed left-[50%] top-[50%] grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] bg-transparent gap-4 border p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg md:w-full sm:max-w-[425px] text-inherit";

  backdrop =
    "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0";

  @Input() className!: string;
  @Input() isOpen: boolean = false;
  @Input() content!: TemplateRef<any>;
  @Output() close = new EventEmitter<string>();

  @ViewChild("modal", { static: true }) modalEl!: ElementRef;
  @ViewChild("modalContent", { static: true }) modalContent!: ElementRef;

  @HostListener("click", ["$event"])
  onDialogClick(event: MouseEvent) {
    /* TODO: Fix this 'nodeName' typing issue  */
    /* @ts-ignore */
    if (event && event.target && event.target.nodeName === "DIALOG") {
      this.closeModal();
    }
  }

  onHide = new Subject<string>();

  _isOpen = signal(false);

  modalId = `fue-modal-${id++}`;

  get classes() {
    return cn(this.base, this.className);
  }

  get openState() {
    return this._isOpen() ? "open" : "closed";
  }

  ngOnInit(): void {
    this.modalEl.nativeElement.showModal();
    this._isOpen.set(true);
  }

  closeModal() {
    this._isOpen.set(false);
    this.close.next(this.modalId);
  }
}
