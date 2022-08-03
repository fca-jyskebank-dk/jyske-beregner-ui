import { createReducer, on } from '@ngrx/store';
import * as LaanIFrivaerdiActions from './laan-i-frivaerdi.actions';
import { LaanIFrivaerdiState } from './laan-i-frivaerdi.interfaces';

const initialState: LaanIFrivaerdiState = {
  behaviours: {
    loading: false,
    maxProvenuIsLoading: false,
    error: null,
    disableToggles: false,
    visDetaljer: false,
    visAfdragsfrihed: false,
  },
  resultat: null,
};

export const reducer = createReducer(
  initialState,

  on(LaanIFrivaerdiActions.loadLaanIFrivaerdi, (state, {input}) => {
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
    LaanIFrivaerdiActions.loadLaanIFrivaerdiSuccess,
    (state, { beregningsresultat, procentfordeling, kontaktMigParametre }) => {
      return {
        ...state,
        behaviours: {
          ...state.behaviours,
          loading: false,
          disableToggles: false,
        },
        resultat: beregningsresultat,
        procentfordeling: procentfordeling,
        kontaktMigParameterGenerel: kontaktMigParametre
      };
    }
  ),

  on(
    LaanIFrivaerdiActions.resetLaanIFrivaerdi,
    (state) => {
      return {
        ...state,
        behaviours: {
          ...state.behaviours,
        },
        resultat: null,
      };
    }
  ),

  on(
    LaanIFrivaerdiActions.loadLaanIFrivaerdiFailed,
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
    LaanIFrivaerdiActions.setLaanIFrivaerdiDisableToggles,
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
    LaanIFrivaerdiActions.setLaanIFrivaerdiVisDetaljer,
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
    LaanIFrivaerdiActions.setLaanIFrivaerdiVisAfdragsfrihed,
    (state, { visAfdragsfrihed }) => {
      return {
        ...state,
        behaviours: {
          ...state.behaviours,
          visAfdragsfrihed,
        },
      };
    }
  ),

  on(
    LaanIFrivaerdiActions.loadMaxProvenu,
    (state) => {
      return {
        ...state,
        behaviours: {
          ...state.behaviours,
          maxProvenuIsLoading: true,
        },
      };
    }
  ),

  on(
    LaanIFrivaerdiActions.loadMaxProvenuSuccess,
    (state, { maxProvenu }) => {
      return {
        ...state,
        maxProvenu: maxProvenu,
        behaviours: {
          ...state.behaviours,
          maxProvenuIsLoading: false,
        },
      };
    }
  ),

  on(
    LaanIFrivaerdiActions.loadMaxProvenuFailed,
    (state, { error }) => {
      return {
        ...state,
        behaviours: {
          ...state.behaviours,
          maxProvenuIsLoading: false,
          error,
        },
        resultat: null,
        maxProvenu: null,
      };
    }
  )
);
