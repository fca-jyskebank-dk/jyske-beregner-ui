import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KirbyModule } from '@kirbydesign/designsystem';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ComponentsModule } from '@shared/components/components.module';
import { SendBeregningComponent } from './send-beregning.component';
import { SendBeregningStateModule } from '../../+state/send-beregning/send-beregning.state.module';
import { SendBeregningMapper } from '../../+state/send-beregning/send-beregning.map.service';
import { SendBeregningService } from './send-beregning.service';

@NgModule({
  declarations: [
    SendBeregningComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    KirbyModule,
    SendBeregningStateModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
  ],
  exports: [SendBeregningComponent],
  providers: [SendBeregningMapper, SendBeregningService],
})
export class SendBeregningModule {}
