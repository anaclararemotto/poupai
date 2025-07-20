import { loadRemoteModule } from '@angular-architects/native-federation';
import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/initial', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () =>
      loadRemoteModule('mfe', './Component').then((m) => m.App), canActivate: [AuthGuard],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./features/login/login-module').then((m) => m.LoginModule),
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('./features/signup/signup-module').then((m) => m.SignupModule),
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
  {
    path: 'services',
    loadChildren: () =>
      import('./features/services/services-module').then((m) => m.ServicesModule),
  },
  { path: '**', redirectTo: '/initial' },
];
