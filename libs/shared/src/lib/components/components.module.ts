import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KirbyModule } from '@kirbydesign/designsystem';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from '@shared/pipes/pipes.module';
import { TransparentItemListComponent } from './transparent-item-list/transparent-item-list.component';
import { InputSliderComponent } from './input-slider/input-slider.component';
import { CurrencyMaskInputMode, NgxCurrencyModule } from 'ngx-currency';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { DoughnoutChartComponent } from './doughnot-chart/doughnut-chart.component';

export const customCurrencyMaskConfig = {
  align: 'left',
  allowNegative: true,
  allowZero: true,
  decimal: ',',
  precision: 0,
  prefix: '',
  suffix: ' kr.',
  thousands: '.',
  nullable: true,
  min: null,
  max: null,
  inputMode: CurrencyMaskInputMode.FINANCIAL,
};

@NgModule({
  declarations: [
    TransparentItemListComponent,
    InputSliderComponent,
    StarRatingComponent,
    DoughnoutChartComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    KirbyModule,
    IonicModule,
    PipesModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
  ],
  exports: [
    TransparentItemListComponent,
    InputSliderComponent,
    StarRatingComponent,
    DoughnoutChartComponent,
  ],
})
export class ComponentsModule {}
