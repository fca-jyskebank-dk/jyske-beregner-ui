import { JyskeFrihedAreas } from '@jyske-frihed-beregner/jyske-frihed-beregner.constants';
import { createReducer, on } from '@ngrx/store';
import * as JyskeFrihedBeregnerActions from './jyske-frihed-beregner.actions';
import { JyskeFrihedBeregnerState } from './jyske-frihed-beregner.interfaces';

const initialState: JyskeFrihedBeregnerState = {
  behaviours: {
    area: JyskeFrihedAreas.privat,
    areaType: null,
    loading: false,
    error: null,
  },
  resultat: null,
};

export const reducer = createReducer(
  initialState,

  on(
    JyskeFrihedBeregnerActions.setJyskeFrihedBeregnerArea,
    (_, { area, areaType }) => {
      return {
        ...initialState,
        behaviours: {
          ...initialState.behaviours,
          area,
          areaType,
        },
      };
    }
  ),

  on(JyskeFrihedBeregnerActions.loadJyskeFrihedBeregner, (state) => {
    return {
      ...state,
      behaviours: {
        ...state.behaviours,
        loading: true,
      },
    };
  }),

  on(
    JyskeFrihedBeregnerActions.loadJyskeFrihedBeregnerSuccess,
    (state, { resultat }) => {
      return {
        ...state,
        behaviours: {
          ...state.behaviours,
          loading: false,
        },
        resultat,
      };
    }
  ),

  on(
    JyskeFrihedBeregnerActions.loadJyskeFrihedBeregnerFailed,
    (state, { error }) => {
      return {
        ...state,
        behaviours: {
          ...state.behaviours,
          loading: false,
          error,
        },
        resultat: null,
      };
    }
  )
);
