import { Beregningsresultat as fromBeregnLaanIFrivaerdi } from '@beregningsresultat-ui/finansieringsforslag/finansieringsforslag.interfaces';
import { KontaktFormParameter } from '@shared/services/kontaktformular.service';
import { StateOfType } from '@shared/store/common';

export type LaanIFrivaerdiState = StateOfType<{
  behaviours: {
    loading: boolean;
    maxProvenuIsLoading: boolean;
    error: Error;
    disableToggles: boolean;
    visDetaljer: boolean;
    visAfdragsfrihed: boolean;
  };
  maxProvenu?: number;
  resultat: fromBeregnLaanIFrivaerdi[];
  formInput?: Beregningsgrundlag;
  procentfordeling?: Procentfordeling;
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
  laaneoenske?: number;
  foranstaaendeGaeld?: number;
  antalAfdragsfrieAar?: number;
  boligType?: string;
}

export interface Procentfordeling {
  frivaerdiPct?: number;
  nytLaanPct?: number;
  restgaeldPct?: number;
}
