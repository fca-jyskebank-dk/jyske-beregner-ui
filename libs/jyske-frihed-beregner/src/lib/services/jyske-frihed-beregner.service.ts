import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  JyskeFrihedBeregnerRequest,
  JyskeFrihedBeregnerResponse,
} from './jyske-frihed-beregner.service.interfaces';
import { JyskeFrihedBeregnerConfigService } from '@jyske-frihed-beregner/services/jyske-frihed-beregner-config.service';
import { JyskeFrihedBeregnerFacade } from '@jyske-frihed-beregner/+state/jyske-frihed-beregner.facade';
import * as constanst from '@jyske-frihed-beregner/jyske-frihed-beregner.constants';

@Injectable()
export class JyskeFrihedBeregnerService {
  constructor(
    private httpClient: HttpClient,
    private configService: JyskeFrihedBeregnerConfigService,
    private jyskeFrihedBeregnerFacade: JyskeFrihedBeregnerFacade
  ) {}

  getBeregning$(
    request: JyskeFrihedBeregnerRequest
  ): Observable<JyskeFrihedBeregnerResponse> {
    const url = this.getUrl(request.fastrenteperiode);

    const detRigtigeRequest = this.MapRequest(request);


    return this.httpClient.post<JyskeFrihedBeregnerResponse>(url, detRigtigeRequest, {
      withCredentials: true,
    });
  }
  private MapRequest(request: JyskeFrihedBeregnerRequest) :FrihedUdbetalingRequest{

    return {
      aarTilAfdragsfrihed : request.antalAarTilAfdragsfrihed,
      antalAfdragsfrieAar : request.loebetidIAar - request.antalAarTilAfdragsfrihed,
      boligvaerdi : request.boligvaerdi,
      foranstaaendeGaeld : 0,
      laanoenske : request.eksisterendeBoliggaeld,
      oensketLoebetidIAar : request.loebetidIAar,
      restgaeldVedUdloeb : request.restgaeldVedUdloeb,
      produkt : this.MapProdukt(request.fastrenteperiode)
    }
  }

  private MapProdukt(input : number): RtlProduktNoegle{
    if (input === (null || undefined)) return null;
    if(input == 30) return null;
    return{
      basisproduktaftalenummer : input == 1 ? 45 : 21,
      fastrenteperiode : input
    };
  }


  private getUrl(fastrenteperiode: number): string {
    let url: string;

    if (
      this.jyskeFrihedBeregnerFacade.JyskeFrihedBeregnerArea ===
      constanst.JyskeFrihedAreas.privat
    ) {
      url =
        fastrenteperiode === 30
          ? constanst.PRIVAT_FASTRENTE
          : constanst.PRIVAT_RTL;
    }

    if (
      this.jyskeFrihedBeregnerFacade.JyskeFrihedBeregnerArea ===
      constanst.JyskeFrihedAreas.erhverv
    ) {
      if (
        this.jyskeFrihedBeregnerFacade.JyskeFrihedBeregnerAreaType ===
        constanst.JyskeFrihedAreaTypes.andelsbolig
      ) {
        url = constanst.ERHVERV_ANDELSBOLIG_FASTRENTE;
      }
      if (
        this.jyskeFrihedBeregnerFacade.JyskeFrihedBeregnerAreaType ===
        constanst.JyskeFrihedAreaTypes.boligudlejning
      ) {
        url = constanst.ERHVERV_BOLIGUDLEJNING_FASTRENTE;
      }
    }

    return `${this.configService.apiBaseUrl}/api/${url}`;
  }
}

export interface FrihedUdbetalingRequest {
  boligvaerdi?: number;
  laanoenske?: number;
  oensketLoebetidIAar?: number;
  antalAfdragsfrieAar?: number;
  foranstaaendeGaeld?: number;
  produkt?: RtlProduktNoegle;
  aarTilAfdragsfrihed?: number;
  restgaeldVedUdloeb?: number;
}
export interface RtlProduktNoegle {
  basisproduktaftalenummer?: number;
  fastrenteperiode?: number;
}
