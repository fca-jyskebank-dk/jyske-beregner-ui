import { Beregningsresultat } from '@beregningsresultat-ui/finansieringsforslag/finansieringsforslag.interfaces';
import { KontaktFormParameter } from '@shared/services/kontaktformular.service';
import { StateOfType } from '@shared/store/common';

export type BeregnLaanGenerelState = StateOfType<{
  behaviours: {
    loading: boolean;
    error: Error;
    disableToggles: boolean;
    visAfdragsfrihed: boolean;
  };
  resultat: Beregningsresultat[];
  kontaktMigParameterGenerel?: KontaktFormParameter;
}>;

export enum Ejendomstype {
  helaarsbolig,
  fritidsbolig,
}
