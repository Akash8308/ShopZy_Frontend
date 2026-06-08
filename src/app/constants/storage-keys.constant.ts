/**
 * Storage Keys - Single source of truth for localStorage and sessionStorage keys
 */

export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'shopzy_access_token',
  REFRESH_TOKEN: 'shopzy_refresh_token',
  USER: 'shopzy_user',
  USER_PREFERENCES: 'shopzy_user_preferences',
} as const;
