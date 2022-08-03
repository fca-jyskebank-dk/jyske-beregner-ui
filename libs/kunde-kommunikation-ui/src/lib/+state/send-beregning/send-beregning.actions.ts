import { HttpErrorResponse } from '@angular/common/http';
import { Beregningsresultat } from '@beregningsresultat-ui/finansieringsforslag/finansieringsforslag.interfaces';
import { createAction, props } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';

export const enum SendBeregningActionTypes {
  SEND_BEREGNING_LEAD = '[Send beregning - Send beregning]',
  SEND_BEREGNING_LEAD_SUCCESS = '[Send beregning - Send beregning success]',
  SEND_BEREGNING_LEAD_FAILED = '[Send beregning - Send beregning failed]',
}

export type SendBeregningDispatchableActions =
  TypedAction<SendBeregningActionTypes>;

export const sendBeregning = createAction(
  SendBeregningActionTypes.SEND_BEREGNING_LEAD,
  props<{
    mockData: boolean;
    beregningsresultat: Beregningsresultat;
    navn: string;
    email: string;
    kontaktMig: boolean;
    partnerId: string;
  }>()
);

export const sendBeregningSuccess = createAction(
  SendBeregningActionTypes.SEND_BEREGNING_LEAD_SUCCESS
);

export const sendBeregningFailed = createAction(
  SendBeregningActionTypes.SEND_BEREGNING_LEAD_FAILED,
  props<{ error: HttpErrorResponse }>()
);
