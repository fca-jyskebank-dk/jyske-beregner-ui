import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { Configuration } from '../configuration';
import { BeregningerService } from '../api/beregninger.service';
import { BeregnAlleLaanResponse } from '../model/beregn-alle-laan-response';
import { BoligRequest } from '../model/bolig-request';
import { FrivaerdiRequest } from '../model/frivaerdi-request';
import { MaxProvenueRequest } from '../model/max-provenue-request';
import { MaxProvenueResponse } from '../model/max-provenue-response';
import { BeregningerServiceInterface } from '../api/beregninger.serviceInterface';
import { BeregnFrihedRequest } from '../model/beregn-frihed-request';
import { BeregnFrihedResponse } from '../model/beregn-frihed-response';
import { MaxProvenuFrihedRequest } from '@jyske-beregner-api/model/max-provenu-frihed-request';
import { MaxProvenuFrihedResponse } from '@jyske-beregner-api/model/max-provenu-frihed-response';

@Injectable()
export class JyskeBeregningerServiceProxy
  implements BeregningerServiceInterface
{
  configuration: Configuration;
  defaultHeaders: HttpHeaders;

  constructor(
    private beregningerService: BeregningerService,
    private http: HttpClient
  ) {}

  apiBeregningerFrihedMaxProvenuPost(
    maxProvenuFrihedRequest?: MaxProvenuFrihedRequest,
    mockData?: boolean
  ): Observable<MaxProvenuFrihedResponse> {
    if (mockData) {
      return this.http.get('/assets/mocks/maxprovenu.json');
    }
    return this.beregningerService
      .apiBeregningerFrihedMaxProvenuPost(maxProvenuFrihedRequest)
      .pipe(shareReplay(2));
  }

  apiBeregningerBeregnLaanIFrivaerdiMaxProvenuPost(
    maxProvenueRequest: MaxProvenueRequest,
    mockData?: boolean
  ): Observable<MaxProvenueResponse> {
    if (mockData) {
      return this.http.get('/assets/mocks/maxprovenu.json');
    }
    return this.beregningerService
      .apiBeregningerBeregnLaanIFrivaerdiMaxProvenuPost(maxProvenueRequest)
      .pipe(shareReplay(2));
  }

  apiBeregningerBeregnLaanIFrivaerdiPost(
    frivaerdiRequest: FrivaerdiRequest,
    mockData?: boolean
  ): Observable<BeregnAlleLaanResponse> {
    if (mockData) {
      if (frivaerdiRequest.antalAfdragsfrieAar > 0) {
        return this.http.get(
          '/assets/mocks/finansieringsforslagafdragsfrihed.json'
        );
      } else {
        return this.http.get('/assets/mocks/finansieringsforslag.json');
      }
    }

    return this.beregningerService
      .apiBeregningerBeregnLaanIFrivaerdiPost(frivaerdiRequest)
      .pipe(shareReplay(2));
  }

  apiBeregningerBeregnLaanTilNyBoligPost(
    boligRequest?: BoligRequest,
    mockData?: boolean
  ): Observable<BeregnAlleLaanResponse> {
    if (mockData) {
      if (boligRequest.antalAfdragsfrieAar > 0) {
        return this.http.get(
          '/assets/mocks/finansieringsforslagafdragsfrihed.json'
        );
      } else {
        return this.http.get('/assets/mocks/finansieringsforslag.json');
      }
    }

    return this.beregningerService
      .apiBeregningerBeregnLaanTilNyBoligPost(boligRequest)
      .pipe(shareReplay(2));
  }

  apiBeregningerFrihedPost(
    beregnFrihedRequest?: BeregnFrihedRequest,
    mockData?: boolean
  ): Observable<BeregnFrihedResponse> {
    if (mockData) {
      if (beregnFrihedRequest.boligVaerdi > 0) {
        return this.http.get(
          '/assets/mocks/finansieringsforslagudskudtafdragsfrihed.json'
        );
      } else {
        return this.http.get('/assets/mocks/finansieringsforslag.json');
      }
    }
    return this.beregningerService
      .apiBeregningerFrihedPost(beregnFrihedRequest)
      .pipe(shareReplay(2));
  }
}
