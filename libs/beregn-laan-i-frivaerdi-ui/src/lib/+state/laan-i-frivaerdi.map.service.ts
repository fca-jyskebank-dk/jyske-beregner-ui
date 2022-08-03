import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import {
  Beregningsresultat,
  Laan,
  Laandetalje,
} from '@beregningsresultat-ui/finansieringsforslag/finansieringsforslag.interfaces';
import { FrivaerdiRequest } from '@jyske-beregner-api/model/frivaerdi-request';
import { Rating } from '@jyske-beregner-api/model/rating';
import { KontaktFormParameter } from '@shared/services/kontaktformular.service';
import { BoligFinansieringResponse } from '@jyske-beregner-api/model/bolig-finansiering-response';
import { LaanResponse } from '@jyske-beregner-api/model/laan-response';
import { LaanDetalje } from '@jyske-beregner-api/model/laan-detalje';
import {
  Beregningsgrundlag,
  Procentfordeling,
} from './laan-i-frivaerdi.interfaces';
import { MaxProvenueRequest } from '@jyske-beregner-api/model/max-provenue-request';
import { MaxProvenueResponse } from '@jyske-beregner-api/model/max-provenue-response';
import { BeregnLaanIFrivaerdiResponse } from '@jyske-beregner-api/model/beregn-laan-i-frivaerdi-response';
import { LaanIFrivaerdiFormData } from '@beregn-laan-i-frivaerdi-ui/presentational/laan-i-frivaerdi-input/laan-i-frivaerdi-input.interfaces';

@Injectable()
export class LaanIFrivaerdiMapper {
  constructor(public datePipe: DatePipe) {}

  mapBeregningsresultat(
    response: BeregnLaanIFrivaerdiResponse
  ): Beregningsresultat[] {
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

  mapRequest(input: Beregningsgrundlag): FrivaerdiRequest {
    return {
      antalAfdragsfrieAar: input.antalAfdragsfrieAar,
      boligType: input.boligType,
      boligVaerdi: input.ejendomsvaerdi,
      foranstaaendeGaeld: input.foranstaaendeGaeld,
      laaneOenske: input.laaneoenske,
      oensketLoebetidIAar: input.oensketLoebetidIAar,
    };
  }

  _mapDato(tidspunkt: string): string {
    return this.datePipe.transform(tidspunkt.substring(0, 10), 'dd-MM-yyyy');
  }

  mapProcentfordelinger(input: BeregnLaanIFrivaerdiResponse): Procentfordeling {
    return {
      frivaerdiPct: input.frivaerdiProcent,
      nytLaanPct: input.nytLaanProcent,
      restgaeldPct: input.restgaeldProcent,
    };
  }

  mapMaxProvenuRequest(input: LaanIFrivaerdiFormData): MaxProvenueRequest {
    const x = {
      foranstaaendeGaeld: input.restgaeld,
      boligType: input.boligtype,
      boligvaerdi: input.boligVaerdi,
      oensketLoebetidIAar: input.oensketLoebetidIAar,
    };
    return x;
  }

  mapMaxProvenu(response: MaxProvenueResponse): number {
    return Math.round(response.provenue);
  }

  mapKontaktMigParameterGenerel(input: BeregnLaanIFrivaerdiResponse) : KontaktFormParameter {
    return {
      variableParametre: input.kontaktMigParametre,
      partnerId: 'BDK005',
    };
  }
}
