import { Inject, Injectable } from '@angular/core';

export interface JyskeBeregnerApiConfig {
  apiBaseUrl: string;
}

@Injectable()
export class JyskeBeregnerApiConfigService {
  private _apiBaseUrl: string;
  public get apiBaseUrl(): string {
    return this._apiBaseUrl;
  }
  public set apiBaseUrl(value: string) {
    this._apiBaseUrl = value;
  }

  constructor(@Inject('config') private config: JyskeBeregnerApiConfig) {
    this._apiBaseUrl = config.apiBaseUrl;
  }
}
