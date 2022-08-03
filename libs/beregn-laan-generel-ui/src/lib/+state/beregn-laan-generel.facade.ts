import { Injectable } from '@angular/core';
import { BeregnLaanGenerelDispatchableActions } from './beregn-laan-generel.actions';
import { select, Store } from '@ngrx/store';
import { distinctUntilChanged } from 'rxjs/operators';
import {
  selectBeregnLaanGenerel,
  selectBeregnLaanGenerelIsLoading,
  selectBeregnLaanGenerelLoadDisableToggles,
  selectBeregnLaanGenerelLoadVisAfdragsfrihed,
  selectKontaktMigParameterGenerel,
} from './beregn-laan-generel.selectors';

@Injectable({
  providedIn: 'root',
})
export class BeregnLaanGenerelFacade {
  constructor(private store: Store) {}

  public BeregnLaanGenerel$ = this.store.pipe(
    distinctUntilChanged(),
    select(selectBeregnLaanGenerel)
  );

  public BeregnLaanGenerelIsLoading$ = this.store.pipe(
    distinctUntilChanged(),
    select(selectBeregnLaanGenerelIsLoading)
  );

  public BeregnLaanGenerelDisabledToggles$ = this.store.pipe(
    distinctUntilChanged(),
    select(selectBeregnLaanGenerelLoadDisableToggles)
  );

  public BeregnLaanGenerelVisAfdragsfrihed$ = this.store.pipe(
    distinctUntilChanged(),
    select(selectBeregnLaanGenerelLoadVisAfdragsfrihed)
  );

  public KontaktMigParametreGenerel$ = this.store.pipe(
    distinctUntilChanged(),
    select(selectKontaktMigParameterGenerel)
  );

  public dispatch(action: BeregnLaanGenerelDispatchableActions): void {
    this.store.dispatch(action);
  }
}
