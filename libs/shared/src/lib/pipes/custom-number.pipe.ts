import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { CustomNumberExt } from './custom-number.ext';

@Pipe({
  name: 'customNumber',
})
export class CustomNumberPipe implements PipeTransform {
  constructor(private decimalPipe: DecimalPipe) {}

  transform(
    value: any,
    ext: CustomNumberExt = CustomNumberExt[''],
    digits = '0.0-0'
  ): string {
    if(value ===  null) return null;
    return `${this.decimalPipe.transform(value, digits, 'da-DK')}${ext}`;
  }
}
