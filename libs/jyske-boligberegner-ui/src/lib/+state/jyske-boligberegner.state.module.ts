import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromJyskeBoligberegner from './jyske-boligberegner.reducer';
import { EffectsModule } from '@ngrx/effects';
import { JyskeBoligberegnerEffects } from './jyske-boligberegner.effects';
import { JyskeBoligberegnerFacade } from './jyske-boligberegner.facade';
import { PipesModule } from '@shared/pipes/pipes.module';
import { JYSKE_BOLIGBEREGNER_FEATURE_NAME } from '../jyske-boligberegner-ui.constants';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(
      JYSKE_BOLIGBEREGNER_FEATURE_NAME,
      fromJyskeBoligberegner.reducer
    ),
    EffectsModule.forFeature([JyskeBoligberegnerEffects]),
    PipesModule,
  ],
  providers: [JyskeBoligberegnerFacade],
})
export class JyskeBoligberegnerStateModule {}
