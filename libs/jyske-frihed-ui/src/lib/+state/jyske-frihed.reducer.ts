import { createReducer, on } from '@ngrx/store';
import * as JyskeFrihedActions from './jyske-frihed.actions';
import { JyskeFrihedState } from './jyske-frihed.interfaces';

const initialState: JyskeFrihedState = {
  behaviours: {
    loading: false,
    error: null,
    disableToggles: false,
    visDetaljer: false,
    maxProvenuLoading: false,
  },
  maxProvenuer: null,
  ejendomsvaerdi: 0,
  resultat: null,
};

export const reducer = createReducer(
  initialState,

  on(JyskeFrihedActions.loadJyskeFrihed, (state, { input }) => {
    return {
      ...state,
      behaviours: {
        ...state.behaviours,
        loading: true,
        disableToggles: true,
      },
      formInput: input,
    };
  }),

  on(
    JyskeFrihedActions.loadJyskeFrihedSuccess,
    (state, { beregningsresultat, kontaktMigParametre, ejendomsvaerdi }) => {
      return {
        ...state,
        behaviours: {
          ...state.behaviours,
          loading: false,
          disableToggles: false,
        },
        resultat: beregningsresultat,
        kontaktMigParameterGenerel: kontaktMigParametre,
        ejendomsvaerdi: ejendomsvaerdi
      };
    }
  ),

  on(JyskeFrihedActions.loadJyskeFrihedFailed, (state, { error }) => {
    return {
      ...state,
      behaviours: {
        ...state.behaviours,
        loading: false,
        error,
      },
      resultat: null,
    };
  }),

  on(JyskeFrihedActions.setJyskeFrihedDisableToggles, (state, { disable }) => {
    return {
      ...state,
      behaviours: {
        ...state.behaviours,
        disableToggles: disable,
      },
    };
  }),

  on(JyskeFrihedActions.setJyskeFrihedVisDetaljer, (state, { visDetaljer }) => {
    return {
      ...state,
      behaviours: {
        ...state.behaviours,
        visDetaljer,
      },
    };
  }),

  on(JyskeFrihedActions.loadMaxProvenu, (state) => {
    return {
      ...state,
      behaviours: {
        ...state.behaviours,
        maxProvenuLoading: true,
      },
    };
  }),

  on(JyskeFrihedActions.loadMaxProvenuSuccess, (state, { maxProvenuer }) => {
    return {
      ...state,
      maxProvenuer: maxProvenuer,
      behaviours: {
        ...state.behaviours,
        loading: false,
        maxProvenuLoading: false,
      },
    };
  }),

  on(JyskeFrihedActions.loadMaxProvenuFailed, (state, { error }) => {
    return {
      ...state,
      behaviours: {
        ...state.behaviours,
        loading: false,
        maxProvenuLoading: false,
        error,
      },
      resultat: null,
      maxProvenuMedAfdrag: null,
    };
  })
);
