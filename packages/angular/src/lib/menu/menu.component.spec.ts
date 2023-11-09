import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FueSwitchComponent } from "./menu.component";

describe("SwitchComponent", () => {
  let component: FueSwitchComponent;
  let fixture: ComponentFixture<FueSwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FueSwitchComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FueSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
