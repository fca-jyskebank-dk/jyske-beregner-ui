import { Injectable } from '@angular/core';
import * as base from '@shared/environments/environment.base';

@Injectable({
  providedIn: 'root',
})
export class BeregnLaanTilKoebAfBoligService {
  public loadBeregnLaanTilKoebAfBolig() {
    const baseUrl = base.getEnvironmentGenerelJyskeBankBase(
      window.location.protocol,
      window.location.hostname
    ).apiBaseUrl;

    const specificUrl = '/bolig/regn-paa-bolig/beregn-laan-til-ny-bolig/';

    const beregnLaanTilKoebAfBoligUrl = encodeURI(
      `${window.location.protocol}${baseUrl}${specificUrl}`
    );
    window.open(beregnLaanTilKoebAfBoligUrl, '_blank');
  }
}
