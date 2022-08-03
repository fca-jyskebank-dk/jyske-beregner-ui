import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JyskeBeregningerServiceProxy } from '@jyske-beregner-api/proxies/jyske-beregninger.service.proxy';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import {
  loadBeregnLaanGenerel,
  loadBeregnLaanGenerelFailed,
  loadBeregnLaanGenerelSuccess,
  sendGenerelKontaktformular,
  openBeregnLaanIFrivaerdi,
  openBeregnLaanTilKoebAfBolig
} from './beregn-laan-generel.actions';
import { BeregnLaanGenerelMapper } from './beregn-laan-generel.map.service';
import { KontaktformularService } from '@shared/services/kontaktformular.service';
import { BeregnLaanIFrivaerdiService } from '@shared/services/beregn-laan-i-frivaerdi.service';
import { BeregnLaanTilKoebAfBoligService } from '@shared/services/beregn-laan-til-koeb-af-bolig.service';
import { BeregnAlleLaanResponse } from '@jyske-beregner-api/model/beregn-alle-laan-response';

@Injectable()
export class BeregnLaanGenerelEffects {
  constructor(
    private actions$: Actions,
    private beregnerServiceProxy: JyskeBeregningerServiceProxy,
    private beregnLaanGenerelMapper: BeregnLaanGenerelMapper,
    private kontaktformularService: KontaktformularService,
    private beregnLaanIFrivaerdiService: BeregnLaanIFrivaerdiService,
    private beregnLaanTilKoebAfBoligService: BeregnLaanTilKoebAfBoligService,
  ) {}

  public loadLaanGeneral$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadBeregnLaanGenerel),
      switchMap((action) =>
        this.beregnerServiceProxy
          .apiBeregningerBeregnLaanIFrivaerdiPost(
            this.beregnLaanGenerelMapper.mapRequest(action.antalAfdragsfriAar),
            action.mockData
          )
          .pipe(
            map((response: BeregnAlleLaanResponse) =>
              loadBeregnLaanGenerelSuccess({
                beregningsresultat:
                  this.beregnLaanGenerelMapper.mapBeregningsresultat(response),
                kontaktMigParametre: this.beregnLaanGenerelMapper.mapKontaktMigParameterGenerel(response),
              })
            ),
            catchError((err: HttpErrorResponse) =>
              of(
                loadBeregnLaanGenerelFailed({
                  error: err,
                })
              )
            )
          )
      )
    )
  );

  public sendGenerelKontaktformular$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(sendGenerelKontaktformular),
        tap((parameter) => {
          this.kontaktformularService.loadKontaktformular(parameter.kontaktMigParametre);
        })
      ),
    {
      dispatch: false,
    }
  );

  public openBeregnLaanIFrivaerdi$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(openBeregnLaanIFrivaerdi),
        tap((parameter) => {
          this.beregnLaanIFrivaerdiService.loadBeregnLaanIFrivaerdi();
        })
      ),
    {
      dispatch: false,
    }
  );

  public openBeregnLaanTilKoebAfBolig$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(openBeregnLaanTilKoebAfBolig),
        tap((parameter) => {
          this.beregnLaanTilKoebAfBoligService.loadBeregnLaanTilKoebAfBolig();
        })
      ),
    {
      dispatch: false,
    }
  );
}
