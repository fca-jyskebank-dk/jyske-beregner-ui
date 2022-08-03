import { Beregningsresultat } from '@beregningsresultat-ui/finansieringsforslag/finansieringsforslag.interfaces';
import { KontaktFormParameter } from '@shared/services/kontaktformular.service';
import { StateOfType } from '@shared/store/common';

export type JyskeBoligberegnerState = StateOfType<{
  behaviours: {
    loading: boolean;
    error: Error;
    disableToggles: boolean;
    visDetaljer: boolean;
    visAfdragsfrihed: boolean;
  };
  resultat: Beregningsresultat[];
  formInput?: Beregningsgrundlag;
  kontaktMigParameterGenerel?: KontaktFormParameter;
}>;

export enum Ejendomstype {
  helaarsbolig,
  fritidsbolig,
}

export interface Kriterier {
  ejendomstype?: Ejendomstype;
  ejendomsvaerdi?: number;
}

export interface Beregningsgrundlag {
  ejendomsvaerdi?: number;
  oensketLoebetidIAar?: number;
  egenfinansiering?: number;
  foranstaaendeGaeld?: number;
  antalAfdragsfrieAar?: number;
  boligType?: string;
}
