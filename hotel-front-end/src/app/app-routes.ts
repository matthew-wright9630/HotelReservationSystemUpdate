import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage-component/homepage-component';
import { EmployeePortalComponent } from './employee-portal-component/employee-portal-component';

/**
 * Creates paths to different routes in the application.
 */

export const routes: Routes = [
  {
    path: 'homepage',
    component: HomepageComponent,
  },
  {
    path: 'employee',
    component: EmployeePortalComponent,
  },
  // {
  //   path: 'contact',
  //   component: ContactComponent,
  // },
  // {
  //   path: 'about-us',
  //   component: AboutComponent,
  // },
];
