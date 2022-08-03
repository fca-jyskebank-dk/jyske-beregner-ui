import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  sendBeregning,
  sendBeregningFailed,
  sendBeregningSuccess,
} from './send-beregning.actions';
import { KommunikationServiceProxy } from '@jyske-beregner-api/proxies/jyske-kommunikation.service.proxy';
import { SendBeregningMapper } from './send-beregning.map.service';
import { SendBeregningResponse } from '@jyske-beregner-api/model/send-beregning-response';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class SendBeregningEffects {
  constructor(
    private actions$: Actions,
    private kommunikationServiceProxy: KommunikationServiceProxy,
    private sendBeregningMapper: SendBeregningMapper
  ) {}

  public loadJyskeBoligberegner$ = createEffect(() =>
    this.actions$.pipe(
      ofType(sendBeregning),
      switchMap((action) =>
        this.kommunikationServiceProxy
          .apiKommunikationSendBeregningPost(
            this.sendBeregningMapper.mapSendBeregningRequest(
              action.beregningsresultat,
              action.email,
              action.navn,
              action.kontaktMig,
              action.partnerId
            ),
            action.mockData
          )
          .pipe(
            map((response: SendBeregningResponse) =>
              response.gikDetGodt
                ? sendBeregningSuccess()
                : sendBeregningFailed(null)
            ),
            catchError((err: HttpErrorResponse) =>
              of(
                sendBeregningFailed({
                  error: err,
                })
              )
            )
          )
      )
    )
  );
}
