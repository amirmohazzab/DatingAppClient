import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const ErrorInterceptor: HttpInterceptorFn = (req, next) => {

  const router = inject(Router);
  //const toast = inject(ToastService);
  
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error) {
        switch (error.status){
          case 404:
            router.navigateByUrl('not-found');
            break;

          case 400:
            if (error.error.errors){
              const modelStateErrors: string[] = [];
              for (const key in error.error.errors){
                  if (error.error.errors[key]){
                    modelStateErrors.push(error.error.errors[key])
                  }
              }
              throw modelStateErrors
            } else {
              //toast.error(error.error.message, "Error Code: " + error.status)
            }
            break;

          case 500:
            //toast.error(Server Side Error was occured please try again, "Error Code: " + error.status.toString())
            break;

          default:
            //toast.error(error.error.message, "Error Code: " + error.status);
            break
        }
      }
      return throwError(error);
    })
  )
};
