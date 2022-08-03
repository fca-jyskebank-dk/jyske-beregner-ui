import { Beregningsresultat } from '@beregningsresultat-ui/finansieringsforslag/finansieringsforslag.interfaces';
import { Beregningsgrundlag } from '@jyske-boligberegner-ui/+state/jyske-boligberegner.interfaces';
import { createAction, props } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';
import { KontaktFormParameter } from '@shared/services/kontaktformular.service';

export const enum JyskeBoligberegnerActionTypes {
  JYSKE_BOLIGBEREGNER_LOAD = '[Jyske Boligberegner - Load beregning]',
  JYSKE_BOLIGBEREGNER_LOAD_SUCCESS = '[Jyske Boligberegner - Load beregning Succes]',
  JYSKE_BOLIGBEREGNER_LOAD_FAILED = '[Jyske Boligberegner - Load beregning Failed]',
  JYSKE_BOLIGBEREGNER_SET_DISABLE_TOGGLES = '[Jyske Boligberegner - Set Disable toggles]',
  JYSKE_BOLIGBEREGNER_SET_VIS_DETALJER = '[Jyske Boligberegner - Set Vis detaljer]',
  JYSKE_BOLIGBEREGNER_SET_VIS_AFDRAGSFRIHED = '[Jyske Boligberegner - Set Vis afdragsfrihed]',
  JYSKE_BOLIGBEREGNER_SEND_LEAD = '[Jyske Boligberegner - Send kontaktformular-parameter]',
  JYSKE_BOLIGBEREGNER_SEND_LEAD_GENEREL = '[Jyske Boligberegner - Send generel kontaktformular-parameter]',
}

export type JyskeBoligberegnerDispatchableActions =
  TypedAction<JyskeBoligberegnerActionTypes>;

export const loadJyskeBoligberegner = createAction(
  JyskeBoligberegnerActionTypes.JYSKE_BOLIGBEREGNER_LOAD,
  props<{ mockData: boolean; input: Beregningsgrundlag }>()
);

export const loadJyskeBoligberegnerSuccess = createAction(
  JyskeBoligberegnerActionTypes.JYSKE_BOLIGBEREGNER_LOAD_SUCCESS,
  props<{
    beregningsresultat: Beregningsresultat[];
    kontaktMigParametre: KontaktFormParameter;
  }>()
);

export const loadJyskeBoligberegnerFailed = createAction(
  JyskeBoligberegnerActionTypes.JYSKE_BOLIGBEREGNER_LOAD_FAILED,
  props<{ error: Error }>()
);

export const setJyskeBoligberegnerDisableToggles = createAction(
  JyskeBoligberegnerActionTypes.JYSKE_BOLIGBEREGNER_SET_DISABLE_TOGGLES,
  props<{ disable: boolean }>()
);

export const setJyskeBoligberegnerVisDetaljer = createAction(
  JyskeBoligberegnerActionTypes.JYSKE_BOLIGBEREGNER_SET_VIS_DETALJER,
  props<{ visDetaljer: boolean }>()
);

export const setJyskeBoligberegnerVisAfdragsfrihed = createAction(
  JyskeBoligberegnerActionTypes.JYSKE_BOLIGBEREGNER_SET_VIS_AFDRAGSFRIHED,
  props<{ visAfdragsfrihed: boolean }>()
);

export const sendGenerelBoligberegnerKontaktformular = createAction(
  JyskeBoligberegnerActionTypes.JYSKE_BOLIGBEREGNER_SEND_LEAD_GENEREL,
  props<{
    kontaktMigParametre: KontaktFormParameter;
  }>()
);
