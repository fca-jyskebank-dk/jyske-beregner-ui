import { BrowserModule } from '@angular/platform-browser';
import { Injector, LOCALE_ID, NgModule } from '@angular/core';
import { APP_BASE_HREF, registerLocaleData } from '@angular/common';
import localeDa from '@angular/common/locales/da';
import { createCustomElement } from '@angular/elements';
import { KirbyModule } from '@kirbydesign/designsystem';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { environment } from '@environment-jyske-boligberegner/environment';
import { RouterModule } from '@angular/router';
import { JyskeBoligberegnerUiModule} from '@jyske-boligberegner-ui/jyske-boligberegner-ui.module';
import { JyskeBeregnerApiModule } from '@jyske-beregner-api/jyske-beregner-api.module';
import { JyskeBoligberegnerComponent } from '@jyske-boligberegner-ui/containers/jyske-boligberegner/jyske-boligberegner.component';

registerLocaleData(localeDa);

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    RouterModule.forRoot([]),
    KirbyModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    JyskeBoligberegnerUiModule,
    JyskeBeregnerApiModule.forRoot({
      apiBaseUrl: environment.endpoints.jyskeBoligberegnerApiBaseUrl,
    }),
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'da-DK' },
    { provide: APP_BASE_HREF, useValue: environment.base_href },
  ],
  entryComponents: [JyskeBoligberegnerComponent],
})
export class AppModule {
  constructor(private injector: Injector) {
    const el = createCustomElement(JyskeBoligberegnerComponent, { injector });
    customElements.define('jyske-boligberegner', el);
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  ngDoBootstrap() {}
}
