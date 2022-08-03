import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromBeregnLaanGenerel from './beregn-laan-generel.interfaces';

import { Beregningsresultat } from '@beregningsresultat-ui/finansieringsforslag/finansieringsforslag.interfaces';
import { KontaktFormParameter } from '@shared/services/kontaktformular.service';
import { BEREGN_LAAN_GENEREL_FEATURE_NAME } from '../presentational/beregn-laan-generel-ui.constants';

export const selectBeregnLaanGenerelState =
  createFeatureSelector<fromBeregnLaanGenerel.BeregnLaanGenerelState>(
    BEREGN_LAAN_GENEREL_FEATURE_NAME
  );

export const selectBeregnLaanGenerel = createSelector(
  selectBeregnLaanGenerelState,
  (state: fromBeregnLaanGenerel.BeregnLaanGenerelState): Beregningsresultat[] =>
    state.resultat
);

export const selectBeregnLaanGenerelIsLoading = createSelector(
  selectBeregnLaanGenerelState,
  (state: fromBeregnLaanGenerel.BeregnLaanGenerelState): boolean =>
    state.behaviours.loading
);

export const selectBeregnLaanGenerelLoadDisableToggles = createSelector(
  selectBeregnLaanGenerelState,
  (state: fromBeregnLaanGenerel.BeregnLaanGenerelState): boolean =>
    state.behaviours.disableToggles
);

export const selectBeregnLaanGenerelLoadVisAfdragsfrihed = createSelector(
  selectBeregnLaanGenerelState,
  (state: fromBeregnLaanGenerel.BeregnLaanGenerelState): boolean =>
    state.behaviours.visAfdragsfrihed
);

export const selectKontaktMigParameterGenerel = createSelector(
  selectBeregnLaanGenerelState,
  (state: fromBeregnLaanGenerel.BeregnLaanGenerelState): KontaktFormParameter =>
    state.kontaktMigParameterGenerel
);
