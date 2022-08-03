import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SEND_BEREGNING_FEATURE_NAME } from '../../containers/send-beregning/send-beregning.constants';
import * as fromSendBeregning from './send-beregning.interfaces';

export const selectSendBeregningState =
  createFeatureSelector<fromSendBeregning.SendBeregningState>(
    SEND_BEREGNING_FEATURE_NAME
  );

export const selectSendBeregningIsLoading = createSelector(
  selectSendBeregningState,
  (state: fromSendBeregning.SendBeregningState): boolean =>
    state.behaviours.loading
);

export const selectSendBeregningSuccess = createSelector(
  selectSendBeregningState,
  (state: fromSendBeregning.SendBeregningState): boolean => state.ok === true
);

export const selectSendBeregningHasError = createSelector(
  selectSendBeregningState,
  (state: fromSendBeregning.SendBeregningState): boolean => state.ok === false
);
