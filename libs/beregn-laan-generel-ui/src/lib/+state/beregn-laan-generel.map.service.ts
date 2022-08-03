import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import {
  Beregningsresultat,
  Laan,
  Laandetalje,
} from '@beregningsresultat-ui/finansieringsforslag/finansieringsforslag.interfaces';
import { FrivaerdiRequest } from '@jyske-beregner-api/model/frivaerdi-request';
import { KontaktFormParameter } from '@shared/services/kontaktformular.service';
import { BoligFinansieringResponse } from '@jyske-beregner-api/model/bolig-finansiering-response';
import { LaanResponse } from '@jyske-beregner-api/model/laan-response';
import { LaanDetalje } from '@jyske-beregner-api/model/laan-detalje';
import { BeregnLaanIFrivaerdiResponse } from '@jyske-beregner-api/model/beregn-laan-i-frivaerdi-response';

@Injectable()
export class BeregnLaanGenerelMapper {
  LAANEOENSKE = 500000;
  OENSKET_LOEBETID_I_AAR = 30;
  PARTNER_ID = 'BDK006';
  HELAARSBOLIG = 'Helaarsbolig';

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
      pakkenavnKortVisning: element.pakkenavnKortVisning,
      pakkeDetalje: element.sekundaerHeader === null ? element.primaerHeader.detalje : null,
      serializedBeregning: element.serializedBeregning,
    };
    return res;
  }

  mapKontaktMigParameterGenerel(
    input: BeregnLaanIFrivaerdiResponse
  ): KontaktFormParameter {
    return {
      variableParametre: input.kontaktMigParametre,
      partnerId: this.PARTNER_ID,
    };
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

  mapRequest(antalAfdragsfrieAar: number): FrivaerdiRequest {
    return {
      antalAfdragsfrieAar: antalAfdragsfrieAar,
      boligType: this.HELAARSBOLIG,
      laaneOenske: this.LAANEOENSKE,
      oensketLoebetidIAar: this.OENSKET_LOEBETID_I_AAR,
    };
  }

  _mapDato(tidspunkt: string): string {
    return this.datePipe.transform(tidspunkt.substring(0, 10), 'dd-MM-yyyy');
  }
}
