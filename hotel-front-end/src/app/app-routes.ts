import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage-component/homepage-component';

/**
 * Creates paths to different routes in the application.
 */

export const routes: Routes = [
  {
    path: 'homepage',
    component: HomepageComponent,
  },
];
