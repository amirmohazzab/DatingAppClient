import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AccountService } from '../services/account-service';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { UserDto } from '../DTOs/UserDto';

export const AdminGuard: CanActivateFn = (route, state) => {

  const accountService = inject(AccountService);
  const toast = inject(ToastrService);

  return accountService.currentUser$.pipe(map((user: UserDto) => {
    if (user.roles.includes('admin') || user.roles.includes('superAdmin')){
      return true;
    }
    else{
      toast.error('you are not admin');
      return false;
    }
  }))
};
