import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from '@angular/core';
import { KommunikationService } from '.';
import { BeregningerService } from './api/beregninger.service';
import { KurslisteService } from './api/kursliste.service';
import { JyskeBeregningerServiceProxy } from './proxies/jyske-beregninger.service.proxy';
import { KommunikationServiceProxy } from './proxies/jyske-kommunikation.service.proxy';
import { JyskeKurslisteServiceProxy } from './proxies/jyske-kursliste.service.proxy';
import {
  JyskeBeregnerApiConfig,
  JyskeBeregnerApiConfigService,
} from './services/jyske-beregner-api-config.service';
import { BASE_PATH } from './variables';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  declarations: [],
  providers: [
    BeregningerService,
    JyskeBeregningerServiceProxy,
    KurslisteService,
    JyskeKurslisteServiceProxy,
    KommunikationService,
    KommunikationServiceProxy,
  ],
  exports: [],
})
export class JyskeBeregnerApiModule {
  static forRoot(
    config: JyskeBeregnerApiConfig
  ): ModuleWithProviders<JyskeBeregnerApiModule> {
    return {
      ngModule: JyskeBeregnerApiModule,
      providers: [
        JyskeBeregnerApiConfigService,
        { provide: 'config', useValue: config },
        {
          provide: BASE_PATH,
          useValue: config.apiBaseUrl,
        },
        // {
        //   provide: HTTP_INTERCEPTORS,
        //   useClass: BackendInterceptor,
        //   multi: true,
        // },
      ],
    };
  }

  constructor(
    @Optional() @SkipSelf() parentModule: JyskeBeregnerApiModule,
    @Optional() http: HttpClient
  ) {
    if (parentModule) {
      throw new Error(
        'Module is already loaded. Import in your base AppModule only.'
      );
    }
    if (!http) {
      throw new Error(
        'You need to import the HttpClientModule in your AppModule! \n' +
          'See also https://github.com/angular/angular/issues/20575'
      );
    }
  }
}
