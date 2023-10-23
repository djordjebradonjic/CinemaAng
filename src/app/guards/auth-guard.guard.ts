import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const toastrService=inject(ToastrService);
  if (authService.isLogin && localStorage.getItem('ROLE') === "ADMIN")
    return true;
  else{
    toastrService.error("Guard: Available for ADMIN only!");
  return false;
  }
};
