import { JyskeKurslisteAreas as fromJyskeKursliste } from '@jyske-kursliste-ui/jyske-kursliste-ui.constants';
import { createReducer, on } from '@ngrx/store';
import * as JyskeKurslisteActions from './jyske-kursliste.actions';
import { JyskeKurslisteState } from './jyske-kursliste.interfaces';

const initialState: JyskeKurslisteState = {
  behaviours: {
    area: fromJyskeKursliste.default,
    loading: false,
    error: null,
  },
  resultatFastRente: null,
  resultatVariabelRente: null,
};

export const reducer = createReducer(
  initialState,

  on(JyskeKurslisteActions.setJyskeKurslisteArea, (_, { area }) => {
    return {
      ...initialState,
      behaviours: {
        ...initialState.behaviours,
        area,
      },
    };
  }),

  on(JyskeKurslisteActions.loadJyskeKursliste, (state) => {
    return {
      ...state,
      behaviours: {
        ...state.behaviours,
        loading: true,
      },
    };
  }),

  on(
    JyskeKurslisteActions.loadJyskeKurslisteSuccess,
    (state, { resultatFastRente, resultatVariabelRente }) => {
      return {
        ...state,
        behaviours: {
          ...state.behaviours,
          loading: false,
        },
        resultatFastRente,
        resultatVariabelRente,
      };
    }
  ),

  on(JyskeKurslisteActions.loadJyskeKurslisteFailed, (state, { error }) => {
    return {
      ...state,
      behaviours: {
        ...state.behaviours,
        loading: false,
        error,
      },
      resultatFastRente: null,
      resultatVariabelRente: null,
    };
  })
);
