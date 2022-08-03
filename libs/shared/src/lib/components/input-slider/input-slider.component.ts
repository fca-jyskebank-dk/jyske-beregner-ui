import { Component, forwardRef, HostListener, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'jyske-beregner-input-slider',
  templateUrl: './input-slider.component.html',
  styleUrls: ['./input-slider.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputSliderComponent),
      multi: true,
    },
  ],
})
export class InputSliderComponent implements ControlValueAccessor {
  @Input()
  label: string;

  @Input()
  maxValue: number;

  @Input()
  sliderMaxPercent: number;

  @Input()
  initalValue: number;

  @Input()
  stepValue: number;

  @Input()
  inputDisabled: boolean;

  @Input()
  errorMessage: string;

  value: number;
  valuePct: number;
  sliderMax: number;

  onChange: (value: number) => void;
  onTouch: () => void;

  @HostListener('keydown.enter')
  @HostListener('focusout')
  onBlur() {
    this.onChange(this.value);
  }

  @HostListener('window:mouseup')
  @HostListener('touchend', ['$event'])
  onMouseUp() {
    this.onChange(this.value);
  }

  writeValue(value: number): void {
    this.sliderMax = this.maxValue * this.sliderMaxPercent;
    this._updateValues(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setInputValue(value: number): void {
    this._updateValues(value);
  }

  setSliderValue(value: number): void {
    this._updateValues(value);
  }
  _updateValues(value: number): void {
    this.value = value;

    this.valuePct =
      ((this.maxValue - (this.maxValue - value)) / this.maxValue) * 100 || 0;
  }
}
