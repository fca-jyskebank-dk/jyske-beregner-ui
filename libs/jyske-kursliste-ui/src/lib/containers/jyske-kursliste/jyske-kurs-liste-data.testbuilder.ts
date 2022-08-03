import {
  FkaKurs,
  InfoFkaModal,
  KurslisteData,
  KurslisteRow,
  KurslisteType,
} from '@jyske-kursliste-ui/jyske-kursliste.interface';

export class JyskeKurslisteDataTestBuilder {
  private kurslisteType = KurslisteType.default;
  private overskrift = 'Overskrift';
  private opdateringstidspunkt = '2021-01-01 12:00';
  private kursDato = '2021-01-01';
  private kursTid = '07:00';
  private infoTekst = 'Info tekst';
  private tabelOverskrifter = [];
  private tabelRaekker: KurslisteRow[] = [];

  build(): KurslisteData {
    const kurslisteData: KurslisteData = {
      kurslisteType: this.kurslisteType,
      overskrift: this.overskrift,
      opdateringstidspunkt: this.opdateringstidspunkt,
      kursDato: this.kursDato,
      kursTid: this.kursTid,
      infoTekst: this.infoTekst,
      tabelOverskrifter: this.tabelOverskrifter,
      tabelRaekker: this.tabelRaekker,
    };
    return kurslisteData;
  }

  withKurslisteType(value: KurslisteType) {
    this.kurslisteType = value;
    return this;
  }

  withOverskrift(value: string) {
    this.overskrift = value;
    return this;
  }

  withOpdateringstidspunkt(value: string) {
    this.opdateringstidspunkt = value;
    return this;
  }

  withKursDato(value: string) {
    this.kursDato = value;
    return this;
  }

  withKursTid(value: string) {
    this.kursTid = value;
    return this;
  }

  withInfoTekst(value: string) {
    this.infoTekst = value;
    return this;
  }

  withTabelOverskrifter(value: string[]) {
    this.tabelOverskrifter = value;
    return this;
  }

  withTabelRaekker(value: KurslisteRow[]) {
    this.tabelRaekker = value;
    return this;
  }

  withTabelRaekke(value: KurslisteRow) {
    this.tabelRaekker.push(value);
    return this;
  }
}
export class JyskeKurslisteRaekkeDataTestBuilder {
  private aktuelKurs = '';
  private tabelRaekke: (string | number | boolean)[] = [null];
  private fkaKurser: FkaKurs[] = [];

  build(): KurslisteRow {
    const kurslisteRow: KurslisteRow = {
      aktuelKurs: this.aktuelKurs,
      fkaKurser: this.fkaKurser,
      tabelRaekke: this.tabelRaekke,
    };
    return kurslisteRow;
  }

  withAktuelKurs(value: string) {
    this.aktuelKurs = value;
    return this;
  }

  withFkaKurser(value: FkaKurs[]) {
    this.fkaKurser = value;
    return this;
  }

  withFkaKurs(value: FkaKurs) {
    this.fkaKurser.push(value);
    return this;
  }

  withKurslisteRaekke(value: (string | boolean | number)[]) {
    this.tabelRaekke = value;
    return this;
  }
}

export class FkaKursDataTestBuilder {
  fkaKurser: (string | number)[];

  build(): FkaKurs {
    const fkaKurs: FkaKurs = { fkaRaekke: this.fkaKurser };
    return fkaKurs;
  }

  withFkaKurs(value: (string | number)[]) {
    this.fkaKurser = value;
    return this;
  }
}

export class InfoFkaModalDataTestBuilder {
  private kursTid: string;
  private kurslisteType: KurslisteType = KurslisteType.fastrente;
  private kurslisteRow: KurslisteRow;

  build(): InfoFkaModal {
    const infoFkaModal: InfoFkaModal = {
      kursTid: this.kursTid,
      kurslisteType: this.kurslisteType,
      kurslisteRow: this.kurslisteRow,
    };
    return infoFkaModal;
  }

  withKursTid(value: string) {
    this.kursTid = value;
    return this;
  }

  withKurslisteType(value: KurslisteType) {
    this.kurslisteType = value;
    return this;
  }

  withKurslisteRow(value: KurslisteRow) {
    this.kurslisteRow = value;
    return this;
  }
}
