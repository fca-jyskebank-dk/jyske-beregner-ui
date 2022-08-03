import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { JYSKE_FRIHED_BEREGNER_FEATURE_NAME } from '../jyske-frihed-beregner.constants';
import * as fromJyskeFrihedBeregner from './jyske-frihed-beregner.reducer';
import { EffectsModule } from '@ngrx/effects';
import { JyskeFrihedBeregnerEffects } from './jyske-frihed-beregner.effects';
import { JyskeFrihedBeregnerFacade } from './jyske-frihed-beregner.facade';
import { JyskeFrihedBeregnerMapService } from './jyske-frihed-beregner.map.service';
import { PipesModule } from '@shared/pipes/pipes.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(
      JYSKE_FRIHED_BEREGNER_FEATURE_NAME,
      fromJyskeFrihedBeregner.reducer
    ),
    EffectsModule.forFeature([JyskeFrihedBeregnerEffects]),
    PipesModule,
  ],
  providers: [JyskeFrihedBeregnerFacade, JyskeFrihedBeregnerMapService],
})
export class JyskeFrihedBeregnerStateModule {}
