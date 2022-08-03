import { Beregningsresultat } from '@beregningsresultat-ui/finansieringsforslag/finansieringsforslag.interfaces';
import { Beregningsgrundlag, MaxProvenuer } from './jyske-frihed.interfaces';
import { createAction, props } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';
import { JyskeFrihedFormData } from '@jyske-frihed-ui/presentational/jyske-frihed-input/jyske-frihed-input.interfaces';
import { KontaktFormParameter } from '@shared/services/kontaktformular.service';

export const enum JyskeFrihedActionTypes {
  JYSKE_FRIHED_LOAD = '[Jyske frihed - Load beregning]',
  JYSKE_FRIHED_LOAD_SUCCESS = '[Jyske frihed - Load beregning Succes]',
  JYSKE_FRIHED_LOAD_FAILED = '[Jyske frihed - Load beregning Failed]',
  JYSKE_FRIHED_RESET = '[Jyske frihed - Reset beregning]',
  JYSKE_FRIHED_SET_DISABLE_TOGGLES = '[Jyske frihed - Set Disable toggles]',
  JYSKE_FRIHED_SET_VIS_DETALJER = '[Jyske frihed - Set Vis detaljer]',
  JYSKE_FRIHED_SET_VIS_AFDRAGSFRIHED = '[Jyske frihed - Set Vis afdragsfrihed]',
  JYSKE_FRIHED_SEND_LEAD = '[Jyske frihed - Send kontaktformular-parameter]',
  JYSKE_FRIHED_LOAD_MAX_PROVENU = '[Jyske frihed - Load max provenu]',
  JYSKE_FRIHED_LOAD_MAX_PROVENU_SUCCESS = '[Jyske frihed - Load max provenu Success]',
  JYSKE_FRIHED_LOAD_MAX_PROVENU_FAILED = '[Jyske frihed - Load max provenu Failed]',
  JYSKE_FRIHED_SEND_LEAD_GENEREL = '[Jyske frihed - Send generel kontaktformular-parameter]',
}

export type JyskeFrihedDispatchableActions =
  TypedAction<JyskeFrihedActionTypes>;

export const loadJyskeFrihed = createAction(
  JyskeFrihedActionTypes.JYSKE_FRIHED_LOAD,
  props<{ mockData: boolean; input: Beregningsgrundlag }>()
);

export const loadJyskeFrihedSuccess = createAction(
  JyskeFrihedActionTypes.JYSKE_FRIHED_LOAD_SUCCESS,
  props<{
    beregningsresultat: Beregningsresultat[];
    kontaktMigParametre: KontaktFormParameter;
    ejendomsvaerdi: number;
  }>()
);

export const loadJyskeFrihedFailed = createAction(
  JyskeFrihedActionTypes.JYSKE_FRIHED_LOAD_FAILED,
  props<{ error: Error }>()
);

export const setJyskeFrihedDisableToggles = createAction(
  JyskeFrihedActionTypes.JYSKE_FRIHED_SET_DISABLE_TOGGLES,
  props<{ disable: boolean }>()
);

export const setJyskeFrihedVisDetaljer = createAction(
  JyskeFrihedActionTypes.JYSKE_FRIHED_SET_VIS_DETALJER,
  props<{ visDetaljer: boolean }>()
);

export const loadMaxProvenu = createAction(
  JyskeFrihedActionTypes.JYSKE_FRIHED_LOAD_MAX_PROVENU,
  props<{ mockData: boolean; boligvaerdi: number }>()
);

export const loadMaxProvenuSuccess = createAction(
  JyskeFrihedActionTypes.JYSKE_FRIHED_LOAD_MAX_PROVENU_SUCCESS,
  props<{ maxProvenuer: MaxProvenuer }>()
);

export const loadMaxProvenuFailed = createAction(
  JyskeFrihedActionTypes.JYSKE_FRIHED_LOAD_MAX_PROVENU_FAILED,
  props<{ error: Error }>()
);

export const sendGenerelJyskeFrihedKontaktformular = createAction(
  JyskeFrihedActionTypes.JYSKE_FRIHED_SEND_LEAD_GENEREL,
  props<{ kontaktMigParametre: KontaktFormParameter }>()
);
