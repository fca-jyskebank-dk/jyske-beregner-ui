import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromJyskeKursliste from './jyske-kursliste.interfaces';
import {
  JyskeKurslisteAreas,
  JYSKE_KURSLISTE_FEATURE_NAME,
} from '../jyske-kursliste-ui.constants';
import { KurslisteData } from '@jyske-kursliste-ui/+state/jyske-kursliste.interfaces';

export const selectJyskeKurslisteState = createFeatureSelector<
  fromJyskeKursliste.JyskeKurslisteState
>(JYSKE_KURSLISTE_FEATURE_NAME);

export const selectJyskeKurslisteArea = createSelector(
  selectJyskeKurslisteState,
  (state: fromJyskeKursliste.JyskeKurslisteState): JyskeKurslisteAreas =>
    state.behaviours.area
);

export const selectJyskeKurslisteFastRente = createSelector(
  selectJyskeKurslisteState,
  (state: fromJyskeKursliste.JyskeKurslisteState): KurslisteData =>
    state.resultatFastRente
);

export const selectJyskeKurslisteVariabelRente = createSelector(
  selectJyskeKurslisteState,
  (state: fromJyskeKursliste.JyskeKurslisteState): KurslisteData =>
    state.resultatVariabelRente
);
