import {Validators as NGValidators, AbstractControl, FormControl, Validators, ValidatorFn, ValidationErrors} from '@angular/forms';

export class BGValidators extends Validators {

  static minLength(length) {
    return (control) =>
      super.minLength(length)(control)
        ? {minLength: 'გთხოვთ შეიყვანოთ მინიმუმ ' + length  + ' სიმბოლო'}
        : undefined;
  }

  static maxLength(length) {
    return (control) =>
      super.maxLength(length)(control)
        ? {maxLength: 'გთხოვთ შეიყვანოთ მინიმუმ ' + length  + ' სიმბოლო'}
        : undefined;
  }

  static required(control) {
    return super.required(control)
      ? {required: 'აუცილებელი ველი'}
      : undefined;
  }

   static pattern(pattern: string | RegExp, patternDescription?: string) {
    return (control: AbstractControl) => {
      if (super.pattern(pattern)(control)) {
        return {
          minLength: `გთხოვთ დაიცვათ შაბლონი: '${patternDescription || pattern.toString()}'`
        };
      }
    };
  }



}
