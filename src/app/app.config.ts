import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth.interceptors';
import { provideLottieOptions } from 'ngx-lottie';
import { loaderInterceptor } from './core/interceptors/loaderInterceptos';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    //!withviewtransations toma los estilos o animacion del styles.css el problema es que
    //! se sobrepone con el cambio de dark mode 


    //? withViewTransitions()
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([authInterceptor,
        loaderInterceptor
      ])

    ),
    provideLottieOptions({
      player: () => import('lottie-web')

    })
  ]
};
