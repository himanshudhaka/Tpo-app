import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from './guards/auth-guard.guard';
import { StdGuardGuard } from './guards/std-guard.guard';
import { ClgGuardGuard } from './guards/clg-guard.guard';
const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./pages/register/register.module').then(
        (m) => m.RegisterPageModule
      ),
  },
  {
    path: 'tab',
    loadChildren: () =>
      import('./pages/tab/tab.module').then((m) => m.TabPageModule),
    canActivate: [AuthGuardGuard],
    data: { type: 'student' },
  },
  {
    path: 'clg-tab',
    loadChildren: () =>
      import('./pages/clg-tab/clg-tab.module').then((m) => m.ClgTabPageModule),
    canActivate: [AuthGuardGuard],
    data: { type: 'college' },
  },
  {
    path: 'com-tab',
    loadChildren: () =>
      import('./pages/com-tab/com-tab.module').then((m) => m.ComTabPageModule),
    canActivate: [AuthGuardGuard],
    data: { type: 'company' },
  },
  {
    path: 'details',
    loadChildren: () => import('./pages/details/details.module').then( m => m.DetailsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
