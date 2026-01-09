import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage-component/homepage-component';
import { AboutPageComponent } from './about-page-component/about-page-component';
import { FrontPageComponent } from './front-page-component/front-page-component';

/**
 * Creates paths to different routes in the application.
 */

export const routes: Routes = [
  {
    path: 'homepage',
    component: FrontPageComponent,
  },
  {
    path: 'search',
    component: HomepageComponent,
  },
  {
    path: 'about-us',
    component: AboutPageComponent,
  },
  // {
  //   path: 'contact',
  //   component: ContactComponent,
  // },
];
