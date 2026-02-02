import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { LoaderService } from '../../shared/services/Loader.service';

//!haremos que la request ignore ciertos eventos

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
    const loaderService = inject(LoaderService);
    const skipLoader = req.headers.has('X-Skip-Loader');


    if (!skipLoader) {
        loaderService.show();
    }




    return next(req).pipe(
        finalize(() => {
            if (!skipLoader) {
                loaderService.hide();
            }
        })
    );
};