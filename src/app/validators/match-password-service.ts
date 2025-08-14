import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors, Validator } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})

export class MatchPasswordService implements Validator {

  validate(formGroup: FormGroup): ValidationErrors | null {

    console.log(formGroup);
    const {password, confirmPassword} = formGroup.value;

    if (password === confirmPassword) return null;

    return {matchPassword: true}
  }
  
  
}
