import { Configuration } from '../configuration';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  SendBeregningRequest,
  SendBeregningResponse,
} from 'libs/jyske-beregner-api/src/lib/model/models';
import {
  KommunikationService,
  KommunikationServiceInterface,
} from '../api/api';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Injectable()
export class KommunikationServiceProxy
  implements KommunikationServiceInterface
{
  configuration: Configuration;
  defaultHeaders: HttpHeaders;

  constructor(
    private kommunikationService: KommunikationService,
    private http: HttpClient
  ) {}

  apiKommunikationSendBeregningPost(
    sendBeregningRequest?: SendBeregningRequest,
    mockData?: boolean
  ): Observable<SendBeregningResponse> {
    if (mockData) {
      return this.http.get('/assets/mocks/sendberegning.json');
    }
    return this.kommunikationService
      .apiKommunikationSendBeregningPost(sendBeregningRequest)
      .pipe(shareReplay(2));
  }
}
