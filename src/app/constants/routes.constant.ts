/**
 * Route paths - Single source of truth for all application routes
 */

export const ROUTES = {
  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
  },
  HOME: '/dashboard',
  RESTAURANTS: '/restaurant-list',
} as const;
