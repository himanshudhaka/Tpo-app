import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClgTabPage } from './clg-tab.page';

const routes: Routes = [
  {
    path: '',
    component: ClgTabPage,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomePageModule),
      },
      {
        path: 'home',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomePageModule),
      },
      {
        path: 'job',
        loadChildren: () =>
          import('./job/job.module').then((m) => m.JobPageModule),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./profile/profile.module').then((m) => m.ProfilePageModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClgTabPageRoutingModule {}
