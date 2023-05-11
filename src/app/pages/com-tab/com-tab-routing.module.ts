import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComTabPage } from './com-tab.page';

const routes: Routes = [
  {
    path: '',
    component: ComTabPage,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomePageModule),
      },
      {
        path: 'drive',
        loadChildren: () =>
          import('./drive/drive.module').then((m) => m.DrivePageModule),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./profile/profile.module').then((m) => m.ProfilePageModule),
      },
      {
        path: '',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomePageModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComTabPageRoutingModule {}
