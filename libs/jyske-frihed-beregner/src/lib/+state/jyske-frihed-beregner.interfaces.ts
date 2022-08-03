import { JyskeFrihedAreas, JyskeFrihedAreaTypes } from '@jyske-frihed-beregner/jyske-frihed-beregner.constants';
import { ItemType, StateOfType } from '@shared/store/common';

export type JyskeFrihedBeregnerState = StateOfType<{
  behaviours: {
    area: JyskeFrihedAreas;
    areaType: JyskeFrihedAreaTypes;
    error: Error;
  };
  resultat: JyskeFrihedBeregnerResultat;
}>;

export interface JyskeFrihedBeregnerResultat {
  hovedtal: ItemType[];
  noegletal: JyskeFrihedBeregnerNoegletal;
  tilbagebetalingsplan: JyskeFrihedBeregnerTilbagebetalingplan;
  grafData: JyskeFrihedBeregnerGraf;
}

export interface JyskeFrihedBeregnerNoegletal {
  ydelseFoerSkatMedAfdrag: string;
  ydelseFoerSkatUdenAfdrag: string;
  renteType: string;
  antalAarTilAfdragsfrihedStart: number;
  visYdelseEfterSkatMedAfdrag: boolean;
}

export interface JyskeFrihedBeregnerTilbagebetalingplan {
  data: JyskeFrihedBeregnerTilbagebetalingItem[];
}

export interface JyskeFrihedBeregnerTilbagebetalingItem {
  betalingsaar: string;
  betalingsdato: string;
  ydelseFoerSkat: string;
  ydelseEfterSkat: string;
  afdrag: string;
  rente: string;
  bidrag: string;
  restgaeld: string;
}

export interface JyskeFrihedBeregnerGraf {
  labels: string[];
  data: number[];
}

export interface Error {
  status: number;
  statusText: string;
  errors: {
    boligvaerdi?: string;
    restgaeldVedUdloeb: string;
    samletLaaneBeloeb: string;
  };
}
