/**
 * API Endpoints - Single source of truth for all backend routes
 */

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/login',
    LOGOUT: '/logout',
    REGISTER: '/register',
    REFRESH: '/refresh-token',
  },
  USER: {
    ME: '/me',
    PROFILE: '/user/profile',
  },
} as const;
