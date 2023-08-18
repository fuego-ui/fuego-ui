import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardDirective } from './card.directive';
import { CardDescriptionDirective } from './card-description.directive';
import { CardFooterDirective } from './card-footer.directive';
import { CardTitleDirective } from './card-title.directive';
import { CardHeaderComponent } from './card-header.component';
import { CardContentComponent } from './card-content.component';

@NgModule({
  declarations: [
    CardDirective,
    CardDescriptionDirective,
    CardFooterDirective,
    CardTitleDirective,
    CardHeaderComponent,
    CardContentComponent,
  ],
  imports: [CommonModule],
  exports: [
    CardDirective,
    CardDescriptionDirective,
    CardFooterDirective,
    CardTitleDirective,
    CardHeaderComponent,
    CardContentComponent,
  ],
})
export class CardModule {}
