import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromJyskeBoligberegner from './jyske-boligberegner.interfaces';
import { JYSKE_BOLIGBEREGNER_FEATURE_NAME } from '../jyske-boligberegner-ui.constants';
import { Beregningsgrundlag } from '@jyske-boligberegner-ui/+state/jyske-boligberegner.interfaces';
import { Beregningsresultat } from '@beregningsresultat-ui/finansieringsforslag/finansieringsforslag.interfaces';
import { KontaktFormParameter } from '@shared/services/kontaktformular.service';

export const selectJyskeBoligberegnerState = createFeatureSelector<
  fromJyskeBoligberegner.JyskeBoligberegnerState
>(JYSKE_BOLIGBEREGNER_FEATURE_NAME);

export const selectJyskeBoligberegnerRequest = createSelector(
  selectJyskeBoligberegnerState,
  (
    state: fromJyskeBoligberegner.JyskeBoligberegnerState
  ): Beregningsgrundlag => state.formInput
);

export const selectJyskeBoligberegner = createSelector(
  selectJyskeBoligberegnerState,
  (
    state: fromJyskeBoligberegner.JyskeBoligberegnerState
  ): Beregningsresultat[] => state.resultat
);

export const selectJyskeBoligberegnerIsLoading = createSelector(
  selectJyskeBoligberegnerState,
  (state: fromJyskeBoligberegner.JyskeBoligberegnerState): boolean =>
    state.behaviours.loading
);

export const selectJyskeBoligberegnerHarBanklaan = createSelector(
  selectJyskeBoligberegnerState,
  (state: fromJyskeBoligberegner.JyskeBoligberegnerState): boolean =>
    state.resultat !== null && state.resultat[0].laanListe.length > 1
);

export const selectJyskeBoligberegnerLoadDisableToggles = createSelector(
  selectJyskeBoligberegnerState,
  (state: fromJyskeBoligberegner.JyskeBoligberegnerState): boolean =>
    state.behaviours.disableToggles
);

export const selectJyskeBoligberegnerLoadVisDetaljer = createSelector(
  selectJyskeBoligberegnerState,
  (state: fromJyskeBoligberegner.JyskeBoligberegnerState): boolean =>
    state.behaviours.visDetaljer
);

export const selectJyskeBoligberegnerLoadVisAfdragsfrihed = createSelector(
  selectJyskeBoligberegnerState,
  (state: fromJyskeBoligberegner.JyskeBoligberegnerState): boolean =>
    state.behaviours.visAfdragsfrihed
);
export const selectKontaktMigParameterGenerel = createSelector(
  selectJyskeBoligberegnerState,
  (state: fromJyskeBoligberegner.JyskeBoligberegnerState): KontaktFormParameter =>
    state.kontaktMigParameterGenerel
);
