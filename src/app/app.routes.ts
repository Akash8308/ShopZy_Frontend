import { Routes } from '@angular/router';
import { authGuard } from './core/auth/guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./feature/auth/pages/login/login').then(c => c.Login)
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./feature/auth/pages/login/login').then(c => c.Login)
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./feature/auth/pages/register/register').then(c => c.Register)
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./layout/dashboard/dashboard')
        .then(c => c.Dashboard)
  },
  {
    path: 'home',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./feature/home/home')
        .then(c => c.HomeComponent)
  }
];