import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromBeregnLaanIFrivaerdi from './laan-i-frivaerdi.interfaces';

import { Beregningsgrundlag } from '@beregn-laan-i-frivaerdi-ui/+state/laan-i-frivaerdi.interfaces';

import { Beregningsresultat } from '@beregningsresultat-ui/finansieringsforslag/finansieringsforslag.interfaces';
import { LAAN_I_FRIVAERDI_FEATURE_NAME } from '@beregn-laan-i-frivaerdi-ui/beregn-laan-i-frivaerdi-ui.constants';
import { KontaktFormParameter } from '@shared/services/kontaktformular.service';

export const selectBeregnLaanIFrivaerdiState = createFeatureSelector<
  fromBeregnLaanIFrivaerdi.LaanIFrivaerdiState
>(LAAN_I_FRIVAERDI_FEATURE_NAME);

export const selectBeregnLaanIFrivaerdiRequest = createSelector(
  selectBeregnLaanIFrivaerdiState,
  (
    state: fromBeregnLaanIFrivaerdi.LaanIFrivaerdiState
  ): Beregningsgrundlag => state.formInput
);

export const selectBeregnLaanIFrivaerdi = createSelector(
  selectBeregnLaanIFrivaerdiState,
  (
    state: fromBeregnLaanIFrivaerdi.LaanIFrivaerdiState
  ): Beregningsresultat[] => state.resultat
);

export const selectBeregnLaanIFrivaerdiIsLoading = createSelector(
  selectBeregnLaanIFrivaerdiState,
  (state: fromBeregnLaanIFrivaerdi.LaanIFrivaerdiState): boolean =>
    state.behaviours.loading
);

export const selectBeregnLaanIFrivaerdiHarBanklaan = createSelector(
  selectBeregnLaanIFrivaerdiState,
  (state: fromBeregnLaanIFrivaerdi.LaanIFrivaerdiState): boolean =>
    state.resultat !== null && state.resultat[0].laanListe.length > 1
);

export const selectBeregnLaanIFrivaerdiLoadDisableToggles = createSelector(
  selectBeregnLaanIFrivaerdiState,
  (state: fromBeregnLaanIFrivaerdi.LaanIFrivaerdiState): boolean =>
    state.behaviours.disableToggles
);

export const selectBeregnLaanIFrivaerdiLoadVisDetaljer = createSelector(
  selectBeregnLaanIFrivaerdiState,
  (state: fromBeregnLaanIFrivaerdi.LaanIFrivaerdiState): boolean =>
    state.behaviours.visDetaljer
);

export const selectBeregnLaanIFrivaerdiLoadVisAfdragsfrihed = createSelector(
  selectBeregnLaanIFrivaerdiState,
  (state: fromBeregnLaanIFrivaerdi.LaanIFrivaerdiState): boolean =>
    state.behaviours.visAfdragsfrihed
);

export const selectBeregnLaanIFrivaerdiLoadMaxProvenu = createSelector(
  selectBeregnLaanIFrivaerdiState,
  (state: fromBeregnLaanIFrivaerdi.LaanIFrivaerdiState): number =>
    state.maxProvenu
);

export const selectBeregnLaanIFrivaerdiMaxProvenuIsLoading = createSelector(
  selectBeregnLaanIFrivaerdiState,
  (state: fromBeregnLaanIFrivaerdi.LaanIFrivaerdiState): boolean =>
    state.behaviours.maxProvenuIsLoading
);

export const selectBeregnLaanIFrivaerdiProcentfordeling = createSelector(
  selectBeregnLaanIFrivaerdiState,
  (state: fromBeregnLaanIFrivaerdi.LaanIFrivaerdiState): fromBeregnLaanIFrivaerdi.Procentfordeling =>
    state.procentfordeling
);

export const selectKontaktMigParameterGenerel = createSelector(
  selectBeregnLaanIFrivaerdiState,
  (state: fromBeregnLaanIFrivaerdi.LaanIFrivaerdiState): KontaktFormParameter =>
    state.kontaktMigParameterGenerel
);

