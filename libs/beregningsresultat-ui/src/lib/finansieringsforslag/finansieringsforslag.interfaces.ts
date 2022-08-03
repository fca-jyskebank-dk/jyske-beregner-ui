export interface Beregningsresultat {
  pakkenavn?: string;
  pakkenavnKortVisning?: string;
  pakkeDetalje?: string;
  primaertNoegletalDetalje?: string;
  primaertNoegletal?: string;
  primaertNoegletalBeskrivelse?: string;
  primaertNoegletalAfdragsfri: boolean;
  sekundaertNoegletalDetalje?: string;
  sekundaertNoegletal?: string;
  sekundaertNoegletalBeskrivelse?: string;
  laanListe: Laan[];
  ratings?: Laandetalje[];
  serializedBeregning?: string;
}

export interface Laan {
  type: string;
  detaljer: Laandetalje[];
}

export interface Laandetalje {
  tekst?: string;
  vaerdi?: string | number;
}
