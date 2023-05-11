import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabPage } from './tab.page';

const routes: Routes = [
  {
    path: '',
    component: TabPage,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./feed/feed.module').then((m) => m.FeedPageModule),
      },
      {
        path: 'feed',
        loadChildren: () =>
          import('./feed/feed.module').then((m) => m.FeedPageModule),
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
export class TabPageRoutingModule {}
