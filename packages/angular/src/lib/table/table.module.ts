import { NgModule } from "@angular/core";
import { FueTableComponent } from "./table.component";
import { FueTableHeadDirective } from "./table-head.directive";
import { FueTableHeaderDirective } from "./table-header.directive";
import { FueTableRowDirective } from "./table-row.directive";
import { FueTableBodyDirective } from "./table-body.directive";
import { FueTableCellDirective } from "./table-cell.directive";
import { FueTableCaptionDirective } from "./table-caption.directive";

@NgModule({
  imports: [
    FueTableComponent,
    FueTableHeadDirective,
    FueTableHeaderDirective,
    FueTableBodyDirective,
    FueTableRowDirective,
    FueTableCellDirective,
    FueTableCaptionDirective,
  ],
  exports: [
    FueTableComponent,
    FueTableHeadDirective,
    FueTableHeaderDirective,
    FueTableBodyDirective,
    FueTableRowDirective,
    FueTableCellDirective,
    FueTableCaptionDirective,
  ],
})
export class FueTableModule {}
