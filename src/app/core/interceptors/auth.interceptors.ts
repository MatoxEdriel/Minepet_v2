import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../../modules/authentication/services/auth.service';
import { Router } from '@angular/router';
import { StorageService } from '../../shared/services/Storage.service';
import { STORAGE_KEYS } from '../enums/storage-keys.enum';


export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService);
    const storage = inject(StorageService);


    const token = storage.getItem<string>(STORAGE_KEYS.TOKEN);

    
    let authReq = req
    if (token) {
        authReq = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
    }
    return next(authReq).pipe(
        catchError((error) => {
            //el back me manda si ya expiro xdxd

            //! en este ejemplo la persona al intentar entrar con la contraseña incorrecta
            //!pues recibe el 401 y para evitar la recarga de pagina pues 
            const isLoginRequest = req.url.includes('/login') || req.url.includes('auth');
            if (error.status === 401 && !isLoginRequest) {
                console.warn('Sesión expirada. Cerrando sesión...');
                authService.logOut();
            }
            return throwError(() => error);
        })
    );
};