import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JyskeBeregningerServiceProxy } from '@jyske-beregner-api/proxies/jyske-beregninger.service.proxy';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import {
  loadLaanIFrivaerdi,
  loadLaanIFrivaerdiFailed,
  loadLaanIFrivaerdiSuccess,
  loadMaxProvenu,
  loadMaxProvenuSuccess,
  loadMaxProvenuFailed,
  sendGenerelLaanIFrivaerdiKontaktformular,
} from './laan-i-frivaerdi.actions';
import { LaanIFrivaerdiMapper } from './laan-i-frivaerdi.map.service';
import { KontaktformularService } from '@shared/services/kontaktformular.service';
import { BeregnAlleLaanResponse } from '@jyske-beregner-api/model/beregn-alle-laan-response';
import { MaxProvenueResponse } from '@jyske-beregner-api/model/max-provenue-response';

@Injectable()
export class LaanIFrivaerdiEffects {
  constructor(
    private actions$: Actions,
    private beregnerServiceProxy: JyskeBeregningerServiceProxy,
    private laanIFrivaerdiMapper: LaanIFrivaerdiMapper,
    private kontaktformularService: KontaktformularService
  ) {}

  public loadLaanIFrivaerdi$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadLaanIFrivaerdi),
      switchMap((action) =>
        this.beregnerServiceProxy
          .apiBeregningerBeregnLaanIFrivaerdiPost(
            this.laanIFrivaerdiMapper.mapRequest(action.input),
            action.mockData
          )
          .pipe(
            map((response: BeregnAlleLaanResponse) =>
              loadLaanIFrivaerdiSuccess({
                beregningsresultat:
                  this.laanIFrivaerdiMapper.mapBeregningsresultat(response),
                procentfordeling:
                  this.laanIFrivaerdiMapper.mapProcentfordelinger(response),
                  kontaktMigParametre: this.laanIFrivaerdiMapper.mapKontaktMigParameterGenerel(response),
              })
            ),
            catchError((err: HttpErrorResponse) =>
              of(
                loadLaanIFrivaerdiFailed({
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
          .apiBeregningerBeregnLaanIFrivaerdiMaxProvenuPost(
            this.laanIFrivaerdiMapper.mapMaxProvenuRequest(action.input),
            action.mockData
          )
          .pipe(
            map((response: MaxProvenueResponse) =>
              loadMaxProvenuSuccess({
                maxProvenu: this.laanIFrivaerdiMapper.mapMaxProvenu(response),
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

  public sendGenerelLaanIFrivaerdiKontaktformular$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(sendGenerelLaanIFrivaerdiKontaktformular),
        tap((parameter) => {
          this.kontaktformularService.loadKontaktformular(parameter.kontaktMigParametre);
        })
      ),
    {
      dispatch: false,
    }
  );
}
