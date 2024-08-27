import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";


export  class CustomValidators {
   static  customValidator(customs: any): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return null;
    }
  }

  static readonly  pattern_url = '';
}
