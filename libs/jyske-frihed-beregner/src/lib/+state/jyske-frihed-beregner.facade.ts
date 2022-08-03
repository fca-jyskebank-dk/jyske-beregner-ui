import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { distinctUntilChanged, first } from 'rxjs/operators';
import { JyskeFrihedBeregnerDispatchableActions } from './jyske-frihed-beregner.actions';
import {
  selectJyskeFrihedBeregnerArea,
  selectJyskeFrihedBeregnerAreaType,
  selectJyskeFrihedBeregnerErrors,
  selectJyskeFrihedBeregnerHasError,
  selectJyskeFrihedBeregnerIsLoaded,
  selectJyskeFrihedBeregnerIsLoading,
  selectJyskeFrihedBeregnerNoegletal,
  selectJyskeFrihedBeregnerResultat,
} from './jyske-frihed-beregner.selectors';

@Injectable()
export class JyskeFrihedBeregnerFacade {
  constructor(private store: Store) {}

  public get JyskeFrihedBeregnerArea() {
    let value: number;
    this.store
      .pipe(first(), select(selectJyskeFrihedBeregnerArea))
      .subscribe((area) => (value = area));
    return value;
  }

  public get JyskeFrihedBeregnerAreaType() {
    let value: number;
    this.store
      .pipe(first(), select(selectJyskeFrihedBeregnerAreaType))
      .subscribe((areaType) => (value = areaType));
    return value;
  }

  public JyskeFrihedBeregnerIsLoading$ = this.store.pipe(
    distinctUntilChanged(),
    select(selectJyskeFrihedBeregnerIsLoading)
  );

  public JyskeFrihedBeregnerIsLoaded$ = this.store.pipe(
    distinctUntilChanged(),
    select(selectJyskeFrihedBeregnerIsLoaded)
  );

  public JyskeFrihedBeregnerHasError$ = this.store.pipe(
    distinctUntilChanged(),
    select(selectJyskeFrihedBeregnerHasError)
  );

  public JyskeFrihedBeregnerErrors$ = this.store.pipe(
    distinctUntilChanged(),
    select(selectJyskeFrihedBeregnerErrors)
  );

  public JyskeFrihedBeregnerResultat$ = this.store.pipe(
    distinctUntilChanged(),
    select(selectJyskeFrihedBeregnerResultat)
  );

  public JyskeFrihedBeregnerNoegletal$ = this.store.pipe(
    distinctUntilChanged(),
    select(selectJyskeFrihedBeregnerNoegletal)
  );

  public Dispatch(action: JyskeFrihedBeregnerDispatchableActions): void {
    this.store.dispatch(action);
  }
}
