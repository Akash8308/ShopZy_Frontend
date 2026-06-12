/**
 * API Endpoints - Single source of truth for all backend routes
 */

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh-token',
    EXCHANGE: '/auth/exchange',
  },
  USER: {
    ME: '/me',
    PROFILE: '/user/profile',
  },
} as const;
