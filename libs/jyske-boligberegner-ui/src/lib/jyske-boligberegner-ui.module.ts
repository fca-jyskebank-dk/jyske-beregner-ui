import { CommonModule } from '@angular/common';
import { KirbyModule } from '@kirbydesign/designsystem';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ComponentsModule } from '@shared/components/components.module';
import { NgModule } from '@angular/core';
import { JyskeBoligberegnerStateModule } from './+state/jyske-boligberegner.state.module';
import { JyskeBoligberegnerComponent } from './containers/jyske-boligberegner/jyske-boligberegner.component';
import { JyskeBoligberegnerMapper } from './+state/jyske-boligberegner.map.service';
import { JyskeBoligberegnerInputComponent } from './presentational/jyske-boligberegner-input/jyske-boligberegner-input.component';
import { JyskeBoligberegnerProdukterComponent } from './presentational/jyske-boligberegner-produkter/jyske-boligberegner-produkter.component';
import { BeregningsresultatUiModule } from '@beregningsresultat-ui/beregningsresultat-ui.module';
import { FinansieringsforslagModule } from '@beregningsresultat-ui/finansieringsforslag/finansieringsforslag.module';
import { KundeKommunikationUiModule } from '@kunde-kommunikation-ui/kunde-kommunikation-ui.module';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    KirbyModule,
    JyskeBoligberegnerStateModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    BeregningsresultatUiModule,
    FinansieringsforslagModule,
    KundeKommunikationUiModule,
  ],
  declarations: [
    JyskeBoligberegnerComponent,
    JyskeBoligberegnerInputComponent,
    JyskeBoligberegnerProdukterComponent,
  ],
  providers: [JyskeBoligberegnerMapper],

  exports: [JyskeBoligberegnerComponent],
})
export class JyskeBoligberegnerUiModule {}
