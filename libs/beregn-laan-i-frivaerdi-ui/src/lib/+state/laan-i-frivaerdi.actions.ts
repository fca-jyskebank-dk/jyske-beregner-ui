import { Beregningsresultat } from '@beregningsresultat-ui/finansieringsforslag/finansieringsforslag.interfaces';
import { Beregningsgrundlag, Procentfordeling } from '@beregn-laan-i-frivaerdi-ui/+state/laan-i-frivaerdi.interfaces';
import { createAction, props } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';
import { LaanIFrivaerdiFormData } from '@beregn-laan-i-frivaerdi-ui/presentational/laan-i-frivaerdi-input/laan-i-frivaerdi-input.interfaces';
import { KontaktFormParameter } from '@shared/services/kontaktformular.service';

export const enum LaanIFrivaerdiActionTypes {
  LAAN_I_FRIVAERDI_LOAD = '[Laan i friværdi - Load beregning]',
  LAAN_I_FRIVAERDI_LOAD_SUCCESS = '[Laan i friværdi - Load beregning Succes]',
  LAAN_I_FRIVAERDI_LOAD_FAILED = '[Laan i friværdi - Load beregning Failed]',
  LAAN_I_FRIVAERDI_RESET = '[Laan i friværdi - Reset beregning]',
  LAAN_I_FRIVAERDI_SET_DISABLE_TOGGLES = '[Laan i friværdi - Set Disable toggles]',
  LAAN_I_FRIVAERDI_SET_VIS_DETALJER = '[Laan i friværdi - Set Vis detaljer]',
  LAAN_I_FRIVAERDI_SET_VIS_AFDRAGSFRIHED = '[Laan i friværdi - Set Vis afdragsfrihed]',
  LAAN_I_FRIVAERDI_SEND_LEAD = '[Laan i friværdi - Send kontaktformular-parameter]',
  LAAN_I_FRIVAERDI_LOAD_MAX_PROVENU = '[Laan i friværdi - Load max provenu]',
  LAAN_I_FRIVAERDI_LOAD_MAX_PROVENU_SUCCESS = '[Laan i friværdi - Load max provenu Success]',
  LAAN_I_FRIVAERDI_LOAD_MAX_PROVENU_FAILED = '[Laan i friværdi - Load max provenu Failed]',
  LAAN_I_FRIVAERDI_SEND_LEAD_GENEREL = '[Laan i friværdi - Send generel kontaktformular-parameter]',
}

export type LaanIFrivaerdiDispatchableActions =
  TypedAction<LaanIFrivaerdiActionTypes>;

export const loadLaanIFrivaerdi = createAction(
  LaanIFrivaerdiActionTypes.LAAN_I_FRIVAERDI_LOAD,
  props<{ mockData: boolean; input: Beregningsgrundlag }>()
);

export const loadLaanIFrivaerdiSuccess = createAction(
  LaanIFrivaerdiActionTypes.LAAN_I_FRIVAERDI_LOAD_SUCCESS,
  props<{
    beregningsresultat: Beregningsresultat[];
    procentfordeling: Procentfordeling;
    kontaktMigParametre: KontaktFormParameter;
  }>()
);

export const loadLaanIFrivaerdiFailed = createAction(
  LaanIFrivaerdiActionTypes.LAAN_I_FRIVAERDI_LOAD_FAILED,
  props<{ error: Error }>()
);

export const resetLaanIFrivaerdi = createAction(
  LaanIFrivaerdiActionTypes.LAAN_I_FRIVAERDI_RESET
);

export const setLaanIFrivaerdiDisableToggles = createAction(
  LaanIFrivaerdiActionTypes.LAAN_I_FRIVAERDI_SET_DISABLE_TOGGLES,
  props<{ disable: boolean }>()
);

export const setLaanIFrivaerdiVisDetaljer = createAction(
  LaanIFrivaerdiActionTypes.LAAN_I_FRIVAERDI_SET_VIS_DETALJER,
  props<{ visDetaljer: boolean }>()
);

export const setLaanIFrivaerdiVisAfdragsfrihed = createAction(
  LaanIFrivaerdiActionTypes.LAAN_I_FRIVAERDI_SET_VIS_AFDRAGSFRIHED,
  props<{ visAfdragsfrihed: boolean }>()
);

export const loadMaxProvenu = createAction(
  LaanIFrivaerdiActionTypes.LAAN_I_FRIVAERDI_LOAD_MAX_PROVENU,
  props<{ mockData: boolean; input: LaanIFrivaerdiFormData }>()
);

export const loadMaxProvenuSuccess = createAction(
  LaanIFrivaerdiActionTypes.LAAN_I_FRIVAERDI_LOAD_MAX_PROVENU_SUCCESS,
  props<{
    maxProvenu: number;
  }>()
);

export const loadMaxProvenuFailed = createAction(
  LaanIFrivaerdiActionTypes.LAAN_I_FRIVAERDI_LOAD_MAX_PROVENU_FAILED,
  props<{ error: Error }>()
);

export const sendGenerelLaanIFrivaerdiKontaktformular = createAction(
  LaanIFrivaerdiActionTypes.LAAN_I_FRIVAERDI_SEND_LEAD_GENEREL,
  props<{
    kontaktMigParametre: KontaktFormParameter;
  }>()
);
