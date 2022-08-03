import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromJyskeFrihed from './jyske-frihed.interfaces';
import { Beregningsresultat } from '@beregningsresultat-ui/finansieringsforslag/finansieringsforslag.interfaces';
import { JYSKE_FRIHED_UI_FEATURE_NAME } from '../jyske-frihed-ui.constants';
import { KontaktFormParameter } from '@shared/services/kontaktformular.service';

export const selectJyskeFrihedState =
  createFeatureSelector<fromJyskeFrihed.JyskeFrihedState>(
    JYSKE_FRIHED_UI_FEATURE_NAME
  );

export const selectJyskeFrihed = createSelector(
  selectJyskeFrihedState,
  (state: fromJyskeFrihed.JyskeFrihedState): Beregningsresultat[] =>
    state.resultat
);

export const selectJyskeFrihedIsLoading = createSelector(
  selectJyskeFrihedState,
  (state: fromJyskeFrihed.JyskeFrihedState): boolean => state.behaviours.loading
);

export const selectJyskeFrihedMaxProvenuIsLoading = createSelector(
  selectJyskeFrihedState,
  (state: fromJyskeFrihed.JyskeFrihedState): boolean => state.behaviours.maxProvenuLoading
);

export const selectJyskeFrihedLoadDisableToggles = createSelector(
  selectJyskeFrihedState,
  (state: fromJyskeFrihed.JyskeFrihedState): boolean =>
    state.behaviours.disableToggles
);

export const selectJyskeFrihedLoadVisDetaljer = createSelector(
  selectJyskeFrihedState,
  (state: fromJyskeFrihed.JyskeFrihedState): boolean =>
    state.behaviours.visDetaljer
);

export const selectJyskeFrihedLoadMaxProvenu = createSelector(
  selectJyskeFrihedState,
  (state: fromJyskeFrihed.JyskeFrihedState): fromJyskeFrihed.MaxProvenuer =>
    state.maxProvenuer
);

export const selectJyskeFrihedLoadEjendomsvaerdi = createSelector(
  selectJyskeFrihedState,
  (state: fromJyskeFrihed.JyskeFrihedState): number => state.ejendomsvaerdi
);

export const selectKontaktMigParameterGenerel = createSelector(
  selectJyskeFrihedState,
  (state: fromJyskeFrihed.JyskeFrihedState): KontaktFormParameter =>
    state.kontaktMigParameterGenerel
);
