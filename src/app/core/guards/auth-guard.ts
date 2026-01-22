import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../../shared/services/Storage.service';
import { STORAGE_KEYS } from '../enums/storage-keys.enum';

export const authGuard: CanActivateFn = (route, state) => {



  const router = inject(Router);
  const storage = inject(StorageService);

  const token = storage.getItem<string>(STORAGE_KEYS.TOKEN);

  if (token) {

    return true
  }

  return router.parseUrl('/auth/sign-in');
};
