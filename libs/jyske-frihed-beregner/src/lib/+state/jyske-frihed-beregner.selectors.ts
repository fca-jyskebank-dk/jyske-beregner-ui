import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromJyskeFrihedBeregner from './jyske-frihed-beregner.interfaces';
import {
  JyskeFrihedAreas,
  JyskeFrihedAreaTypes,
  JYSKE_FRIHED_BEREGNER_FEATURE_NAME,
} from '../jyske-frihed-beregner.constants';

export const selectJyskeFrihedState = createFeatureSelector<
  fromJyskeFrihedBeregner.JyskeFrihedBeregnerState
>(JYSKE_FRIHED_BEREGNER_FEATURE_NAME);

export const selectJyskeFrihedBeregnerArea = createSelector(
  selectJyskeFrihedState,
  (state: fromJyskeFrihedBeregner.JyskeFrihedBeregnerState): JyskeFrihedAreas =>
    state.behaviours.area
);

export const selectJyskeFrihedBeregnerAreaType = createSelector(
  selectJyskeFrihedState,
  (
    state: fromJyskeFrihedBeregner.JyskeFrihedBeregnerState
  ): JyskeFrihedAreaTypes => state.behaviours.areaType
);

export const selectJyskeFrihedBeregnerIsLoading = createSelector(
  selectJyskeFrihedState,
  (state: fromJyskeFrihedBeregner.JyskeFrihedBeregnerState) =>
    state.behaviours.loading === true
);

export const selectJyskeFrihedBeregnerIsLoaded = createSelector(
  selectJyskeFrihedState,
  (state: fromJyskeFrihedBeregner.JyskeFrihedBeregnerState) =>
    state.behaviours.loading === false && state.resultat !== null
);

export const selectJyskeFrihedBeregnerHasError = createSelector(
  selectJyskeFrihedState,
  (state: fromJyskeFrihedBeregner.JyskeFrihedBeregnerState) =>
    state.behaviours.error !== null
);

export const selectJyskeFrihedBeregnerErrors = createSelector(
  selectJyskeFrihedState,
  (state: fromJyskeFrihedBeregner.JyskeFrihedBeregnerState) =>
    state.behaviours?.error?.errors
);

export const selectJyskeFrihedBeregnerResultat = createSelector(
  selectJyskeFrihedState,
  (
    state: fromJyskeFrihedBeregner.JyskeFrihedBeregnerState
  ): fromJyskeFrihedBeregner.JyskeFrihedBeregnerResultat => state.resultat
);

export const selectJyskeFrihedBeregnerNoegletal = createSelector(
  selectJyskeFrihedState,
  (
    state: fromJyskeFrihedBeregner.JyskeFrihedBeregnerState
  ): fromJyskeFrihedBeregner.JyskeFrihedBeregnerNoegletal => {
    return {
      ...state.resultat?.noegletal,
    };
  }
);
