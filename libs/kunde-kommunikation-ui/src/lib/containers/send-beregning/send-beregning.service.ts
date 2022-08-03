import { Injectable } from '@angular/core';
import { Beregningsresultat } from '@beregningsresultat-ui/finansieringsforslag/finansieringsforslag.interfaces';
import { ModalConfig, ModalController } from '@kirbydesign/designsystem';
import { SendBeregningComponent } from './send-beregning.component';

@Injectable()
export class SendBeregningService {
  constructor(public modalcontroller: ModalController) {}

  onSendBeregning(event: Beregningsresultat, partnerId: string): void {
    const config: ModalConfig = {
      flavor: 'modal',
      component: SendBeregningComponent,
      componentProps: {
        beregningsresultat: event,
        partnerId: partnerId,
      },
    };
    this.modalcontroller.showModal(config);
  }
}
