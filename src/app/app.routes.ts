import { loadRemoteModule } from '@angular-architects/native-federation';
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/initial', pathMatch: 'full' },
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
  {
    path: 'initial',
    loadChildren: () =>
      import('./features/initial/initial-module').then((m) => m.InitialModule),
  },
  {
    path: 'about',
    loadChildren: () =>
      import('./features/about/about-module').then((m) => m.AboutModule),
  },
  {
    path: 'contact',
    loadChildren: () =>
      import('./features/contact/contact-module').then((m) => m.ContactModule),
  },
  { path: '**', redirectTo: '/initial' },
];
