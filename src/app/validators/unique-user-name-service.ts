import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { catchError, debounceTime, distinctUntilChanged, map, Observable, ObservableInput, switchMap } from 'rxjs';
import { AccountService } from '../services/account-service';

@Injectable({
  providedIn: 'root'
})
export class UniqueUserNameService implements AsyncValidator{

  constructor(private accountService: AccountService){}

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    
    return control.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(value => {
        return this.accountService.isExistUserName(value);
      }),
      map((response) => {
        if (!!response) control.setErrors({uniqueUserName: true})
          return null
      }),
      catchError(error => {
        return null;
      })
    )
  }
  
}
