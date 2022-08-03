import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  JyskeFrihedBeregnerRequest,
  JyskeFrihedBeregnerResponse,
} from '../services/jyske-frihed-beregner.service.interfaces';
import {
  Error,
  JyskeFrihedBeregnerGraf,
  JyskeFrihedBeregnerNoegletal,
  JyskeFrihedBeregnerTilbagebetalingplan,
} from './jyske-frihed-beregner.interfaces';
import { CustomNumberPipe } from '@shared/pipes/custom-number.pipe';
import { CustomNumberExt } from '@shared/pipes/custom-number.ext';
import { ItemType } from '@shared/store/common';
import { JyskeFrihedBeregnerFacade } from './jyske-frihed-beregner.facade';
import { JyskeFrihedAreas } from '@jyske-frihed-beregner/jyske-frihed-beregner.constants';

@Injectable()
export class JyskeFrihedBeregnerMapService {
  constructor(
    private jyskeFrihedBeregnerFacade: JyskeFrihedBeregnerFacade,
    private customNumberPipe: CustomNumberPipe
  ) {}

  mapHovedtal(
    request: JyskeFrihedBeregnerRequest,
    response: JyskeFrihedBeregnerResponse
  ): ItemType[] {
    switch (this.jyskeFrihedBeregnerFacade.JyskeFrihedBeregnerArea) {
      case JyskeFrihedAreas.privat: {
        return this.mapHovedtalPrivat(request, response);
      }

      case JyskeFrihedAreas.erhverv: {
        return this.mapHovedtalErhverv(request, response);
      }
    }
  }

  mapHovedtalPrivat(
    request: JyskeFrihedBeregnerRequest,
    response: JyskeFrihedBeregnerResponse
  ): ItemType[] {
    let mappedResponse = [
      {
        key: ' laanNavn',
        label: 'Lån',
        value: response.laanNavn,
        showBold: true,
      },
      {
        key: 'aaopFoerSkatPct',
        label: 'ÅOP før skat',
        value: this.customNumberPipe.transform(
          response.aaopFoerSkatPct,
          CustomNumberExt.procent,
          '0.2-2'
        ),
      },
      {
        key: 'foersteAarsMaanedligeYdelseFoerSkatUdenAfdrag',
        label: 'Månedlig afdragsfri ydelse (før skat)',
        value: this.customNumberPipe.transform(
          response.foersteAarsMaanedligeYdelseFoerSkatUdenAfdrag,
          CustomNumberExt.kr
        ),
      },
      {
        key: 'foersteAarsMaanedligeYdelseFoerSkatMedAfdrag',
        label: 'Månedlig ydelse (før skat)',
        value: this.customNumberPipe.transform(
          response.foersteAarsMaanedligeYdelseFoerSkatMedAfdrag,
          CustomNumberExt.kr
        ),
      },
      {
        key: 'hovedstol',
        label: 'Hovedstol',
        value: this.customNumberPipe.transform(
          response.hovedstol,
          CustomNumberExt.kr
        ),
      },
      {
        key: 'antalAfdragsfrieAar',
        label: 'Antal afdragsfrie år',
        value: this.customNumberPipe.transform(
          response.antalAfdragsfrieAar,
          CustomNumberExt.år,
          '0.2-2'
        ),
      },
      {
        key: 'foersteAarsDebitorRentePct',
        label: `Debitorrente (${response.renteType})`,
        value: this.customNumberPipe.transform(
          response.foersteAarsDebitorRentePct,
          CustomNumberExt.procent,
          '0.2-2'
        ),
      },
      {
        key: 'foersteAarsBidragssatsPct',
        label: 'Bidragssats (variabel)',
        value: this.customNumberPipe.transform(
          response.foersteAarsBidragssatsPct,
          CustomNumberExt.procent,
          '0.2-2'
        ),
      },
      {
        key: 'aarTilUdloeb',
        label: 'Løbetid i år',
        value: this.customNumberPipe.transform(
          response.aarTilUdloeb,
          CustomNumberExt.år,
          '0.2-2'
        ),
      },
      {
        key: 'antalBetalingsterminer',
        label: 'Antal ydelser (kvartalsvis)',
        value: this.customNumberPipe.transform(
          response.antalBetalingsterminer,
          CustomNumberExt.blank
        ),
      },
      {
        key: 'udbetalingskurs',
        label: `Kurs`,
        value: this.customNumberPipe.transform(
          response.udbetalingskurs,
          CustomNumberExt.blank,
          '0.3-3'
        ),
      },
      {
        key: 'totalTilbagebetaling',
        label: 'Samlet tilbagebetaling',
        value: this.customNumberPipe.transform(
          response.totalTilbagebetaling,
          CustomNumberExt.kr
        ),
      },
      {
        key: 'tinglysningAfgift',
        label: 'Tinglysningsafgift',
        value: this.customNumberPipe.transform(
          response.tinglysningAfgift,
          CustomNumberExt.kr
        ),
      },
      {
        key: 'kurtage',
        label: 'Afregningsprovision',
        value: this.customNumberPipe.transform(
          response.kurtage,
          CustomNumberExt.kr
        ),
      },
      {
        key: 'bevillingOmkostninger',
        label: 'Bevillingsomkostninger',
        value: this.customNumberPipe.transform(
          response.bevillingOmkostninger,
          CustomNumberExt.kr
        ),
      },
      {
        key: 'stiftelseProvision',
        label: 'Stiftelsesprovision',
        value: this.customNumberPipe.transform(
          response.stiftelseProvision,
          CustomNumberExt.kr
        ),
      },
      {
        key: 'udbetaltBeloeb',
        label: 'Udbetalt beløb - samlet kreditbeløb',
        value: this.customNumberPipe.transform(
          response.udbetaltBeloeb,
          CustomNumberExt.kr
        ),
      },
      {
        key: 'samledeKreditomkostninger',
        label: 'Samlet kreditomkostninger',
        value: this.customNumberPipe.transform(
          response.samledeKreditomkostninger,
          CustomNumberExt.kr
        ),
      },
      {
        key: 'totalRenterOgBidrag',
        label: 'Samlet renter og bidrag',
        value: this.customNumberPipe.transform(
          response.totalRenterOgBidrag,
          CustomNumberExt.kr
        ),
      },
      {
        key: 'kursskaering',
        label: 'Kurstillæg/kursfradrag v. udbetaling',
        value: this.customNumberPipe.transform(
          response.kursskaering,
          CustomNumberExt.kr
        ),
      },
      {
        key: 'kreditor',
        label: 'Kreditor',
        value: response.kreditor,
      },
      {
        key: 'kursskaeringSatsVedRentetilpasningPct',
        label: 'Kurstillæg/kursfradrag ved rentetilpasning',
        value: this.customNumberPipe.transform(
          response.kursskaeringSatsVedRentetilpasningPct,
          CustomNumberExt.blank,
          '0.2-2'
        ),
      },
    ];
    if (request.antalAarTilAfdragsfrihed === 0) {
      mappedResponse = mappedResponse.filter(
        (f) => f.key !== 'foersteAarsMaanedligeYdelseFoerSkatMedAfdrag'
      );
    }

    if (request.fastrenteperiode === 30) {
      mappedResponse = mappedResponse.filter(
        (f) => f.key !== 'kursskaeringSatsVedRentetilpasningPct'
      );
    }

    if (request.fastrenteperiode !== 30) {
      mappedResponse = mappedResponse.filter((f) => f.key !== 'renteTypeTekst');
    }

    return mappedResponse;
  }

  mapHovedtalErhverv(
    request: JyskeFrihedBeregnerRequest,
    response: JyskeFrihedBeregnerResponse
  ): ItemType[] {
    let mappedResponse = [
      {
        key: ' resultat',
        label: 'Resultat – lån i Jyske Realkredit',
        value: null,
        showBold: true,
      },
      {
        key: 'hovedstol',
        label: 'Hovedstol',
        value: this.customNumberPipe.transform(
          response.hovedstol,
          CustomNumberExt.kr
        ),
      },
      {
        key: 'udbetaltBeloeb',
        label: 'Udbetalt beløb - samlet kreditbeløb',
        value: this.customNumberPipe.transform(
          response.udbetaltBeloeb,
          CustomNumberExt.kr
        ),
      },
      {
        key: 'foersteAarsMaanedligeYdelseFoerSkatUdenAfdrag',
        label: 'Månedlig afdragsfri ydelse (før skat)',
        value: this.customNumberPipe.transform(
          response.foersteAarsMaanedligeYdelseFoerSkatUdenAfdrag,
          CustomNumberExt.kr
        ),
      },
      {
        key: 'foersteAarsMaanedligeYdelseFoerSkatMedAfdrag',
        label: 'Månedlig ydelse (før skat)',
        value: this.customNumberPipe.transform(
          response.foersteAarsMaanedligeYdelseFoerSkatMedAfdrag,
          CustomNumberExt.kr
        ),
      },
      {
        key: 'foersteAarsDebitorRentePct',
        label: `Debitorrente (${response.renteType})`,
        value: this.customNumberPipe.transform(
          response.foersteAarsObligationsRentePct,
          CustomNumberExt.procent,
          '0.2-2'
        ),
      },
      {
        key: 'aaopFoerSkatPct',
        label: 'ÅOP før skat',
        value: this.customNumberPipe.transform(
          response.aaopFoerSkatPct,
          CustomNumberExt.procent,
          '0.2-2'
        ),
      },
      {
        key: 'samledeKreditomkostninger',
        label: 'Samlet kreditomkostninger',
        value: this.customNumberPipe.transform(
          response.samledeKreditomkostninger,
          CustomNumberExt.kr
        ),
      },
      {
        key: 'totalRenterOgBidrag',
        label: 'Samlet renter og bidrag',
        value: this.customNumberPipe.transform(
          response.totalRenterOgBidrag,
          CustomNumberExt.kr
        ),
      },
      {
        key: null,
        label: null,
        value: null,
      },
      {
        key: 'stiftelseProvision',
        label: 'Stiftelsesprovision',
        value: this.customNumberPipe.transform(
          response.stiftelseProvision,
          CustomNumberExt.kr
        ),
      },
      {
        key: 'kurtage',
        label: 'Afregningsprovision',
        value: this.customNumberPipe.transform(
          response.kurtage,
          CustomNumberExt.kr
        ),
      },
      {
        key: 'laanOptagelse',
        label: 'Lånoptagelse',
        value: this.customNumberPipe.transform(
          response.bevillingOmkostninger,
          CustomNumberExt.kr
        ),
      },
      {
        key: 'ekspeditionsomkostninger',
        label: 'Ekspeditionsomkostninger',
        value: this.customNumberPipe.transform(
          response.tinglysningService,
          CustomNumberExt.kr
        ),
      },
      {
        key: 'tinglysningAfgift',
        label: 'Tinglysningsafgift',
        value: this.customNumberPipe.transform(
          response.tinglysningAfgift,
          CustomNumberExt.kr
        ),
      },
      {
        key: 'kursskaering',
        label: 'Kurstillæg/kursfradrag v. udbetaling',
        value: this.customNumberPipe.transform(
          response.kursskaering,
          CustomNumberExt.kr
        ),
      },
      {
        key: null,
        label: null,
        value: null,
      },
      {
        key: 'aarTilUdloeb',
        label: 'Løbetid i år',
        value: this.customNumberPipe.transform(
          response.aarTilUdloeb,
          CustomNumberExt.år,
          '0.2-2'
        ),
      },
      {
        key: 'antalAfdragsfrieAar',
        label: 'Antal afdragsfrie år',
        value: this.customNumberPipe.transform(
          response.antalAfdragsfrieAar,
          CustomNumberExt.år,
          '0.2-2'
        ),
      },
      {
        key: 'udbetalingskurs',
        label: 'Kurs',
        value: this.customNumberPipe.transform(
          response.udbetalingskurs,
          CustomNumberExt.blank,
          '0.3-3'
        ),
      },
      {
        key: 'antalBetalingsterminer',
        label: 'Antal ydelser (kvartalsvis)',
        value: this.customNumberPipe.transform(
          response.antalBetalingsterminer,
          CustomNumberExt.blank
        ),
      },
      {
        key: 'foersteAarsBidragssatsPct',
        label: 'Bidragssats % (variabel)',
        value: this.customNumberPipe.transform(
          response.foersteAarsBidragssatsPct,
          CustomNumberExt.procent,
          '0.2-2'
        ),
      },
      {
        key: 'kreditor',
        label: 'Kreditor',
        value: response.kreditor,
      },
      {
        key: null,
        label: null,
        value: null,
      },
      {
        key: 'obligationsrentePct',
        label: 'Obligationsrente %',
        value: this.customNumberPipe.transform(
          response.foersteAarsObligationsRentePct,
          CustomNumberExt.procent,
          '0.2-2'
        ),
      },
      {
        key: 'obligationsnavn',
        label: 'Obligationsnavn',
        value: response.obligationNavn,
      },
      {
        key: 'AnvendtSkatteprocentPct',
        label: 'Anvendt skatteprocent',
        value: this.customNumberPipe.transform(
          response.anvendtSkatteSatsPct,
          CustomNumberExt.procent,
          '0.2-2'
        ),
      },
    ];
    if (request.antalAarTilAfdragsfrihed === 0) {
      mappedResponse = mappedResponse.filter(
        (f) => f.key !== 'foersteAarsMaanedligeYdelseFoerSkatMedAfdrag'
      );
    }

    if (request.fastrenteperiode !== 30) {
      mappedResponse = mappedResponse.filter((f) => f.key !== 'renteTypeTekst');
    }

    return mappedResponse;
  }

  mapNoegletal(
    request: JyskeFrihedBeregnerRequest,
    response: JyskeFrihedBeregnerResponse
  ): JyskeFrihedBeregnerNoegletal {
    switch (this.jyskeFrihedBeregnerFacade.JyskeFrihedBeregnerArea) {
      case JyskeFrihedAreas.privat: {
        return this.mapNoegletalPrivate(request, response);
      }

      case JyskeFrihedAreas.erhverv: {
        return this.mapNoegletalErhverv(request, response);
      }
    }
  }

  mapNoegletalPrivate(
    request: JyskeFrihedBeregnerRequest,
    response: JyskeFrihedBeregnerResponse
  ): JyskeFrihedBeregnerNoegletal {
    return {
      ydelseFoerSkatMedAfdrag: this.customNumberPipe.transform(
        response.foersteAarsMaanedligeYdelseFoerSkatMedAfdrag,
        CustomNumberExt.kr
      ),
      ydelseFoerSkatUdenAfdrag: this.customNumberPipe.transform(
        response.foersteAarsMaanedligeYdelseFoerSkatUdenAfdrag,
        CustomNumberExt.kr
      ),
      renteType: response.renteType,
      antalAarTilAfdragsfrihedStart: request.antalAarTilAfdragsfrihed,
      visYdelseEfterSkatMedAfdrag: request.antalAarTilAfdragsfrihed !== 0,
    };
  }

  mapNoegletalErhverv(
    request: JyskeFrihedBeregnerRequest,
    response: JyskeFrihedBeregnerResponse
  ): JyskeFrihedBeregnerNoegletal {
    return {
      ydelseFoerSkatMedAfdrag: this.customNumberPipe.transform(
        response.foersteAarsYdelseFoerSkatMedAfdrag,
        CustomNumberExt.kr
      ),
      ydelseFoerSkatUdenAfdrag: this.customNumberPipe.transform(
        response.foersteAarsYdelseFoerSkatUdenAfdrag,
        CustomNumberExt.kr
      ),
      renteType: response.renteType,
      antalAarTilAfdragsfrihedStart: request.antalAarTilAfdragsfrihed,
      visYdelseEfterSkatMedAfdrag: request.antalAarTilAfdragsfrihed !== 0,
    };
  }

  mapGrafData(repsonse: JyskeFrihedBeregnerResponse): JyskeFrihedBeregnerGraf {
    return {
      labels: repsonse.tilbagebetalingsplan.map((a) => a.betalingsdato),
      data: repsonse.tilbagebetalingsplan.map((a) => a.restgaeld),
    };
  }

  mapBetalingsplan(
    response: JyskeFrihedBeregnerResponse
  ): JyskeFrihedBeregnerTilbagebetalingplan {
    return {
      data: response.tilbagebetalingsplan.map((a) => {
        return {
          betalingsaar: a.betalingsaar,
          betalingsdato: a.betalingsdato,
          ydelseFoerSkat: this.customNumberPipe.transform(
            a.ydelseFoerSkat,
            CustomNumberExt.blank
          ),
          ydelseEfterSkat: this.customNumberPipe.transform(
            a.ydelseEfterSkat,
            CustomNumberExt.blank
          ),
          afdrag: this.customNumberPipe.transform(
            a.afdrag,
            CustomNumberExt.blank
          ),
          rente: this.customNumberPipe.transform(
            a.rente,
            CustomNumberExt.blank
          ),
          bidrag: this.customNumberPipe.transform(
            a.bidrag,
            CustomNumberExt.blank
          ),
          restgaeld: this.customNumberPipe.transform(
            a.restgaeld,
            CustomNumberExt.blank
          ),
        };
      }),
    };
  }

  mapErrors(err: HttpErrorResponse): Error {
    const error: Error = {
      status: err.error?.status,
      statusText: '',
      errors: {
        boligvaerdi:
          err.error?.errors?.Boligvaerdi !== undefined
            ? err.error?.errors?.Boligvaerdi[0]
            : undefined,
        restgaeldVedUdloeb:
          err.error?.errors?.RestgaeldVedUdloeb !== undefined
            ? err.error?.errors?.RestgaeldVedUdloeb[0]
            : undefined,
        samletLaaneBeloeb:
          err.error?.errors?.SamletLaaneBeloeb !== undefined
            ? err.error?.errors?.SamletLaaneBeloeb[0]
            : undefined,
      },
    };

    return error;
  }

  formatDate(date): string {
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 101).toString().substring(1);
    const day = (date.getDate() + 100).toString().substring(1);
    return year + '-' + month + '-' + day;
  }
}
