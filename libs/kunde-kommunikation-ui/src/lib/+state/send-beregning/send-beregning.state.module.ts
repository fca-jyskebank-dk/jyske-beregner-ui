import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromSendBeregning from './send-beregning.reducer';
import { EffectsModule } from '@ngrx/effects';
import { SendBeregningEffects } from './send-beregning.effects';
import { SendBeregningFacade } from './send-beregning.facade';
import { PipesModule } from '@shared/pipes/pipes.module';
import { SEND_BEREGNING_FEATURE_NAME } from '../../containers/send-beregning/send-beregning.constants';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(
      SEND_BEREGNING_FEATURE_NAME,
      fromSendBeregning.reducer
    ),
    EffectsModule.forFeature([SendBeregningEffects]),
    PipesModule,

  ],
  providers: [SendBeregningFacade],
})
export class SendBeregningStateModule {}
