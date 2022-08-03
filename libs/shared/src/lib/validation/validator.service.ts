import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidatorService {
  setValidation(control: AbstractControl, validators: ValidatorFn[]): void {
    validators ? control.setValidators(validators) : control.clearValidators();
    control.updateValueAndValidity();
  }

  getValidationMessage(
    control: AbstractControl,
    validationMessages: any
  ): string {
    if ((control.dirty || control.touched) && control.errors) {
      return Object.keys(control.errors)
        .map((key) => validationMessages[key])
        .join(' ');
    } else {
      return '';
    }
  }

  getValidationMessageEvenNotDirty(
    control: AbstractControl,
    validationMessages: any
  ): string {
    if (control.errors) {
      return Object.keys(control.errors)
        .map((key) => validationMessages[key])
        .join(' ');
    } else {
      return '';
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched();
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
}
