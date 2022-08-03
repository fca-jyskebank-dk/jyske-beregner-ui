import { Inject, Injectable } from '@angular/core';

export interface JyskeFrihedBeregnerConfig {
  apiBaseUrl: string;
}

@Injectable()
export class JyskeFrihedBeregnerConfigService {
  private _apiBaseUrl: string;
  public get apiBaseUrl(): string {
    return this._apiBaseUrl;
  }
  public set apiBaseUrl(value: string) {
    this._apiBaseUrl = value;
  }

  constructor(@Inject('config') private config: JyskeFrihedBeregnerConfig) {
    this._apiBaseUrl = config.apiBaseUrl;
  }
}
