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
import { environment } from '@environment-beregn-laan-i-frivaerdi/environment';
import { BeregnLaanIFrivaerdiUiModule } from '@beregn-laan-i-frivaerdi-ui/beregn-laan-i-frivaerdi-ui.module';
import { BeregnLaanIFrivaerdiComponent } from '@beregn-laan-i-frivaerdi-ui/containers/beregn-laan-i-frivaerdi/beregn-laan-i-frivaerdi.component';
import { JyskeBeregnerApiModule } from '@jyske-beregner-api/jyske-beregner-api.module';

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
        BeregnLaanIFrivaerdiUiModule,
        JyskeBeregnerApiModule.forRoot({
            apiBaseUrl: environment.endpoints.beregnLaanIFrivaerdiApiBaseUrl,
        }),
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'da-DK' },
        { provide: APP_BASE_HREF, useValue: environment.base_href },
    ]
})
export class AppModule {
  constructor(private injector: Injector) {
    const el = createCustomElement(BeregnLaanIFrivaerdiComponent, { injector });
    customElements.define('jyske-beregn-laan-i-frivaerdi', el);
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  ngDoBootstrap() {}
}
