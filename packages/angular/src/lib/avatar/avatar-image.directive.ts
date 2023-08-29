import {
  Directive,
  ElementRef,
  HostBinding,
  Input,
  OnDestroy,
  inject,
} from "@angular/core";
import { cn } from "../utils";
import { ClassValue } from "clsx";
import { ImageService } from "../image/image.service";
import { Subject } from "rxjs";

@Directive({
  selector: "[fueAvatarImage]",
  standalone: true,
})
export class FueAvatarImageDirective implements OnDestroy {
  base = "aspect-square h-full w-full";

  hide: boolean | null = null;
  imageService = inject(ImageService);

  @Input("class") classNames: ClassValue = "";

  @HostBinding("class")
  get allClassNames() {
    return cn(this.base, this.classNames);
  }

  @HostBinding("attr.hidden")
  get shouldHide() {
    return this.hide;
  }

  private observer!: IntersectionObserver;
  private unsubscribe = new Subject<boolean>();

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit() {
    this.imageService.updateImageLoadStatus("idle");
    this.setupObserver();
  }

  // TODO: Extract the image observer for general purpose
  private setupObserver() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.isIntersecting && this.loadImageAndTrackStatus();
      });
    });

    this.observer.observe(this.elementRef.nativeElement);
  }

  private loadImageAndTrackStatus() {
    const image = new Image();
    image.src = this.elementRef.nativeElement.src;

    image.onload = () => {
      console.log("loadded");
      this.imageService.updateImageLoadStatus("loaded");
    };

    image.onerror = () => {
      this.hide = true;
      console.log("error");
      this.imageService.updateImageLoadStatus("error");
    };
    console.log("loading");
    this.imageService.updateImageLoadStatus("loading");
  }

  ngOnDestroy(): void {
    this.unsubscribe.next(true);
    this.unsubscribe.complete();
  }
}
