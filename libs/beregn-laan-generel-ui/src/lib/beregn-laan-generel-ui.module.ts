import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BeregnLaanGenerelComponent } from './containers/beregn-laan-generel/beregn-laan-generel.component';
import { BeregnLaanGenerelStateModule } from './+state/beregn-laan-generel.state.module';
import { BeregnLaanGenerelMapper } from './+state/beregn-laan-generel.map.service';
import { LaanGenerelTeaserComponent } from './presentational/laan-generel-teaser/laan-generel-teaser.component';
import { LaanGenerelProdukterComponent } from './presentational/laan-generel-produkter/laan-generel-produkter.component';
import { ComponentsModule } from '@shared/components/components.module';
import { KirbyModule } from '@kirbydesign/designsystem';
import { HttpClientModule } from '@angular/common/http';
import { BeregningsresultatUiModule } from '@beregningsresultat-ui/beregningsresultat-ui.module';
import { FinansieringsforslagModule } from '@beregningsresultat-ui/finansieringsforslag/finansieringsforslag.module';
import { KundeKommunikationUiModule } from '@kunde-kommunikation-ui/kunde-kommunikation-ui.module';

@NgModule({
  imports: [
    CommonModule,
    BeregnLaanGenerelStateModule,
    ComponentsModule,
    KirbyModule,
    HttpClientModule,
    BeregningsresultatUiModule,
    FinansieringsforslagModule,
    KundeKommunikationUiModule
  ],
  declarations: [BeregnLaanGenerelComponent, LaanGenerelTeaserComponent, LaanGenerelProdukterComponent],
  providers: [BeregnLaanGenerelMapper],
})
export class BeregnLaanGenerelUiModule {}
