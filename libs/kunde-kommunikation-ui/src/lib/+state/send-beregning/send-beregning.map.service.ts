import { Injectable } from '@angular/core';
import { Beregningsresultat } from '@beregningsresultat-ui/finansieringsforslag/finansieringsforslag.interfaces';
import { SendBeregningRequest } from '@jyske-beregner-api/model/send-beregning-request';

@Injectable()
export class SendBeregningMapper {
  constructor() {}

  mapSendBeregningRequest(
    data: Beregningsresultat,
    email: string,
    navn: string,
    kontaktMig: boolean,
    partnerid: string,
  ): SendBeregningRequest {
    const x: SendBeregningRequest = {
      partnerId: partnerid,
      email: email,
      kundenavn: navn,
      opretLead: kontaktMig,
      serializedBeregning: data.serializedBeregning,
    };
    return x;
  }
}
