import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { Beregningsgrundlag } from '@jyske-boligberegner-ui/+state/jyske-boligberegner.interfaces';
import {
  Beregningsresultat,
  Laan,
  Laandetalje,
} from '@beregningsresultat-ui/finansieringsforslag/finansieringsforslag.interfaces';
import { BoligRequest } from '@jyske-beregner-api/model/bolig-request';
import { Rating } from '@jyske-beregner-api/model/rating';
import { KontaktFormParameter } from '@shared/services/kontaktformular.service';
import { BeregnAlleLaanResponse } from '@jyske-beregner-api/model/beregn-alle-laan-response';
import { BoligFinansieringResponse } from '@jyske-beregner-api/model/bolig-finansiering-response';
import { LaanResponse } from '@jyske-beregner-api/model/laan-response';
import { LaanDetalje } from '@jyske-beregner-api/model/laan-detalje';

@Injectable()
export class JyskeBoligberegnerMapper {
  constructor(
    public datePipe: DatePipe
  ) {}

  mapBeregningsresultat(
    response: BeregnAlleLaanResponse
  ): Beregningsresultat[] {
    const result: Beregningsresultat[] = [];
    response.laaneForslag.forEach((element) => {
      result.push(this._mapToBeregningsresultat(element));
    });

    return result;
  }

  mapKontaktMigParameterGenerel(input: BeregnAlleLaanResponse) : KontaktFormParameter {
    return {
      variableParametre: input.kontaktMigParametre,
      partnerId: 'BDK004',
    };
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
      sekundaertNoegletalDetalje: element.sekundaerHeader === null ? null : element.sekundaerHeader?.detalje,
      sekundaertNoegletal: element.sekundaerHeader === null ? null : element.sekundaerHeader?.noegletal,
      sekundaertNoegletalBeskrivelse: element.sekundaerHeader === null ? null : element.sekundaerHeader?.noegletalBeskrivelse,
      pakkenavn: this._mapProduktNavn(element.pakkenavn),
      ratings: this._mapRatings(element.ratings),
      pakkenavnKortVisning: element.pakkenavnKortVisning,
      pakkeDetalje: element.sekundaerHeader === null ? element.primaerHeader.detalje : null,
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

  mapRequest(input: Beregningsgrundlag): BoligRequest {
    return {
      laaneOenske: input.ejendomsvaerdi - input.egenfinansiering,
      antalAfdragsfrieAar: input.antalAfdragsfrieAar,
      boligType: input.boligType,
      boligVaerdi: input.ejendomsvaerdi,
      oensketLoebetidIAar: 30,
      udbetaling: input.egenfinansiering,
    };
  }

  _mapDato(tidspunkt: string): string {
    return this.datePipe.transform(tidspunkt.substr(0, 10), 'dd-MM-yyyy');
  }
}
