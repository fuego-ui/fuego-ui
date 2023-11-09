import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FueToastComponent } from "./Toast.component";

describe("ToastComponent", () => {
  let component: FueToastComponent;
  let fixture: ComponentFixture<FueToastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FueToastComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FueToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
