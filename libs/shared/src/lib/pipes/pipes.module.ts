import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { CustomNumberPipe } from './custom-number.pipe';

@NgModule({
  declarations: [CustomNumberPipe],
  imports: [CommonModule],
  providers: [DecimalPipe, CustomNumberPipe, DatePipe],
  exports: [CustomNumberPipe],
})
export class PipesModule {}
