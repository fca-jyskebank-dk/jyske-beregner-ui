import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromBeregnLaanGenerel from './beregn-laan-generel.reducer';
import { EffectsModule } from '@ngrx/effects';
import { BeregnLaanGenerelEffects } from './beregn-laan-generel.effects';
import { BeregnLaanGenerelFacade } from './beregn-laan-generel.facade';
import { PipesModule } from '@shared/pipes/pipes.module';
import { BEREGN_LAAN_GENEREL_FEATURE_NAME } from '../presentational/beregn-laan-generel-ui.constants';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(
      BEREGN_LAAN_GENEREL_FEATURE_NAME,
      fromBeregnLaanGenerel.reducer
    ),
    EffectsModule.forFeature([BeregnLaanGenerelEffects]),
    PipesModule,
  ],
  providers: [BeregnLaanGenerelFacade],
})
export class BeregnLaanGenerelStateModule {}
