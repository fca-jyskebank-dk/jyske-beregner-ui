import { Injectable } from '@angular/core';
import { SendBeregningDispatchableActions } from './send-beregning.actions';
import { select, Store } from '@ngrx/store';
import { distinctUntilChanged } from 'rxjs/operators';
import {
  selectSendBeregningHasError,
  selectSendBeregningIsLoading,
  selectSendBeregningSuccess,
} from './send-beregning.selectors';

@Injectable({
  providedIn: 'root',
})
export class SendBeregningFacade {
  constructor(private store: Store) {}

  public SendBeregningIsLoading$ = this.store.pipe(
    distinctUntilChanged(),
    select(selectSendBeregningIsLoading)
  );

  public SendBeregningSuccess$ = this.store.pipe(
    distinctUntilChanged(),
    select(selectSendBeregningSuccess)
  );

  public SendBeregningHasError$ = this.store.pipe(
    distinctUntilChanged(),
    select(selectSendBeregningHasError)
  );

  public dispatch(action: SendBeregningDispatchableActions): void {
    this.store.dispatch(action);
  }
}
