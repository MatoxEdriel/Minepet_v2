import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../../shared/services/Storage.service';
import { STORAGE_KEYS } from '../enums/storage-keys.enum';


//!Este guardian sirve para rebotar si existe un token activo y asi no pueda iniciar sesion 

export const guestGuard: CanActivateFn = (route, state) => {


  const storage = inject(StorageService);
  const router = inject(Router);
  const token = storage.getItem<string>(STORAGE_KEYS.TOKEN);



  if (token) {
    return router.parseUrl('/dashboard');
  }

  return true;



  return true;
};
