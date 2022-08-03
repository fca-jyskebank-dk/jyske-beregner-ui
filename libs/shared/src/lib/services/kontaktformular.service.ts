import { Injectable } from '@angular/core';
import * as base from '@shared/environments/environment.base';

@Injectable({
  providedIn: 'root',
})
export class KontaktformularService {
  public loadKontaktformular(parameter: KontaktFormParameter) {
    const baseUrl = base.getEnvironmentGenerelJyskeBankBase(
      window.location.protocol,
      window.location.hostname
    ).apiBaseUrl;

    const specificUrl = '/bolig/regn-paa-bolig/send-beregning-partner/';

    const params = `${parameter.variableParametre}&partnerID=${parameter.partnerId}`;

    const kontaktformularUrl = this._encodeQuestionMark(
      encodeURI(`${window.location.protocol}${baseUrl}${specificUrl}${params}`)
    );

    window.open(kontaktformularUrl, '_blank');
  }

  _encodeQuestionMark(param: string): string {
    let t = 0;
    const result = param.replace(/\?/g, (match) => (++t > 1 ? '%3F' : match));
    return result;
  }
}

export interface KontaktFormParameter {
  variableParametre: string;
  partnerId: string;
}
