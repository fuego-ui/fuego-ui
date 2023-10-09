import { NgModule } from "@angular/core";
import { FueAccordionContentComponent } from "./accordion-content.component";
import { FueAccordionGroupDirective } from "./accordion-group.directive";
import { FueAccordionItemComponent } from "./accordion.component";

@NgModule({
  imports: [
    FueAccordionGroupDirective,
    FueAccordionItemComponent,
    FueAccordionContentComponent,
  ],
  exports: [
    FueAccordionGroupDirective,
    FueAccordionItemComponent,
    FueAccordionContentComponent,
  ],
})
export class FueAccordionModule {}
