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
import { environment } from '@environment-nyt-laan-erhverv/environment';
import { NytLaanErhvervUiModule } from '@nyt-laan-erhverv-ui/nyt-laan-erhverv-ui.module';
import { NytLaanErhvervComponent } from '@nyt-laan-erhverv-ui/container/nyt-laan-erhverv/nyt-laan-erhverv.component';
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
        NytLaanErhvervUiModule,
        JyskeBeregnerApiModule.forRoot({
        apiBaseUrl: environment.endpoints.nytLaanErhvervApiBaseUrl,
        }),
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'da-DK' },
        { provide: APP_BASE_HREF, useValue: environment.base_href },
    ]
})
export class AppModule {
  constructor(private injector: Injector) {
    const el = createCustomElement(NytLaanErhvervComponent, { injector });
    customElements.define('nyt-laan-erhverv', el);
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  ngDoBootstrap() {}
}
