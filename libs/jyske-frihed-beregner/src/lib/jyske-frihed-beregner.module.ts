import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KirbyModule } from '@kirbydesign/designsystem';
import { JyskeFrihedBeregnerComponent } from './containers/jyske-frihed-beregner/jyske-frihed-beregner.component';
import { JyskeFrihedBeregnerStateModule } from './+state/jyske-frihed-beregner.state.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JyskeFrihedBeregnerService } from './services/jyske-frihed-beregner.service';
import { ComponentsModule } from '@shared/components/components.module';
import { JyskeFrihedBeregnerFormComponent } from './presentational/jyske-frihed-beregner-form/jyske-frihed-beregner-form.component';
import { JyskeFrihedBeregnerDetaljerComponent } from './presentational/jyske-frihed-beregner-detaljer/jyske-frihed-beregner-detaljer.component';
import { NgxCurrencyModule } from 'ngx-currency';
import { JyskeFrihedBeregnerCtaComponent } from './presentational/jyske-frihed-beregner-cta/jyske-frihed-beregner-cta.component';
import { JyskeFrihedBeregnerNoegletalComponent } from './presentational/jyske-frihed-beregner-noegletal/jyske-frihed-beregner-noegletal.component';
import { JyskeFrihedBeregnerGrafComponent } from './presentational/jyske-frihed-beregner-graf/jyske-frihed-beregner-graf.component';
import { JyskeFrihedBeregnerTilbagebetalingplanComponent } from './presentational/jyske-frihed-beregner-tilbagebetalingplan/jyske-frihed-beregner-tilbagebetalingplan.component';
import {
  JyskeFrihedBeregnerConfigService,
  JyskeFrihedBeregnerConfig,
} from '@jyske-frihed-beregner/services/jyske-frihed-beregner-config.service';
import { ValidatorService } from '@shared/validation/validator.service';
import { JyskeFrihedBeregnerTextService } from './services/jyske-frihed-beregner-text.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    JyskeFrihedBeregnerStateModule,
    KirbyModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    NgxCurrencyModule,
  ],
  declarations: [
    JyskeFrihedBeregnerComponent,
    JyskeFrihedBeregnerFormComponent,
    JyskeFrihedBeregnerDetaljerComponent,
    JyskeFrihedBeregnerNoegletalComponent,
    JyskeFrihedBeregnerCtaComponent,
    JyskeFrihedBeregnerTilbagebetalingplanComponent,
    JyskeFrihedBeregnerGrafComponent,
  ],
  providers: [
    ValidatorService,
    JyskeFrihedBeregnerTextService,
    JyskeFrihedBeregnerService,
  ],
  exports: [JyskeFrihedBeregnerComponent],
})
export class JyskeFrihedBeregnerModule {
  static forRoot(
    config: JyskeFrihedBeregnerConfig
  ): ModuleWithProviders<JyskeFrihedBeregnerModule> {
    return {
      ngModule: JyskeFrihedBeregnerModule,
      providers: [
        JyskeFrihedBeregnerConfigService,
        { provide: 'config', useValue: config },
      ],
    };
  }
}
