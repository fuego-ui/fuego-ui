import { ComponentFixture, TestBed } from "@angular/core/testing";

import { FueFieldComponent } from "./field.component";

describe("FueFieldComponent", () => {
  let component: FueFieldComponent;
  let fixture: ComponentFixture<FueFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FueFieldComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FueFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
