import { createReducer, on } from '@ngrx/store';
import * as JyskeBoligberegnerActions from './jyske-boligberegner.actions';
import { JyskeBoligberegnerState } from './jyske-boligberegner.interfaces';

const initialState: JyskeBoligberegnerState = {
  behaviours: {
    loading: false,
    error: null,
    disableToggles: false,
    visDetaljer: false,
    visAfdragsfrihed: false,
  },
  resultat: null,
};

export const reducer = createReducer(
  initialState,

  on(JyskeBoligberegnerActions.loadJyskeBoligberegner, (state, {input}) => {
    return {
      ...state,
      behaviours: {
        ...state.behaviours,
        loading: true,
        disableToggles: true,
      },
      formInput: input
    };
  }),

  on(
    JyskeBoligberegnerActions.loadJyskeBoligberegnerSuccess,
    (state, { beregningsresultat, kontaktMigParametre }) => {
      return {
        ...state,
        behaviours: {
          ...state.behaviours,
          loading: false,
          disableToggles: false,
        },
        resultat: beregningsresultat,
        kontaktMigParameterGenerel: kontaktMigParametre,
      };
    }
  ),

  on(
    JyskeBoligberegnerActions.loadJyskeBoligberegnerFailed,
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
  ),

  on(
    JyskeBoligberegnerActions.setJyskeBoligberegnerDisableToggles,
    (state, { disable }) => {
      return {
        ...state,
        behaviours: {
          ...state.behaviours,
          disableToggles: disable,
        },
      };
    }
  ),

  on(
    JyskeBoligberegnerActions.setJyskeBoligberegnerVisDetaljer,
    (state, { visDetaljer }) => {
      return {
        ...state,
        behaviours: {
          ...state.behaviours,
          visDetaljer,
        },
      };
    }
  ),

  on(
    JyskeBoligberegnerActions.setJyskeBoligberegnerVisAfdragsfrihed,
    (state, { visAfdragsfrihed }) => {
      return {
        ...state,
        behaviours: {
          ...state.behaviours,
          visAfdragsfrihed,
        },
      };
    }
  )
);
