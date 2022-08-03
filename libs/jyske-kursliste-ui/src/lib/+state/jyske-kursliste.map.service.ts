import { CustomNumberExt } from '@shared/pipes/custom-number.ext';
import { CustomNumberPipe } from '@shared/pipes/custom-number.pipe';
import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import {
  KurslisteData,
  KurslisteRow,
  KurslisteType,
} from '@jyske-kursliste-ui/+state/jyske-kursliste.interfaces';
import {
  FastRenteProdukt,
  KurslisteResponse,
  UdbetalingsKurs,
  VaegtetUdbetalingsKurs,
  VariabelRenteProdukt,
} from '@jyske-beregner-api/model/models';

@Injectable()
export class JyskeKurslisteMapper {
  constructor(
    public datePipe: DatePipe,
    public customNumberPipe: CustomNumberPipe
  ) {}

  mapFastRenteKursliste(kursliste: KurslisteResponse): KurslisteData {
    return {
      opdateringstidspunkt: this._mapDato(kursliste.opdateringstidspunkt),
      kursDato: this._mapDato(kursliste.opdateringstidspunkt),
      kursTid: this._mapTid(kursliste.opdateringstidspunkt),
      tabelRaekker: this._mapFastRenteTabel(kursliste.fastRenteProdukter),
      infoTekst: '',
      kurslisteType: KurslisteType.fastrente,
      overskrift: 'Jyske Fast Rente',
      tabelOverskrifter: [
        'Løbetid',
        'Rente',
        'Afdrags<wbr/>frihed*',
        'Aktuel kurs',
        'Tilbudskurs',
      ],
    };
  }

  _mapFastRenteTabel(fastrente: FastRenteProdukt[]): KurslisteRow[] {
    const raekker = [];
    fastrente.forEach((element) => {
      raekker.push(this._mapFastRenteRaekkeMedFkaKurser(element));
    });
    return raekker;
  }

  _mapFastRenteRaekkeMedFkaKurser(i: FastRenteProdukt): KurslisteRow {
    const fkaKurser = [];
    i.fastkursAftaleKurser.forEach((element) => {
      fkaKurser.push(this._mapFastRenteFkaKurser(element));
    });
    return {
      tilbudskurs: i.tilbudsKurs,
      aktuelKurs: this.customNumberPipe.transform(
        i.aktuelKurs,
        CustomNumberExt.blank,
        '0.2-2'
      ),
      tabelRaekke: this._mapFastRenteRaekke(i),
      fkaKurser: fkaKurser,
    };
  }
  _mapFastRenteRaekke(i: FastRenteProdukt): (string | number | boolean)[] {
    const loebetid = this.customNumberPipe.transform(
      i.loebetidAar,
      CustomNumberExt.aar
    );
    const kurs = this.customNumberPipe.transform(
      i.tilbudsKurs,
      CustomNumberExt.blank,
      '0.2-2'
    );
    const aaben = i.aabenForTilbud;
    const afdragsfrihed = this.customNumberPipe.transform(
      i.maxAntalAfdragsfrieAar,
      CustomNumberExt.aar
    );
    const rente = this.customNumberPipe.transform(
      i.kuponrenteProcent,
      CustomNumberExt.procent,
      i.kuponrenteProcent === 0 ? '' : '0.1-1'
    );
    const aktuelKurs = this.customNumberPipe.transform(
      i.aktuelKurs,
      CustomNumberExt.blank,
      '0.2-2'
    );
    const isin = i.isin;
    return [loebetid, rente, afdragsfrihed, kurs, aaben, aktuelKurs, isin];
  }

  _mapFastRenteFkaKurser(i: UdbetalingsKurs): (string | number)[] {
    const fkaDato = this._mapDato(i.dato);
    const kurs = this.customNumberPipe.transform(
      i.kurs,
      CustomNumberExt.blank,
      '0.2-2'
    );
    return [fkaDato, kurs];
  }

  mapVariabelRenteKursliste(kursliste: KurslisteResponse): KurslisteData {
    return {
      opdateringstidspunkt: this._mapDato(kursliste.opdateringstidspunkt),
      kursDato: this._mapDato(kursliste.opdateringstidspunkt),
      kursTid: this._mapTid(kursliste.opdateringstidspunkt),
      tabelRaekker: this._mapVariabelRenteTabel(
        kursliste.variabelRenteProdukter
      ),
      infoTekst: '',
      kurslisteType: KurslisteType.default,
      overskrift: 'Jyske Rentetilpasning',
      tabelOverskrifter: [
        'Fastrenteperiode',
        'Afdragsfrihed*',
        'Tilbud kontantlånsrente',
      ],
    };
  }

  _mapVariableRenteFkaRenter(i: VaegtetUdbetalingsKurs): (string | number)[] {
    const fkaDato = this._mapDato(i.dato);
    const rente = this.customNumberPipe.transform(
      i.renteProcent,
      CustomNumberExt.procent,
      '0.3-3'
    );
    return [fkaDato, rente];
  }

  _mapVariabelRenteTabel(fastrente: VariabelRenteProdukt[]): KurslisteRow[] {
    const raekker = [];
    fastrente.forEach((element) => {
      raekker.push(this._mapVariabelRenteRaekke(element));
    });
    return raekker;
  }

  _mapVariabelRenteRaekke(i: VariabelRenteProdukt): KurslisteRow {
    const loebetid = this.customNumberPipe.transform(
      i.fastrenteperiode,
      CustomNumberExt.aarig
    );
    const afdragsfrihed = this._mapVariabelRenteAfdragsfrihed(
      i.maxAntalAfdragsfrieAar
    );
    const rente = this.customNumberPipe.transform(
      i.vaegtetTilbudskursProcent,
      CustomNumberExt.procent,
      '0.3-3'
    );
    const fkaRenter = [];
    i.vaegtetUdbetalingskurser.forEach((element) => {
      fkaRenter.push(this._mapVariableRenteFkaRenter(element));
    });
    return {
      tilbudskurs: undefined,
      aktuelKurs: undefined,
      tabelRaekke: [loebetid, afdragsfrihed, rente],
      fkaKurser: fkaRenter,
    };
  }

  _mapVariabelRenteAfdragsfrihed(afdragsfriAar: unknown[]) {
    return `${afdragsfriAar.reduce(
      (total, value) => (total += ' - ' + value)
    )} år`;
  }

  _mapDato(tidspunkt: string): string {
    return this.datePipe.transform(tidspunkt.substr(0, 10), 'dd-MM-yyyy');
  }

  _mapDatoTid(tidspunkt: string): string {
    return this.datePipe.transform(tidspunkt.substr(0, 17), 'dd-MM-yyyy HH:mm');
  }

  _mapTid(tidspunkt: string): string {
    return tidspunkt.substr(11, 5);
  }
}
