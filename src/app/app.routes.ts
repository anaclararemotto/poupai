import { loadRemoteModule } from '@angular-architects/native-federation';
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'mfe',
    loadComponent: () =>
      loadRemoteModule('mfe', './Component').then((m) => m.App),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./features/login/login-module').then((m) => m.LoginModule),
  },
  { path: '**', redirectTo: '/login' },
];
