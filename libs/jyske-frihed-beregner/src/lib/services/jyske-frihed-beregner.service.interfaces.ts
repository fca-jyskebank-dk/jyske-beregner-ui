export interface JyskeFrihedBeregnerRequest {
  boligvaerdi: number;
  oensketProvenu: number;
  eksisterendeBoliggaeld: number;
  restgaeldVedUdloeb: number;
  antalAarTilAfdragsfrihed: number;
  loebetidIAar: number;
  // udbetalingsdato: string;
  fastrenteperiode: number;
}

export interface JyskeFrihedBeregnerResponse {
  aaopFoerSkat: number;
  aaopFoerSkatPct: number;
  aarTilUdloeb: number;
  antalBetalingsterminer: number;
  antalAfdragsfrieAar: number;
  anvendtSkatteSats: number;
  anvendtSkatteSatsPct: number;
  bevillingOmkostninger: number;
  fastrentePeriode: number;
  foersteAarsBidragssats: number;
  foersteAarsBidragssatsPct: number;
  foersteAarsDebitorRente: number;
  foersteAarsDebitorRentePct: number;
  foersteAarsMaanedligeYdelseFoerSkatMedAfdrag: number;
  foersteAarsMaanedligeYdelseEfterSkatMedAfdrag: number;
  foersteAarsMaanedligeYdelseFoerSkatUdenAfdrag: number;
  foersteAarsMaanedligeYdelseEfterSkatUdenAfdrag: number;
  foersteAarsObligationsRente: number;
  foersteAarsObligationsRentePct: number;
  foersteAarsYdelseFoerSkatMedAfdrag: number;
  foersteAarsYdelseEfterSkatMedAfdrag: number;
  foersteAarsYdelseFoerSkatUdenAfdrag: number;
  foersteAarsYdelseEfterSkatUdenAfdrag: number;
  hovedstol: number;
  kreditor: string;
  kursskaering: number;
  kursskaeringSatsVedRentetilpasning: number;
  kursskaeringSatsVedRentetilpasningPct: number;
  kursvaerdi: number;
  kurtage: number;
  laanNavn: string;
  obligationNavn: string;
  renteType: string;
  samledeKreditomkostninger: number;
  stiftelseProvision: number;
  tinglysningAfgift: number;
  tinglysningService: number;
  totalRenterOgBidrag: number;
  totalTilbagebetaling: number;
  udbetalingsdato: string;
  udbetalingskurs: number;
  udbetaltBeloeb: number;
  tilbagebetalingsplan: Tilbagebetalingsplan[];
}

export interface Tilbagebetalingsplan {
  betalingsaar: string;
  betalingsdato: string;
  ydelseFoerSkat: number;
  ydelseEfterSkat: number;
  afdrag: number;
  rente: number;
  bidrag: number;
  restgaeld: number;
}
