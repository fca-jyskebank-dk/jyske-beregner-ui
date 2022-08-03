import { JyskeKurslisteAreas } from '../jyske-kursliste-ui.constants';
import { StateOfType } from '@shared/store/common';

export type JyskeKurslisteState = StateOfType<{
  behaviours: {
    area: JyskeKurslisteAreas;
    error: Error;
  };
  resultatFastRente: KurslisteData;
  resultatVariabelRente: KurslisteData;
}>;

export enum KurslisteType {
  default,
  fastrente,
}

export interface KurslisteData {
  kurslisteType: KurslisteType;
  overskrift: string;
  opdateringstidspunkt: string;
  kursDato: string;
  kursTid: string;
  infoTekst: string;
  tabelOverskrifter: string[];
  tabelRaekker: KurslisteRow[];
}

export interface KurslisteRow {
  tilbudskurs: number;
  aktuelKurs: string;
  tabelRaekke: (string | number | boolean)[];
  fkaKurser: FkaKurs[];
}

export interface FkaKurs {
  fkaRaekke: (string | number)[];
}

export interface InfoFkaModal {
  kursTid: string;
  kurslisteType: KurslisteType;
  kurslisteRow: KurslisteRow;
}
