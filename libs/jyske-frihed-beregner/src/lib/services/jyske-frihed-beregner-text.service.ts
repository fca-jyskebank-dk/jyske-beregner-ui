import { Injectable } from '@angular/core';
import { JyskeFrihedBeregnerFacade } from '@jyske-frihed-beregner/+state/jyske-frihed-beregner.facade';
import { JyskeFrihedAreas } from '@jyske-frihed-beregner/jyske-frihed-beregner.constants';
import {
  JyskeFrihedBeregnerCtaText,
  JyskeFrihedBeregnerFormText,
  JyskeFrihedBeregnerNoegletalText,
} from './jyske-frihed-beregner-text.service.interface';

@Injectable()
export class JyskeFrihedBeregnerTextService {
  constructor(private jyskeFrihedBeregnerFacade: JyskeFrihedBeregnerFacade) {}

  public get getJyskeFrihedBeregnerFormText(): JyskeFrihedBeregnerFormText {
    switch (this.jyskeFrihedBeregnerFacade.JyskeFrihedBeregnerArea) {
      case JyskeFrihedAreas.privat: {
        return {
          overskrift: 'Regn på din frihed',
          boligvaerdi: {
            label: 'Boligværdi',
            required: 'Feltet skal være udfyldt',
            min: 'Boligværdien skal mindst være 1.500.000 kr.',
          },
          eksisterendeBoliggaeld: {
            label: 'Samlet låneønske',
          },
          afdragsfrihed: {
            label: 'Afdragsfrihed',
          },
          fastrenteperiode: {
            label: 'Bind renten',
          },
        };
      }
      case JyskeFrihedAreas.erhverv: {
        return {
          overskrift: 'Regn på Jyske Frihed',
          boligvaerdi: {
            label: 'Ejendomsværdi',
            required: 'Feltet skal være udfyldt',
            min: 'Ejendomsværdien skal mindst være 1.500.000 kr.',
          },
          eksisterendeBoliggaeld: {
            label: 'Samlet låneønske',
          },
          afdragsfrihed: {
            label: 'Afdragsfrihed',
          },
          fastrenteperiode: {
            label: 'Renten er fast i',
          },
        };
      }
    }
  }

  public get getJyskeFrihedBeregnerNoegletalText(): JyskeFrihedBeregnerNoegletalText {
    switch (this.jyskeFrihedBeregnerFacade.JyskeFrihedBeregnerArea) {
      case JyskeFrihedAreas.privat: {
        return {
          afdragsfriYdelse: {
            label: 'Månedlig afdragsfri ydelse',
          },
          ydelse: {
            label: 'Månedlig ydelse',
          },
        };
      }
      case JyskeFrihedAreas.erhverv: {
        return {
          afdragsfriYdelse: {
            label: 'Årlig afdragsfri ydelse',
          },
          ydelse: {
            label: 'Årlig ydelse',
          },
        };
      }
    }
  }

  public get getJyskeFrihedBeregnerCtaText(): JyskeFrihedBeregnerCtaText {
    switch (this.jyskeFrihedBeregnerFacade.JyskeFrihedBeregnerArea) {
      case JyskeFrihedAreas.privat: {
        return {
          overskrift: {
            label: 'Vil du have Jyske Frihed?',
          },
        };
      }

      case JyskeFrihedAreas.erhverv: {
        return {
          overskrift: {
            label: 'Vil du høre mere om dine muligheder for at optage Jyske Frihed med fast rente',
          },
        };
      }
    }
  }
}
