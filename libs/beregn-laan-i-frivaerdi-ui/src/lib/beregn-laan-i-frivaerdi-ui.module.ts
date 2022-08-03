import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KirbyModule } from '@kirbydesign/designsystem';
import { LaanIFrivaerdiStateModule } from './+state/laan-i-frivaerdi.state.module';
import { ComponentsModule } from '@shared/components/components.module';
import { BeregningsresultatUiModule } from '@beregningsresultat-ui/beregningsresultat-ui.module';
import { FinansieringsforslagModule } from '@beregningsresultat-ui/finansieringsforslag/finansieringsforslag.module';
import { BeregnLaanIFrivaerdiComponent } from './containers/beregn-laan-i-frivaerdi/beregn-laan-i-frivaerdi.component';
import { LaanIFrivaerdiMapper } from './+state/laan-i-frivaerdi.map.service';
import { LaanIFrivaerdiInputComponent } from './presentational/laan-i-frivaerdi-input/laan-i-frivaerdi-input.component';
import { LaanIFrivaerdiProdukterComponent } from './presentational/laan-i-frivaerdi-produkter/laan-i-frivaerdi-produkter.component';
import { KundeKommunikationUiModule } from '@kunde-kommunikation-ui/kunde-kommunikation-ui.module';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    KirbyModule,
    LaanIFrivaerdiStateModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    BeregningsresultatUiModule,
    FinansieringsforslagModule,
    KundeKommunikationUiModule,
  ],

  declarations: [
    BeregnLaanIFrivaerdiComponent,
    LaanIFrivaerdiInputComponent,
    LaanIFrivaerdiProdukterComponent,
  ],
  providers: [LaanIFrivaerdiMapper],
  exports: [BeregnLaanIFrivaerdiComponent],
})
export class BeregnLaanIFrivaerdiUiModule {}
