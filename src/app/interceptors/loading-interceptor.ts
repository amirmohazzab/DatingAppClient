import { HttpEventType, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { BusyService } from '../services/busy-service';
import { finalize, tap } from 'rxjs';

export const LoadingInterceptor: HttpInterceptorFn = (req, next) => {

  const busyServive = inject(BusyService);
  busyServive.showBusy();

  return next(req).pipe(
    finalize(() => {
      busyServive.hideBusy();
    }),
    tap((event) => {
    if (event.type == HttpEventType.Sent){

    }
    if (event.type == HttpEventType.Response){
      busyServive.hideBusy();
    }
  }))
};
