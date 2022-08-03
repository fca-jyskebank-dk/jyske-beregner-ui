import { BrowserModule } from '@angular/platform-browser';
import { Injector, LOCALE_ID, NgModule } from '@angular/core';
import { APP_BASE_HREF, registerLocaleData } from '@angular/common';
import localeDa from '@angular/common/locales/da';
import { createCustomElement } from '@angular/elements';
import { KirbyModule } from '@kirbydesign/designsystem';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RouterModule } from '@angular/router';
import { JyskeBeregnerApiModule } from '@jyske-beregner-api/jyske-beregner-api.module';
import { BeregnLaanGenerelUiModule } from '@jyske-beregner-ui/beregn-laan-generel-ui';
import { BeregnLaanGenerelComponent } from 'libs/beregn-laan-generel-ui/src/lib/containers/beregn-laan-generel/beregn-laan-generel.component';
import { environment } from '@environment-beregn-laan-generel/environment';


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
        BeregnLaanGenerelUiModule,
        JyskeBeregnerApiModule.forRoot({
            apiBaseUrl: environment.endpoints.beregnLaanGenerelApiBaseUrl,
        }),
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'da-DK' },
        { provide: APP_BASE_HREF, useValue: environment.base_href },
    ]
})
export class AppModule {

  constructor(private injector: Injector) {
    const el = createCustomElement(BeregnLaanGenerelComponent, { injector });
    customElements.define('beregn-laan-generel', el);
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  ngDoBootstrap() {}
}
