import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JyskeBeregningerServiceProxy } from '@jyske-beregner-api/proxies/jyske-beregninger.service.proxy';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import {
  loadJyskeBoligberegner,
  loadJyskeBoligberegnerFailed,
  loadJyskeBoligberegnerSuccess,
  sendGenerelBoligberegnerKontaktformular,
} from './jyske-boligberegner.actions';
import { JyskeBoligberegnerMapper } from './jyske-boligberegner.map.service';
import { KontaktformularService } from '@shared/services/kontaktformular.service';
import { BeregnAlleLaanResponse } from '@jyske-beregner-api/model/beregn-alle-laan-response';

@Injectable()
export class JyskeBoligberegnerEffects {
  constructor(
    private actions$: Actions,
    private jyskeHelaarsboligServiceProxy: JyskeBeregningerServiceProxy,
    private jyskeBoligberegnerMapper: JyskeBoligberegnerMapper,
    private kontaktformularService: KontaktformularService
  ) {}

  public loadJyskeBoligberegner$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadJyskeBoligberegner),
      switchMap((action) =>
        this.jyskeHelaarsboligServiceProxy
          .apiBeregningerBeregnLaanTilNyBoligPost(
            this.jyskeBoligberegnerMapper.mapRequest(action.input),
            action.mockData
          )
          .pipe(
            map((response: BeregnAlleLaanResponse) =>
              loadJyskeBoligberegnerSuccess({
                beregningsresultat:
                  this.jyskeBoligberegnerMapper.mapBeregningsresultat(response),
                kontaktMigParametre: this.jyskeBoligberegnerMapper.mapKontaktMigParameterGenerel(response)
              })
            ),
            catchError((err: HttpErrorResponse) =>
              of(
                loadJyskeBoligberegnerFailed({
                  error: err,
                })
              )
            )
          )
      )
    )
  );

  public sendGenerelBoligberegnerKontaktformular$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(sendGenerelBoligberegnerKontaktformular),
        tap((parameter) => {
          this.kontaktformularService.loadKontaktformular(parameter.kontaktMigParametre);
        })
      ),
    {
      dispatch: false,
    }
  );
}
