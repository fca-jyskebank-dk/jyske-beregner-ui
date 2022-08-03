import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SendBeregningModule } from './containers/send-beregning/send-beregning.module';
import { KirbyModule } from '@kirbydesign/designsystem';

@NgModule({
  imports: [CommonModule, SendBeregningModule, KirbyModule],
  exports: [SendBeregningModule],
})
export class KundeKommunikationUiModule {}
