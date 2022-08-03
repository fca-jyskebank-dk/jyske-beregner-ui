import { createAction, props } from '@ngrx/store';
import { JyskeKurslisteAreas as JyskeKurslisteActions } from '../jyske-kursliste-ui.constants';
import { KurslisteData } from '@jyske-kursliste-ui/+state/jyske-kursliste.interfaces';
import { TypedAction } from '@ngrx/store/src/models';

const enum JyskeKurslisteActionTypes {
  JYSKE_KURSLISTE_SET_AREA = '[Jyske Kursliste - Set area]',
  JYSKE_KURSLISTE_LOAD = '[Jyske Kursliste - Load kurser]',
  JYSKE_KURSLISTE_LOAD_SUCCESS = '[Jyske Kursliste - Load kurser Success]',
  JYSKE_KURSLISTE_LOAD_FAILED = '[Jyske Kursliste - Load kurser Failure]',
}

export type JyskeKurslisteDispatchableActions = TypedAction<
  JyskeKurslisteActionTypes
>;

export const setJyskeKurslisteArea = createAction(
  JyskeKurslisteActionTypes.JYSKE_KURSLISTE_SET_AREA,
  props<{ area: JyskeKurslisteActions }>()
);

export const loadJyskeKursliste = createAction(
  JyskeKurslisteActionTypes.JYSKE_KURSLISTE_LOAD,
  props<{ mockData: boolean }>()
);

export const loadJyskeKurslisteSuccess = createAction(
  JyskeKurslisteActionTypes.JYSKE_KURSLISTE_LOAD_SUCCESS,
  props<{
    resultatFastRente: KurslisteData;
    resultatVariabelRente: KurslisteData;
  }>()
);

export const loadJyskeKurslisteFailed = createAction(
  JyskeKurslisteActionTypes.JYSKE_KURSLISTE_LOAD_FAILED,
  props<{ error: Error }>()
);
