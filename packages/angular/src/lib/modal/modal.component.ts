import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FocusTrapDirective } from '../focus-trap/focus-trap.directive';
import { Subject } from 'rxjs';

let id = 0;
@Component({
  selector: 'fue-ui-modal',
  template: `
    <dialog #modal id="modalId" class="modal" role="document">
      <div class="modal-box" focusTrap>
        <ng-content></ng-content>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button (click)="closeModal('Clicked Outside')">close</button>
      </form>
    </dialog>
  `,
  standalone: true,
  imports: [FocusTrapDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent implements OnInit, OnChanges {
  @Input() isOpen: boolean = false;
  @Output() closed = new EventEmitter<void>();

  @ViewChild('modal', { static: true }) modalEl!: ElementRef;

  onHide = new Subject<string>();

  modalId = id++;

  ngOnInit(): void {}

  openModal() {
    this.modalEl.nativeElement.showModal();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  closeModal() {
    this.closed.emit();
  }
}
