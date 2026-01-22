import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../modules/authentication/services/auth.service';

export const needsPasswordChangeGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);

  const router = inject(Router)



  const isFirstLogin = authService.isFirstLogin;

  //Con esto revisara si el usuario actual tiene la bandera de first_login
  //en acceder 
  if (isFirstLogin) {
    router.navigate(['/auth/change-password']);
    return false;
  }
  return true;
};
