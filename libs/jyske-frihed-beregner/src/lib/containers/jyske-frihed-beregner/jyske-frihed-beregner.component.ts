import { Component, Input, OnInit } from '@angular/core';
import {
  loadJyskeFrihedBeregner,
  setJyskeFrihedBeregnerArea,
} from '@jyske-frihed-beregner/+state/jyske-frihed-beregner.actions';
import {
  JyskeFrihedAreas,
  JyskeFrihedAreaTypes,
} from '@jyske-frihed-beregner/jyske-frihed-beregner.constants';
import { FormData } from '@jyske-frihed-beregner/presentational/jyske-frihed-beregner-form/jyske-frihed-beregner-form.component';
import { JyskeFrihedBeregnerFacade } from '../../+state/jyske-frihed-beregner.facade';
import { JyskeFrihedBeregnerRequest } from '../../services/jyske-frihed-beregner.service.interfaces';

@Component({
  selector: 'jyske-frihed-beregner',
  templateUrl: './jyske-frihed-beregner.component.html',
  styleUrls: ['./jyske-frihed-beregner.component.scss'],
})
export class JyskeFrihedBeregnerComponent implements OnInit {
  selectedArea: number;

  @Input()
  area: string;

  @Input()
  areaType: string;

  @Input()
  boligvaerdiInitialValue = 3450000;

  constructor(public jyskeFrihedBeregnerFacade: JyskeFrihedBeregnerFacade) {}
  ngOnInit(): void {
    this.selectedArea = this._getArea(this.area);
    const selectedAreaType = this._getAreaType(this.areaType);

    this.jyskeFrihedBeregnerFacade.Dispatch(
      setJyskeFrihedBeregnerArea({
        area: this.selectedArea,
        areaType: selectedAreaType,
      })
    );
  }

  onBeregn(formData: FormData) {
    const request: JyskeFrihedBeregnerRequest = {
      boligvaerdi: formData.boligVaerdi, // Boligværdi
      oensketProvenu: 0, // Lån i friværdi
      eksisterendeBoliggaeld: formData.eksisterendeBoliggaeld, // Restgæld
      restgaeldVedUdloeb: formData.restgaeldVedUdloeb, // Restgæld ved udløb
      antalAarTilAfdragsfrihed: formData.antalAarTilAfdragsfrihed, // Afdragsfrihed start
      loebetidIAar: 30,
      fastrenteperiode: formData.fastrenteperiode, // 1-6 RTL eller 30 Fast rente
    };

    this.jyskeFrihedBeregnerFacade.Dispatch(
      loadJyskeFrihedBeregner({ request })
    );
  }

  _getArea(area: string): JyskeFrihedAreas {
    if (area === undefined) {
      return JyskeFrihedAreas.privat;
    }

    switch (area.toLowerCase()) {
      case 'privat': {
        return JyskeFrihedAreas.privat;
      }
      case 'erhverv': {
        return JyskeFrihedAreas.erhverv;
      }
      default: {
        return JyskeFrihedAreas.privat;
      }
    }
  }

  _getAreaType(areaType: string): JyskeFrihedAreaTypes {
    if (areaType === undefined) {
      return JyskeFrihedAreaTypes.andelsbolig;
    }

    switch (areaType.toLowerCase()) {
      case 'andelsbolig': {
        return JyskeFrihedAreaTypes.andelsbolig;
      }
      case 'boligudlejning': {
        return JyskeFrihedAreaTypes.boligudlejning;
      }
      default: {
        return JyskeFrihedAreaTypes.andelsbolig;
      }
    }
  }
}
