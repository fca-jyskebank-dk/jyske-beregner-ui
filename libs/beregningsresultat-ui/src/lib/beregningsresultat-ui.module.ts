import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinansieringsforslagModule } from './finansieringsforslag/finansieringsforslag.module';

@NgModule({
  imports: [CommonModule, FinansieringsforslagModule],
  exports: [FinansieringsforslagModule],
})
export class BeregningsresultatUiModule {}
