import { BrowserModule } from '@angular/platform-browser';
import { Injector, LOCALE_ID, NgModule } from '@angular/core';
import { APP_BASE_HREF, registerLocaleData } from '@angular/common';
import localeDa from '@angular/common/locales/da';
import { createCustomElement } from '@angular/elements';
import { KirbyModule } from '@kirbydesign/designsystem';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '@environment-jyske-kursliste/environment';
import { RouterModule } from '@angular/router';
import { JyskeKurslisteUiModule } from '@jyske-kursliste-ui/jyske-kursliste-ui.module';
import { JyskeBeregnerApiModule } from '@jyske-beregner-api/jyske-beregner-api.module';
import { JyskeKurslisteComponent } from '@jyske-kursliste-ui/containers/jyske-kursliste/jyske-kursliste.component';

registerLocaleData(localeDa);

@NgModule({
    declarations: [],
    imports: [
        BrowserModule,
        RouterModule.forRoot([]),
        KirbyModule,
        StoreModule.forRoot({}, {}),
        EffectsModule.forRoot([]),
        StoreDevtoolsModule.instrument({
            maxAge: 25,
            logOnly: environment.production,
        }),
        JyskeKurslisteUiModule,
        JyskeBeregnerApiModule.forRoot({
            apiBaseUrl: environment.endpoints.jyskeBoligberegnerApiBaseUrl,
        }),
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'da-DK' },
        { provide: APP_BASE_HREF, useValue: environment.base_href },
    ]
})
export class AppModule {
  constructor(private injector: Injector) {
    const el = createCustomElement(JyskeKurslisteComponent, { injector });
    customElements.define('jyske-kursliste', el);
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  ngDoBootstrap() {}
}
