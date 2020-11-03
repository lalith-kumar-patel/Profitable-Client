import { AbstractControl } from '@angular/forms';

export class LoginValidators {
  static validateEmailId(control: AbstractControl): any {
    const emailIdPattern: RegExp = /[a-zA-Z0-9]+@(gmail.com)/;
    if (!emailIdPattern.test(control.value)) {
      return { emailIdPatternError: true };
    }
    return null;
  }

  static validateName(control: AbstractControl): any {
    const namePattern1: RegExp = /^[a-zA-Z ]+/;
    const namePattern2: RegExp = /^[^ ].*/;
    const namePattern3: RegExp = /.*[^ ]$/;
    const value = control.value;
    const matches: boolean = namePattern1.test(value) && namePattern2.test(value) && namePattern3.test(value);

    if (!matches) {
      return { namePatternError: true };
    }
    return null;
  }

  static validatePhoneNumber(control: AbstractControl): any {
    const pattern1: RegExp = /^\d{10}$/;
    const value = control.value;
    const matches: boolean = pattern1.test(value);
    if (!matches) {
        return { phoneNumberError: true };
    }
    return null;
  }

  static validatePassword(control: AbstractControl): any {
    const pattern1: RegExp = /^.*[A-Z]+.*/;
    const pattern2: RegExp = /^.*[a-z]+.*/;
    const pattern3: RegExp = /.*[\d]+.*/;
    const pattern4: RegExp = /.*[@#$%&*^]+.*/;
    const value = control.value;
    const matches: boolean = pattern1.test(value) && pattern2.test(value) && pattern3.test(value)
        && pattern4.test(value);

    if (!matches) {
      return { passwordPatternError: true };
    }
    return null;
  }

  static confirmPassword(passwordControl: AbstractControl): any {
    return (confirmPasswordControl: AbstractControl) => {
      if (passwordControl.value !== confirmPasswordControl.value) {
        return { confirmPassword: true };
      }
      return null;
    };
  }
}
