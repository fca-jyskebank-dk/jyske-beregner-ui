import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LaanDetaljerComponent } from './laan-detaljer/laan-detaljer.component';
import { KirbyModule } from '@kirbydesign/designsystem';
import { FinansieringsforslagComponent } from './finansieringsforslag/finansieringsforslag.component';
import { FinansieringsforslagHeaderComponent } from './finansieringsforslag-header/finansieringsforslag-header.component';
import { FinansieringsforslagRatingComponent } from './finansieringsforslag-rating/finansieringsforslag-rating.component';
import { ComponentsModule } from '@shared/components/components.module';
import { FinansieringsforslagSlidesComponent } from './finansieringsforslag-slides/finansieringsforslag-slides.component';

@NgModule({
  declarations: [
    LaanDetaljerComponent,
    FinansieringsforslagComponent,
    FinansieringsforslagHeaderComponent,
    FinansieringsforslagRatingComponent,
    FinansieringsforslagSlidesComponent,
  ],
  imports: [
    CommonModule,
    KirbyModule,
    ComponentsModule
  ],
  exports: [
    LaanDetaljerComponent,
    FinansieringsforslagComponent,
    FinansieringsforslagHeaderComponent,
    FinansieringsforslagRatingComponent,
    FinansieringsforslagSlidesComponent,
  ],
})
export class FinansieringsforslagModule {}
