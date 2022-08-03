import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JyskeFrihedComponent } from './containers/jyske-frihed/jyske-frihed.component';
import { JyskeFrihedProdukterComponent } from './presentational/jyske-frihed-produkter/jyske-frihed-produkter.component';
import { KirbyModule } from '@kirbydesign/designsystem';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '@shared/components/components.module';
import { BeregningsresultatUiModule } from '@jyske-beregner-ui/beregningsresultat-ui';
import { FinansieringsforslagModule } from '@beregningsresultat-ui/finansieringsforslag/finansieringsforslag.module';
import { JyskeFrihedStateModule } from './+state/jyske-frihed.state.module';
import { JyskeFrihedInputComponent } from './presentational/jyske-frihed-input/jyske-frihed-input.component';
import { JyskeFrihedMapper } from './+state/jyske-frihed.map.service';
import { KundeKommunikationUiModule } from '@kunde-kommunikation-ui/kunde-kommunikation-ui.module';
import { JyskeFrihedBarChartComponent } from './presentational/jyske-frihed-bar-chart/jyske-frihed-bar-chart.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    KirbyModule,
    JyskeFrihedStateModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    BeregningsresultatUiModule,
    FinansieringsforslagModule,
    KundeKommunikationUiModule
  ],
  declarations: [
    JyskeFrihedComponent,
    JyskeFrihedBarChartComponent,
    JyskeFrihedInputComponent,
    JyskeFrihedProdukterComponent,
  ],
  providers: [JyskeFrihedMapper],
  exports: [JyskeFrihedComponent],
})
export class JyskeFrihedUiModule {}
