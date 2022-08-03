import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JyskeBeregningerServiceProxy } from '@jyske-beregner-api/proxies/jyske-beregninger.service.proxy';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import {
  loadJyskeFrihed,
  loadJyskeFrihedFailed,
  loadJyskeFrihedSuccess,
  loadMaxProvenu,
  loadMaxProvenuSuccess,
  loadMaxProvenuFailed,
  sendGenerelJyskeFrihedKontaktformular,
} from './jyske-frihed.actions';
import { JyskeFrihedMapper } from './jyske-frihed.map.service';
import { KontaktformularService } from '@shared/services/kontaktformular.service';
import { BeregnFrihedResponse } from '@jyske-beregner-api/model/beregn-frihed-response';
import { MaxProvenuFrihedResponse } from '@jyske-beregner-api/model/max-provenu-frihed-response';

@Injectable()
export class JyskeFrihedEffects {
  constructor(
    private actions$: Actions,
    private beregnerServiceProxy: JyskeBeregningerServiceProxy,
    private jyskeFrihedMapper: JyskeFrihedMapper,
    private kontaktformularService: KontaktformularService
  ) {}

  public loadJyskeFrihed$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadJyskeFrihed),
      switchMap((action) =>
        this.beregnerServiceProxy
          .apiBeregningerFrihedPost(
            this.jyskeFrihedMapper.mapBeregnFrihedRequest(action.input),
            action.mockData
          )
          .pipe(
            map((response: BeregnFrihedResponse) =>
              loadJyskeFrihedSuccess({
                beregningsresultat:
                  this.jyskeFrihedMapper.mapBeregningsresultat(response),
                kontaktMigParametre:
                  this.jyskeFrihedMapper.mapKontaktMigParameterGenerel(
                    response
                  ),
                ejendomsvaerdi: response.ejendomsvaerdi,
              })
            ),
            catchError((err: HttpErrorResponse) =>
              of(
                loadJyskeFrihedFailed({
                  error: err,
                })
              )
            )
          )
      )
    )
  );

  public loadMaxProvenu$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadMaxProvenu),
      switchMap((action) =>
        this.beregnerServiceProxy
          .apiBeregningerFrihedMaxProvenuPost(
            this.jyskeFrihedMapper.mapMaxProvenuRequest(action.boligvaerdi),
            action.mockData
          )
          .pipe(
            map((response: MaxProvenuFrihedResponse) =>
              loadMaxProvenuSuccess({
                maxProvenuer: this.jyskeFrihedMapper.mapMaxProvenuer(response),
              })
            ),
            catchError((err: HttpErrorResponse) =>
              of(
                loadMaxProvenuFailed({
                  error: err,
                })
              )
            )
          )
      )
    )
  );

  public sendGenerelJyskeFrihedKontaktformular$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(sendGenerelJyskeFrihedKontaktformular),
        tap((parameter) => {
          this.kontaktformularService.loadKontaktformular(
            parameter.kontaktMigParametre
          );
        })
      ),
    {
      dispatch: false,
    }
  );
}
