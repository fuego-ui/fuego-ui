import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FueCheckboxComponent } from "./checkbox.component";

describe("CheckboxComponent", () => {
  let component: FueCheckboxComponent;
  let fixture: ComponentFixture<FueCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FueCheckboxComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FueCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
