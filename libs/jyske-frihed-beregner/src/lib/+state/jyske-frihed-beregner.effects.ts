import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as JyskeFrihedBeregnerActions from './jyske-frihed-beregner.actions';
import { JyskeFrihedBeregnerService } from '../services/jyske-frihed-beregner.service';
import { JyskeFrihedBeregnerResponse } from '../services/jyske-frihed-beregner.service.interfaces';
import { HttpErrorResponse } from '@angular/common/http';
import { JyskeFrihedBeregnerMapService } from './jyske-frihed-beregner.map.service';

@Injectable()
export class JyskeFrihedBeregnerEffects {
  constructor(
    private actions$: Actions,
    private jyskeFrihedBeregnerService: JyskeFrihedBeregnerService,
    private jyskeFrihedBeregnerMapService: JyskeFrihedBeregnerMapService
  ) {}

  loadJyskeFrihedBeregning$ = createEffect(() =>
    this.actions$.pipe(
      ofType(JyskeFrihedBeregnerActions.loadJyskeFrihedBeregner),
      switchMap((action) =>
        this.jyskeFrihedBeregnerService.getBeregning$(action.request).pipe(
          map((response: JyskeFrihedBeregnerResponse) =>
            JyskeFrihedBeregnerActions.loadJyskeFrihedBeregnerSuccess({
              resultat: {
                hovedtal: this.jyskeFrihedBeregnerMapService.mapHovedtal(
                  action.request,
                  response
                ),
                noegletal: this.jyskeFrihedBeregnerMapService.mapNoegletal(
                  action.request,
                  response
                ),
                tilbagebetalingsplan: this.jyskeFrihedBeregnerMapService.mapBetalingsplan(
                  response
                ),
                grafData: this.jyskeFrihedBeregnerMapService.mapGrafData(
                  response
                ),
              },
            })
          ),
          catchError((err: HttpErrorResponse) =>
            of(
              JyskeFrihedBeregnerActions.loadJyskeFrihedBeregnerFailed({
                error: this.jyskeFrihedBeregnerMapService.mapErrors(err),
              })
            )
          )
        )
      )
    )
  );
}
