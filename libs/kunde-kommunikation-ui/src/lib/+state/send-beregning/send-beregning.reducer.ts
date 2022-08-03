import { createReducer, on } from '@ngrx/store';
import * as SendBeregningActions from './send-beregning.actions';
import { SendBeregningState } from './send-beregning.interfaces';

const initialState: SendBeregningState = {
  behaviours: {
    loading: false,
    error: null,
  },
  ok: null
};

export const reducer = createReducer(
  initialState,

  on(SendBeregningActions.sendBeregning, (state) => {
    return {
      ok: null,
      behaviours: {
        loading: true,
        error: null,
      },
    };
  }),

  on(SendBeregningActions.sendBeregningSuccess, () => {
    return {
      ok: true,
      behaviours: {
        loading: false,
        error: null,
      },
    };
  }),

  on(SendBeregningActions.sendBeregningFailed, (state, { error }) => {
    return {
      ok: false,
      behaviours: {
        loading: false,
        error,
      },
    };
  })
);
