import { Injectable } from '@angular/core';
import { JyskeFrihedDispatchableActions } from './jyske-frihed.actions';
import { select, Store } from '@ngrx/store';
import { distinctUntilChanged } from 'rxjs/operators';
import {
  selectJyskeFrihed,
  selectJyskeFrihedIsLoading,
  selectJyskeFrihedLoadDisableToggles as selectJyskeFrihedLoadDisabledToggles,
  selectJyskeFrihedLoadVisDetaljer,
  selectKontaktMigParameterGenerel,
  selectJyskeFrihedLoadMaxProvenu,
  selectJyskeFrihedLoadEjendomsvaerdi,
  selectJyskeFrihedMaxProvenuIsLoading,
} from './jyske-frihed.selectors';

@Injectable({
  providedIn: 'root',
})
export class JyskeFrihedFacade {
  constructor(private store: Store) {}

  public JyskeFrihed$ = this.store.pipe(
    distinctUntilChanged(),
    select(selectJyskeFrihed)
  );

  public JyskeFrihedIsLoading$ = this.store.pipe(
    distinctUntilChanged(),
    select(selectJyskeFrihedIsLoading)
  );

  public JyskeFrihedDisabledToggles$ = this.store.pipe(
    distinctUntilChanged(),
    select(selectJyskeFrihedLoadDisabledToggles)
  );

  public JyskeFrihedVisDetaljer$ = this.store.pipe(
    distinctUntilChanged(),
    select(selectJyskeFrihedLoadVisDetaljer)
  );

  public MaxProvenu$ = this.store.pipe(
    distinctUntilChanged(),
    select(selectJyskeFrihedLoadMaxProvenu)
  );

  public Ejendomsvaerdi$ = this.store.pipe(
    distinctUntilChanged(),
    select(selectJyskeFrihedLoadEjendomsvaerdi)
  );

  public MaxProvenuIsLoading$ = this.store.pipe(
    distinctUntilChanged(),
    select(selectJyskeFrihedMaxProvenuIsLoading)
  );

  public KontaktMigParametreGenerel$ = this.store.pipe(
    distinctUntilChanged(),
    select(selectKontaktMigParameterGenerel)
  );

  public dispatch(action: JyskeFrihedDispatchableActions): void {
    this.store.dispatch(action);
  }
}
