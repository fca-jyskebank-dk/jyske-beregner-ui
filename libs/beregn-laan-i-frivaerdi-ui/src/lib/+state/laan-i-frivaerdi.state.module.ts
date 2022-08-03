import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromLaanIFrivaerdi from './laan-i-frivaerdi.reducer';
import { EffectsModule } from '@ngrx/effects';
import { LaanIFrivaerdiEffects } from './laan-i-frivaerdi.effects';
import { LaanIFrivaerdiFacade } from './laan-i-frivaerdi.facade';
import { PipesModule } from '@shared/pipes/pipes.module';
import { LAAN_I_FRIVAERDI_FEATURE_NAME } from '../beregn-laan-i-frivaerdi-ui.constants';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(
      LAAN_I_FRIVAERDI_FEATURE_NAME,
      fromLaanIFrivaerdi.reducer
    ),
    EffectsModule.forFeature([LaanIFrivaerdiEffects]),
    PipesModule,
  ],
  providers: [LaanIFrivaerdiFacade],
})
export class LaanIFrivaerdiStateModule {}
