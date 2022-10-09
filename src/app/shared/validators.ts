import {AbstractControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';

export class BGValidators extends Validators {

  static minLength(length) {
    return (control) =>
      super.minLength(length)(control)
        ? {minLength: 'გთხოვთ შეიყვანოთ მინიმუმ ' + length + ' სიმბოლო'}
        : undefined;
  }

  static maxLength(length) {
    return (control) =>
      super.maxLength(length)(control)
        ? {maxLength: 'გთხოვთ შეიყვანოთ მაქსიმუმ ' + length + ' სიმბოლო'}
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
          minLength: `გთხოვთ დაიცვათ შაბლონი '${patternDescription || pattern.toString()}'`
        };
      }
    };
  }

  static positiveNumbers(control: AbstractControl): Promise<any> | Observable<any> {
    return new Promise(resolve => {
      Number(control.value) < 0
        ? resolve({onlyPositiveNumbers: 'გთხოვთ შეიყვანოთ მინიმუმ 0'}) : resolve(null);
    });
  }

  static passMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }
      control.value !== matchingControl.value
        ? matchingControl.setErrors({mustMatch: 'პაროლები არ ემთხვევა'})
        : matchingControl.setErrors(null);
      return null;
    };
  }

}
