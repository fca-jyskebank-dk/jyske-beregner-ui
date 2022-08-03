import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromJyskeFrihed from './jyske-frihed.reducer';
import { EffectsModule } from '@ngrx/effects';
import { JyskeFrihedEffects } from './jyske-frihed.effects';
import { JyskeFrihedFacade } from './jyske-frihed.facade';
import { PipesModule } from '@shared/pipes/pipes.module';
import { JYSKE_FRIHED_UI_FEATURE_NAME } from '../jyske-frihed-ui.constants';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(
      JYSKE_FRIHED_UI_FEATURE_NAME,
      fromJyskeFrihed.reducer
    ),
    EffectsModule.forFeature([JyskeFrihedEffects]),
    PipesModule,
  ],
  providers: [JyskeFrihedFacade],
})
export class JyskeFrihedStateModule {}
