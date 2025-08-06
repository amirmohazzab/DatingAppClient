import { HttpEventType, HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AccountService } from '../services/account-service';
import {UserDto} from '../DTOs/UserDto';
import { exhaustMap, take, tap } from 'rxjs';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {

  const accountService = inject(AccountService);

  let currentUser: UserDto;

  accountService.currentUser$.pipe(take(1)).subscribe(user => currentUser = user);

  if (currentUser){
    req = req.clone({
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + currentUser?.token)
    })
  }

  return next(req);
};
