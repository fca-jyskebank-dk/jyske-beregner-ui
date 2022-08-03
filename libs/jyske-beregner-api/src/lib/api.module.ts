import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';


import { AndelsboligforeningService } from './api/andelsboligforening.service';
import { ApplicationMonitorService } from './api/application-monitor.service';
import { BeregningerService } from './api/beregninger.service';
import { BoligudlejningService } from './api/boligudlejning.service';
import { FogoLightService } from './api/fogo-light.service';
import { KommunikationService } from './api/kommunikation.service';
import { KurslisteService } from './api/kursliste.service';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: [
    AndelsboligforeningService,
    ApplicationMonitorService,
    BeregningerService,
    BoligudlejningService,
    FogoLightService,
    KommunikationService,
    KurslisteService ]
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders<ApiModule> {
        return {
            ngModule: ApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
