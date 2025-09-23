// import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
// import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
// import { provideRouter, withHashLocation } from '@angular/router';
// import { provideHttpClient, withInterceptors, withFetch } from '@angular/common/http';

// import { routes } from './app.routes';
// import { authInterceptorFn  } from './auth/auth.interceptor';

// export const appConfig: ApplicationConfig = {
//   providers: [
//     provideBrowserGlobalErrorListeners(),
//     provideZonelessChangeDetection(),
//     provideRouter(routes, withHashLocation()),

//     provideClientHydration(withEventReplay()),
//     provideHttpClient(withFetch(), withInterceptors([authInterceptorFn])),
//   ],
// };
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes)
  ]
};
