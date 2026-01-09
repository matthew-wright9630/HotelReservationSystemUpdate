import { Routes } from '@angular/router';
import { SearchComponent } from './search-component/search-component';
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
    component: SearchComponent,
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
