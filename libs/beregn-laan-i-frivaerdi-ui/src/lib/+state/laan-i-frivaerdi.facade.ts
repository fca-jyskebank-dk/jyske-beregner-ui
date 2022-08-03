import { Injectable } from '@angular/core';
import { LaanIFrivaerdiDispatchableActions } from './laan-i-frivaerdi.actions';
import { select, Store } from '@ngrx/store';
import { distinctUntilChanged } from 'rxjs/operators';
import {
  selectBeregnLaanIFrivaerdi,
  selectBeregnLaanIFrivaerdiIsLoading,
  selectBeregnLaanIFrivaerdiHarBanklaan,
  selectBeregnLaanIFrivaerdiLoadDisableToggles as selectJyskeBoligberegnerLoadDisabledToggles,
  selectBeregnLaanIFrivaerdiLoadVisDetaljer,
  selectBeregnLaanIFrivaerdiLoadVisAfdragsfrihed,
  selectBeregnLaanIFrivaerdiRequest,
  selectBeregnLaanIFrivaerdiLoadMaxProvenu,
  selectBeregnLaanIFrivaerdiProcentfordeling,
  selectKontaktMigParameterGenerel,
  selectBeregnLaanIFrivaerdiMaxProvenuIsLoading,
} from './laan-i-frivaerdi.selectors';

@Injectable({
  providedIn: 'root',
})
export class LaanIFrivaerdiFacade {
  constructor(private store: Store) {}

  public LaanIFrivaerdi$ = this.store.pipe(
    distinctUntilChanged(),
    select(selectBeregnLaanIFrivaerdi)
  );

  public LaanIFrivaerdiIsLoading$ = this.store.pipe(
    distinctUntilChanged(),
    select(selectBeregnLaanIFrivaerdiIsLoading)
  );

  public LaanIFrivaerdiHarBanklaan$ = this.store.pipe(
    distinctUntilChanged(),
    select(selectBeregnLaanIFrivaerdiHarBanklaan)
  );

  public LaanIFrivaerdiDisabledToggles$ = this.store.pipe(
    distinctUntilChanged(),
    select(selectJyskeBoligberegnerLoadDisabledToggles)
  );

  public LaanIFrivaerdiVisDetaljer$ = this.store.pipe(
    distinctUntilChanged(),
    select(selectBeregnLaanIFrivaerdiLoadVisDetaljer)
  );

  public LaanIFrivaerdiVisAfdragsfrihed$ = this.store.pipe(
    distinctUntilChanged(),
    select(selectBeregnLaanIFrivaerdiLoadVisAfdragsfrihed)
  );

  public LaanIFrivaerdiRequest$ = this.store.pipe(
    distinctUntilChanged(),
    select(selectBeregnLaanIFrivaerdiRequest)
  );

  public MaxProvenu$ = this.store.pipe(
    distinctUntilChanged(),
    select(selectBeregnLaanIFrivaerdiLoadMaxProvenu)
  );

  public MaxProvenuIsLoading$ = this.store.pipe(
    distinctUntilChanged(),
    select(selectBeregnLaanIFrivaerdiMaxProvenuIsLoading)
  );


  public Procentfordeling$ = this.store.pipe(
    distinctUntilChanged(),
    select(selectBeregnLaanIFrivaerdiProcentfordeling)
  );

  public KontaktMigParametreGenerel$ = this.store.pipe(
    distinctUntilChanged(),
    select(selectKontaktMigParameterGenerel)
  );

  public dispatch(action: LaanIFrivaerdiDispatchableActions): void {
    this.store.dispatch(action);
  }


}
