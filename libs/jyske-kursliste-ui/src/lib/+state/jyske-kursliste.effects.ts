import * as JyskeKurslisteActions from './jyske-kursliste.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JyskeKurslisteServiceProxy } from '@jyske-beregner-api/proxies/jyske-kursliste.service.proxy';
import { of } from 'rxjs';
import { KurslisteResponse } from '@jyske-beregner-api/model/models';
import { JyskeKurslisteMapper } from './jyske-kursliste.map.service';

@Injectable()
export class JyskeKurslisteEffects {
  constructor(
    private actions$: Actions,
    private jyskeKurslisteServiceProxy: JyskeKurslisteServiceProxy,
    private jyskeKurslisteMapper: JyskeKurslisteMapper
  ) {}

  loadJyskeKursliste$ = createEffect(() =>
    this.actions$.pipe(
      ofType(JyskeKurslisteActions.loadJyskeKursliste),
      switchMap((action) =>
        this.jyskeKurslisteServiceProxy.apiPrivatKurslisteGet(action.mockData).pipe(
          map((response: KurslisteResponse) =>
            JyskeKurslisteActions.loadJyskeKurslisteSuccess({
              resultatFastRente: this.jyskeKurslisteMapper.mapFastRenteKursliste(
                response
              ),
              resultatVariabelRente: this.jyskeKurslisteMapper.mapVariabelRenteKursliste(
                response
              ),
            })
          ),
          catchError((err: HttpErrorResponse) =>
            of(
              JyskeKurslisteActions.loadJyskeKurslisteFailed({
                error: err,
              })
            )
          )
        )
      )
    )
  );
}
