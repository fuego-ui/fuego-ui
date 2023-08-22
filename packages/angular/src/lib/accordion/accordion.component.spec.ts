import { ComponentFixture, TestBed } from "@angular/core/testing";

import { FueAccordionItemComponent } from "./accordion.component";

describe("FueAccordionItemComponent", () => {
  let component: FueAccordionItemComponent;
  let fixture: ComponentFixture<FueAccordionItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FueAccordionItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FueAccordionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
