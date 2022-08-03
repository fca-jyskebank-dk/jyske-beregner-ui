import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import {
  Beregningsresultat,
  Laan,
  Laandetalje,
} from '@beregningsresultat-ui/finansieringsforslag/finansieringsforslag.interfaces';
import { BeregnFrihedRequest } from '@jyske-beregner-api/model/beregn-frihed-request';
import { Rating } from '@jyske-beregner-api/model/rating';
import { KontaktFormParameter } from '@shared/services/kontaktformular.service';
import { BoligFinansieringResponse } from '@jyske-beregner-api/model/bolig-finansiering-response';
import { LaanResponse } from '@jyske-beregner-api/model/laan-response';
import { LaanDetalje } from '@jyske-beregner-api/model/laan-detalje';
import { Beregningsgrundlag, MaxProvenuer } from './jyske-frihed.interfaces';
import { BeregnFrihedResponse } from '@jyske-beregner-api/model/beregn-frihed-response';
import { MaxProvenuFrihedRequest } from '@jyske-beregner-api/model/max-provenu-frihed-request';
import { MaxProvenuFrihedResponse } from '@jyske-beregner-api/model/max-provenu-frihed-response';

@Injectable()
export class JyskeFrihedMapper {
  constructor(public datePipe: DatePipe) {}

  mapBeregningsresultat(response: BeregnFrihedResponse): Beregningsresultat[] {
    const result: Beregningsresultat[] = [];
    response.laaneForslag.forEach((element) => {
      result.push(this._mapToBeregningsresultat(element));
    });
    return result;
  }

  private _mapToBeregningsresultat(
    element: BoligFinansieringResponse
  ): Beregningsresultat {
    const res: Beregningsresultat = {
      laanListe: this._mapToLaanListe(element.laan),
      primaertNoegletalDetalje: element.primaerHeader.detalje,
      primaertNoegletal: element.primaerHeader.noegletal,
      primaertNoegletalBeskrivelse: element.primaerHeader.noegletalBeskrivelse,
      primaertNoegletalAfdragsfri: element.primaerHeader.afdragsfri,
      sekundaertNoegletalDetalje:
        element.sekundaerHeader === null
          ? null
          : element.sekundaerHeader?.detalje,
      sekundaertNoegletal:
        element.sekundaerHeader === null
          ? null
          : element.sekundaerHeader?.noegletal,
      sekundaertNoegletalBeskrivelse:
        element.sekundaerHeader === null
          ? null
          : element.sekundaerHeader?.noegletalBeskrivelse,
      pakkenavn: this._mapProduktNavn(element.pakkenavn),
      ratings: this._mapRatings(element.ratings),
      pakkenavnKortVisning: element.pakkenavnKortVisning,
      pakkeDetalje:
        element.sekundaerHeader === null ? element.primaerHeader.detalje : null,
      serializedBeregning: element.serializedBeregning,
    };
    return res;
  }

  _mapToLaanListe(laanResponses: LaanResponse[]): Laan[] {
    const laanListe: Laan[] = [];
    laanResponses.forEach((e) => {
      laanListe.push({
        type: e.type,
        detaljer: this._mapLaanDetaljer(e.detaljer),
      });
    });

    return laanListe;
  }

  _mapLaanDetaljer(detaljer: LaanDetalje[]): Laandetalje[] {
    const result: Laandetalje[] = [];
    detaljer.forEach((detalje) => {
      result.push({ tekst: detalje.beskrivelse, vaerdi: detalje.vaerdi });
    });

    return result;
  }

  _mapProduktNavn(navn: string): string {
    const x = navn.replace('-Kort', '- Kort').replace('-Lang', '- Lang');
    return x;
  }

  _mapRatings(input: Rating[]): Laandetalje[] {
    if (input === (null || undefined)) return null;

    const elementer: Laandetalje[] = [];
    input.forEach((re) =>
      elementer.push({ tekst: re.tekst, vaerdi: re.vaerdi })
    );

    return elementer;
  }

  mapBeregnFrihedRequest(input: Beregningsgrundlag): BeregnFrihedRequest {
    return this._ejendomsvaerdiTom(input)
      ? {
          aarTilAfdragsfrihed: input.antalAarTilAfdragsfrihed,
          laaneOenske: input.laaneoenske,
        }
      : {
          aarTilAfdragsfrihed: input.antalAarTilAfdragsfrihed,
          boligVaerdi: input.ejendomsvaerdi,
          laaneOenske: input.laaneoenske,
        };
  }

  _ejendomsvaerdiTom(input: Beregningsgrundlag): boolean {
    return (
      input.ejendomsvaerdi === undefined ||
      input.ejendomsvaerdi === null ||
      input.ejendomsvaerdi === 0
    );
  }

  _mapDato(tidspunkt: string): string {
    return this.datePipe.transform(tidspunkt.substring(0, 10), 'dd-MM-yyyy');
  }

  mapMaxProvenuRequest(boligvaerdi: number): MaxProvenuFrihedRequest {
    const x: MaxProvenuFrihedRequest = {
      boligvaerdi: boligvaerdi,
    };
    return x;
  }

  mapMaxProvenuer(response: MaxProvenuFrihedResponse): MaxProvenuer {
    return {
      maxProvenuMedAfdrag: Math.round(response.provenuMedAfdrag),
      maxProvenuUdenAfdrag: Math.round(response.provenuUdenAfdrag),
    };
  }

  mapKontaktMigParameterGenerel(
    input: BeregnFrihedResponse
  ): KontaktFormParameter {
    return {
      variableParametre: input.kontaktMigParametre,
      partnerId: 'BDK021',
    };
  }
}
