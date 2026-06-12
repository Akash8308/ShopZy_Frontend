/**
 * Route paths - Single source of truth for all application routes
 */

export const ROUTES = {
  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
  },
  HOME: '/home',
  RESTAURANTS: '/restaurant-list',
} as const;
