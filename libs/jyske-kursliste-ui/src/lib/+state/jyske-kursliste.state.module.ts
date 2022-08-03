import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { JYSKE_KURSLISTE_FEATURE_NAME } from '../jyske-kursliste-ui.constants';
import * as fromJyskeKursliste from './jyske-kursliste.reducer';
import { EffectsModule } from '@ngrx/effects';
import { JyskeKurslisteEffects } from './jyske-kursliste.effects';
import { JyskeKurslisteFacade } from './jyske-kursliste.facade';
import { PipesModule } from '@shared/pipes/pipes.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(
      JYSKE_KURSLISTE_FEATURE_NAME,
      fromJyskeKursliste.reducer
    ),
    EffectsModule.forFeature([JyskeKurslisteEffects]),
    PipesModule,
  ],
  providers: [JyskeKurslisteFacade],
})
export class JyskeKurslisteStateModule {}
