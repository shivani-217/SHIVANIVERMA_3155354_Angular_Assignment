import { AbstractControl } from '@angular/forms';

export class ValidatePassword {
  static MatchPassword(abstractControl: AbstractControl) {
    let password = abstractControl.get('password')?.value;
    let confirmPassword = abstractControl.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      console.error("mismatch")
      abstractControl.get('confirmPassword')?.setErrors({
        MatchPassword: true
      })
    }
  }

}



