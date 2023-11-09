import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  inject,
  signal,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { ClassValue } from "clsx";
import { cn } from "../utils";

let nextId = 0;

@Component({
  selector: "fue-toast",
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div [class]="classes">
    {{ message }}
    <button *ngIf="dismissible" (click)="close()">X</button>
  </div>`,
})
export class FueToastComponent {
  base =
    "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full border bg-background text-foreground";

  @Input("class") classNames: ClassValue = "";

  get classes() {
    return cn(this.base, this.classNames);
  }

  @Input() message!: string;
  @Input() dismissible: boolean = true;
  @Output() dismiss = new EventEmitter<void>();

  ngOnInit() {
    // if (this.duration) {
    //   setTimeout(() => {
    //     this.close();
    //   }, this.duration);
    // }
  }

  close() {
    // Emit event or call service to remove toast
    this.dismiss.next();
  }
}
