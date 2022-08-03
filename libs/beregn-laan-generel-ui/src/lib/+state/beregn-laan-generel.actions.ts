import { Beregningsresultat } from '@beregningsresultat-ui/finansieringsforslag/finansieringsforslag.interfaces';
import { createAction, props } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';

import { KontaktFormParameter } from '@shared/services/kontaktformular.service';

export const enum BeregnLaanGenerelActionTypes {
  BEREGN_LAAN_GENEREL_LOAD = '[Beregn laan generel - Load beregning]',
  BEREGN_LAAN_GENEREL_LOAD_SUCCESS = '[Beregn laan generel - Load beregning Succes]',
  BEREGN_LAAN_GENEREL_LOAD_FAILED = '[Beregn laan generel - Load beregning Failed]',
  BEREGN_LAAN_GENEREL_RESET = '[Beregn laan generel - Reset beregning]',
  BEREGN_LAAN_GENEREL_SET_DISABLE_TOGGLES = '[Beregn laan generel - Set Disable toggles]',
  BEREGN_LAAN_GENEREL_SET_VIS_AFDRAGSFRIHED = '[Beregn laan generel - Set Vis afdragsfrihed]',
  BEREGN_LAAN_GENEREL_SEND_LEAD = '[Beregn laan generel - Send kontaktformular-parameter]',
  BEREGN_LAAN_GENEREL_SEND_LEAD_GENEREL = '[Beregn laan generel - Send generel kontaktformular-parameter]',
  BEREGN_LAAN_GENEREL_OPEN_LAAN_I_FRIVAERDI = '[Beregn laan generel - Åbn beregn lån i friværdi]',
  BEREGN_LAAN_GENEREL_OPEN_BOLIGBEREGNER = '[Beregn laan generel - Åbn beregn lån til køb af bolig]',
}

export type BeregnLaanGenerelDispatchableActions =
  TypedAction<BeregnLaanGenerelActionTypes>;

export const loadBeregnLaanGenerel = createAction(
  BeregnLaanGenerelActionTypes.BEREGN_LAAN_GENEREL_LOAD,
  props<{ mockData: boolean; antalAfdragsfriAar: number }>()
);

export const loadBeregnLaanGenerelSuccess = createAction(
  BeregnLaanGenerelActionTypes.BEREGN_LAAN_GENEREL_LOAD_SUCCESS,
  props<{
    beregningsresultat: Beregningsresultat[];
    kontaktMigParametre: KontaktFormParameter;
  }>()
);

export const loadBeregnLaanGenerelFailed = createAction(
  BeregnLaanGenerelActionTypes.BEREGN_LAAN_GENEREL_LOAD_FAILED,
  props<{ error: Error }>()
);

export const resetBeregnLaanGenerel = createAction(
  BeregnLaanGenerelActionTypes.BEREGN_LAAN_GENEREL_RESET
);

export const setBeregnLaanGenerelDisableToggles = createAction(
  BeregnLaanGenerelActionTypes.BEREGN_LAAN_GENEREL_SET_DISABLE_TOGGLES,
  props<{ disable: boolean }>()
);

export const setBeregnLaanGenerelVisAfdragsfrihed = createAction(
  BeregnLaanGenerelActionTypes.BEREGN_LAAN_GENEREL_SET_VIS_AFDRAGSFRIHED,
  props<{ visAfdragsfrihed: boolean }>()
);

export const sendGenerelKontaktformular = createAction(
  BeregnLaanGenerelActionTypes.BEREGN_LAAN_GENEREL_SEND_LEAD_GENEREL,
  props<{
    kontaktMigParametre: KontaktFormParameter;
  }>()
);

export const openBeregnLaanIFrivaerdi = createAction(
  BeregnLaanGenerelActionTypes.BEREGN_LAAN_GENEREL_OPEN_LAAN_I_FRIVAERDI,
);

export const openBeregnLaanTilKoebAfBolig = createAction(
  BeregnLaanGenerelActionTypes.BEREGN_LAAN_GENEREL_OPEN_BOLIGBEREGNER,
);
