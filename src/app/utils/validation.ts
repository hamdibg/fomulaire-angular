import { AbstractControl, ValidatorFn } from "@angular/forms";

export default class Validation {
  static match(controlName: string, checkControlName: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const control = controls.get(controlName);
      const checkControl = controls.get(checkControlName);

      if (checkControl?.errors && !checkControl.errors['matching']) {
        return null;
      }

      if (control?.value !== checkControl?.value) {
        controls.get(checkControlName)?.setErrors({ matching: true });
        return { matching: true };
      } else {
        return null;
      }
    };
  }

  static passwordComplexity(): ValidatorFn {
    return (control: AbstractControl) => {
      const value = control.value as string;
      const passwordRegex = /^(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.*\d).+$/;
      
      if (!passwordRegex.test(value)) {
        return { complexity: true };
      } else {
        return null;
      }
    };
  }
}
