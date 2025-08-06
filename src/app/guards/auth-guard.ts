import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from '../services/account-service';
import { map, take } from 'rxjs';
import { UserDto } from '../DTOs/UserDto';
import { ToastrService } from 'ngx-toastr';

export const AuthGuard: CanActivateFn = (route, state) => {

  const accountService = inject(AccountService);
  const toast = inject(ToastrService);
  const router = inject(Router);

   return accountService.currentUser$.pipe(take(1), map((user: UserDto) => {
      if (user)
        return true;

    toast.error('Error', 'At first Login');
    router.navigateByUrl('/');
    return false;
   }))
};
