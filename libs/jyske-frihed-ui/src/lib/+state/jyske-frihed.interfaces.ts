import { Beregningsresultat } from '@beregningsresultat-ui/finansieringsforslag/finansieringsforslag.interfaces';
import { KontaktFormParameter } from '@shared/services/kontaktformular.service';
import { StateOfType } from '@shared/store/common';

export type JyskeFrihedState = StateOfType<{
  behaviours: {
    loading: boolean;
    error: Error;
    disableToggles: boolean;
    visDetaljer: boolean;
    maxProvenuLoading:boolean;
  };
  maxProvenuer: MaxProvenuer;
  ejendomsvaerdi: number;
  resultat: Beregningsresultat[];
  formInput?: Beregningsgrundlag;
  kontaktMigParameterGenerel?: KontaktFormParameter;
}>;

export interface Beregningsgrundlag {
  ejendomsvaerdi?: number;
  laaneoenske?: number;
  antalAarTilAfdragsfrihed?: number;
}

export interface MaxProvenuer {
  maxProvenuMedAfdrag: number;
  maxProvenuUdenAfdrag: number;
}
