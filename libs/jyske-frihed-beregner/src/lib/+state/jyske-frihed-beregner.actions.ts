import {
  JyskeFrihedAreas,
  JyskeFrihedAreaTypes,
} from '@jyske-frihed-beregner/jyske-frihed-beregner.constants';
import { createAction, props } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';
import { JyskeFrihedBeregnerRequest } from '../services/jyske-frihed-beregner.service.interfaces';
import { JyskeFrihedBeregnerResultat } from './jyske-frihed-beregner.interfaces';
import { Error } from './jyske-frihed-beregner.interfaces';

const enum JyskeFrihedActionTypes {
  JYSKE_FRIHED_BEREGNER_SET_AREA = '[Jyske Frihed Beregner - Set area]',
  JYSKE_FRIHED_BEREGNER_LOAD = '[Jyske Frihed Beregner - Load beregning]',
  JYSKE_FRIHED_BEREGNER_LOAD_SUCCESS = '[Jyske Frihed Beregner - Load beregning Success]',
  JYSKE_FRIHED_BEREGNER_LOAD_FAILED = '[Jyske Frihed Beregner - Load beregning Failure]',
}

export type JyskeFrihedBeregnerDispatchableActions = TypedAction<
  JyskeFrihedActionTypes
>;

export const setJyskeFrihedBeregnerArea = createAction(
  JyskeFrihedActionTypes.JYSKE_FRIHED_BEREGNER_SET_AREA,
  props<{ area: JyskeFrihedAreas; areaType: JyskeFrihedAreaTypes }>()
);

export const loadJyskeFrihedBeregner = createAction(
  JyskeFrihedActionTypes.JYSKE_FRIHED_BEREGNER_LOAD,
  props<{ request: JyskeFrihedBeregnerRequest }>()
);

export const loadJyskeFrihedBeregnerSuccess = createAction(
  JyskeFrihedActionTypes.JYSKE_FRIHED_BEREGNER_LOAD_SUCCESS,
  props<{ resultat: JyskeFrihedBeregnerResultat }>()
);

export const loadJyskeFrihedBeregnerFailed = createAction(
  JyskeFrihedActionTypes.JYSKE_FRIHED_BEREGNER_LOAD_FAILED,
  props<{ error: Error }>()
);
