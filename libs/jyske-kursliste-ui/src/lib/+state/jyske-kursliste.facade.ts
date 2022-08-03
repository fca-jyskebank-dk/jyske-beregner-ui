import { distinctUntilChanged, first } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { JyskeKurslisteDispatchableActions } from './jyske-kursliste.actions';
import { select, Store } from '@ngrx/store';
import {
  selectJyskeKurslisteArea,
  selectJyskeKurslisteFastRente,
  selectJyskeKurslisteVariabelRente,
} from './jyske-kursliste.selectors';

@Injectable({
  providedIn: 'root',
})
export class JyskeKurslisteFacade {
  constructor(private store: Store) {}

  public get JyskeKurslisteArea() {
    let value: number;
    this.store
      .pipe(first(), select(selectJyskeKurslisteArea))
      .subscribe((area) => (value = area));
    return value;
  }

  public JyskeKurslisteFastRente$ = this.store.pipe(
    distinctUntilChanged(),
    select(selectJyskeKurslisteFastRente)
  );

  public JyskeKurslisteVariabelRente$ = this.store.pipe(
    distinctUntilChanged(),
    select(selectJyskeKurslisteVariabelRente)
  );

  public dispatch(action: JyskeKurslisteDispatchableActions): void {
    this.store.dispatch(action);
  }
}
