import { Injectable } from '@angular/core';
import * as base from '@shared/environments/environment.base';

@Injectable({
  providedIn: 'root',
})
export class BeregnLaanIFrivaerdiService {
  public loadBeregnLaanIFrivaerdi() {
    const baseUrl = base.getEnvironmentGenerelJyskeBankBase(
      window.location.protocol,
      window.location.hostname
    ).apiBaseUrl;

    const specificUrl = '/bolig/regn-paa-bolig/beregn-laan-i-frivaerdi/';

    const beregnLaanIFrivaerdiUrl = encodeURI(
      `${window.location.protocol}${baseUrl}${specificUrl}`
    );
    window.open(beregnLaanIFrivaerdiUrl, '_blank');
  }
}
