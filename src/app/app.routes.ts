import { Routes } from '@angular/router';
import { Login } from './feature/auth/pages/login/login';
import { Register } from './feature/auth/pages/register/register';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./feature/auth/pages/login/login').then(c => Login)
    },
    {
        path: 'login',
        loadComponent: () => import('./feature/auth/pages/login/login').then(c => Login)
    },
    {
        path: 'register',
        loadComponent: () => import('./feature/auth/pages/register/register').then(c => Register)
    },
    {
        path: 'restaurant-list',
        loadComponent: () => import('./feature/restaurants/Pages/restaurant-list/restaurant-list').then(c => c.RestaurantList)
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./layout/dashboard/dashboard').then(c => c.Dashboard)
    },


];
