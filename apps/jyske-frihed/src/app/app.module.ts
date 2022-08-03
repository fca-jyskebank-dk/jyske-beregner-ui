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
import { environment } from '@environment-jyske-frihed/environment';
import { JyskeFrihedBeregnerModule } from '@jyske-frihed-beregner/jyske-frihed-beregner.module';
import { RouterModule } from '@angular/router';
import { JyskeFrihedBeregnerComponent } from '@jyske-frihed-beregner/containers/jyske-frihed-beregner/jyske-frihed-beregner.component';

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
        JyskeFrihedBeregnerModule.forRoot({
            apiBaseUrl: environment.endpoints.jyskeFrihedApiBaseUrl,
        }),
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'da-DK' },
        { provide: APP_BASE_HREF, useValue: environment.base_href },
    ]
})
export class AppModule {
  constructor(private injector: Injector) {
    const el = createCustomElement(JyskeFrihedBeregnerComponent, { injector });
    customElements.define('jyske-frihed', el);
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  ngDoBootstrap() {}
}
