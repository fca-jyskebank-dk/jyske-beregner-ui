import { Injectable } from '@angular/core';
import { JyskeBoligberegnerDispatchableActions } from './jyske-boligberegner.actions';
import { select, Store } from '@ngrx/store';
import { distinctUntilChanged } from 'rxjs/operators';
import {
  selectJyskeBoligberegner,
  selectJyskeBoligberegnerIsLoading,
  selectJyskeBoligberegnerHarBanklaan,
  selectJyskeBoligberegnerLoadDisableToggles as selectJyskeBoligberegnerLoadDisabledToggles,
  selectJyskeBoligberegnerLoadVisDetaljer,
  selectJyskeBoligberegnerLoadVisAfdragsfrihed,
  selectJyskeBoligberegnerRequest,
  selectKontaktMigParameterGenerel,
} from './jyske-boligberegner.selectors';
import { KontaktFormParameter } from '@shared/services/kontaktformular.service';

@Injectable({
  providedIn: 'root',
})
export class JyskeBoligberegnerFacade {
  constructor(private store: Store) {}

  public JyskeBoligberegner$ = this.store.pipe(
    distinctUntilChanged(),
    select(selectJyskeBoligberegner)
  );

  public JyskeBoligberegnerIsLoading$ = this.store.pipe(
    distinctUntilChanged(),
    select(selectJyskeBoligberegnerIsLoading)
  );

  public JyskeBoligberegnerHarBanklaan$ = this.store.pipe(
    distinctUntilChanged(),
    select(selectJyskeBoligberegnerHarBanklaan)
  );

  public JyskeBoligberegnerDisabledToggles$ = this.store.pipe(
    distinctUntilChanged(),
    select(selectJyskeBoligberegnerLoadDisabledToggles)
  );

  public JyskeBoligberegnerVisDetaljer$ = this.store.pipe(
    distinctUntilChanged(),
    select(selectJyskeBoligberegnerLoadVisDetaljer)
  );

  public JyskeBoligberegnerVisAfdragsfrihed$ = this.store.pipe(
    distinctUntilChanged(),
    select(selectJyskeBoligberegnerLoadVisAfdragsfrihed)
  );

  public JyskeBoligberegnerRequest$ = this.store.pipe(
    distinctUntilChanged(),
    select(selectJyskeBoligberegnerRequest)
  );

  public KontaktMigParametreGenerel$ = this.store.pipe(
    distinctUntilChanged(),
    select(selectKontaktMigParameterGenerel)
  );

  public dispatch(action: JyskeBoligberegnerDispatchableActions): void {
    this.store.dispatch(action);
  }
}
