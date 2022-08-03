import { Configuration } from '../configuration';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { KurslisteResponse } from 'libs/jyske-beregner-api/src/lib/model/models';
import { KurslisteServiceInterface } from '../api/api';
import { KurslisteService } from '../api/kursliste.service';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Injectable()
export class JyskeKurslisteServiceProxy implements KurslisteServiceInterface {
  configuration: Configuration;
  defaultHeaders: HttpHeaders;

  constructor(
    private jyskeKurslisteService: KurslisteService,
    private http: HttpClient
  ) {}

  apiPrivatKurslisteGet(mockData: boolean): Observable<KurslisteResponse> {
    if (mockData) {
      return this.http.get('/assets/mocks/kursliste.json');
    }

    return this.jyskeKurslisteService.apiPrivatKurslisteGet().pipe(shareReplay(2));
  }
}
