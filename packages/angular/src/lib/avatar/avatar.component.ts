import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
  inject,
  signal,
} from "@angular/core";
import { cn } from "../utils";
import { ClassValue } from "clsx";
import { ImageService } from "../image/image.service";
import { AsyncPipe, NgIf } from "@angular/common";

@Component({
  selector: "fue-avatar",
  standalone: true,
  template: `<div [class]="classes" *ngIf="imageStatus$ | async as imageStatus">
    <!-- {{ imageStatus | json }} -->
    <ng-container *ngIf="imageStatus !== 'error'">
      <ng-content select="[fueAvatarImage]" />
    </ng-container>

    <ng-container *ngIf="imageStatus !== 'loaded' && delayFallback()">
      <ng-content select="[fueAvatarFallback]" />
    </ng-container>
  </div>`,
  imports: [AsyncPipe, NgIf],
  providers: [ImageService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FueAvatarComponent implements OnInit, OnDestroy {
  base = "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full";

  @Input("class") classNames: ClassValue = "";
  // TODO: Radix uses undefined but I find using at least a small value prevents some flashing
  @Input() fallbackDelay: number = 100;

  delayFallback = signal(false);

  imageService = inject(ImageService);
  imageStatus$ = this.imageService.imageLoadStatus$;

  private _timeoutId!: any;

  ngOnInit(): void {
    this._timeoutId = setTimeout(
      () => this.delayFallback.set(true),
      this.fallbackDelay
    );
  }

  get classes() {
    return cn(this.base, this.classNames);
  }

  ngOnDestroy(): void {
    clearTimeout(this._timeoutId);
  }
}
