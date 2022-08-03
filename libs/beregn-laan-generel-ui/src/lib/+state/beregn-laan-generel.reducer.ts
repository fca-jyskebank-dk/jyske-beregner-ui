import { createReducer, on } from '@ngrx/store';
import * as BeregnLaanGenerelActions from './beregn-laan-generel.actions';
import { BeregnLaanGenerelState } from './beregn-laan-generel.interfaces';

const initialState: BeregnLaanGenerelState = {
  behaviours: {
    loading: false,
    error: null,
    disableToggles: false,
    visAfdragsfrihed: false,
  },
  resultat: null,
};

export const reducer = createReducer(
  initialState,

  on(BeregnLaanGenerelActions.loadBeregnLaanGenerel, (state, {}) => {
    return {
      ...state,
      behaviours: {
        ...state.behaviours,
        loading: true,
        disableToggles: true,
      },
    };
  }),

  on(
    BeregnLaanGenerelActions.loadBeregnLaanGenerelSuccess,
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

  on(BeregnLaanGenerelActions.resetBeregnLaanGenerel, (state) => {
    return {
      ...state,
      behaviours: {
        ...state.behaviours,
      },
      resultat: null,
      kontaktMigParameterGenerel: null,
    };
  }),

  on(
    BeregnLaanGenerelActions.loadBeregnLaanGenerelFailed,
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
    BeregnLaanGenerelActions.setBeregnLaanGenerelDisableToggles,
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
    BeregnLaanGenerelActions.setBeregnLaanGenerelVisAfdragsfrihed,
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
