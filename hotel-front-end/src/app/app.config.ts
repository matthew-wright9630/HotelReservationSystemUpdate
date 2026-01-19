import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app-routes';
// import { provideNgxStripe } from 'ngx-stripe';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    // provideNgxStripe(
    //   'pk_test_51Sof2jCbjOnIK0DDxQdL6oBvqkDwxONbxxmgZDSsfHCyMWPytjalPulCx9aiQmgJI0vw6dw2LP29jJOAKYpB84Th00j5ySgGLH',
    // ),
  ],
};
