import { Routes } from '@angular/router';
import { Login } from './feature/auth/pages/login/login';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./feature/auth/pages/login/login').then(c => Login)
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
