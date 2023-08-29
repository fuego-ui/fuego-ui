import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export type ImageLoadingStatus = "idle" | "loading" | "loaded" | "error";

@Injectable()
export class ImageService implements OnDestroy {
  private imageLoadStatus = new BehaviorSubject<ImageLoadingStatus>("idle");
  imageLoadStatus$ = this.imageLoadStatus.asObservable();

  updateImageLoadStatus(status: ImageLoadingStatus): void {
    this.imageLoadStatus.next(status);
  }

  ngOnDestroy(): void {
    this.imageLoadStatus.complete();
  }
}
