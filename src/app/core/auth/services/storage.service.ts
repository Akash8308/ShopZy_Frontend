import { Injectable } from '@angular/core';
import { STORAGE_KEYS } from '../../../constants/storage-keys.constant';
import { User } from '../../../model/auth.model';

/**
 * StorageService
 * Responsibility: Centralized token and user storage
 * - Access Token: stored in sessionStorage (cleared on tab close)
 * - Refresh Token: stored in localStorage (persists across tabs for silent refresh)
 * - User data: stored in sessionStorage
 */
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  // ============ Access Token (Session Storage) ============

  setAccessToken(token: string): void {
    sessionStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
  }

  getAccessToken(): string | null {
    return sessionStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  }

  removeAccessToken(): void {
    sessionStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
  }

  // ============ Refresh Token (Local Storage) ============

  setRefreshToken(token: string): void {
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, token);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
  }

  removeRefreshToken(): void {
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
  }

  // ============ User Data (Session Storage) ============

  setUser(user: User): void {
    sessionStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  }

  getUser(): User | null {
    const raw = sessionStorage.getItem(STORAGE_KEYS.USER);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as User;
    } catch (error) {
      console.error('Error parsing stored user:', error);
      return null;
    }
  }

  removeUser(): void {
    sessionStorage.removeItem(STORAGE_KEYS.USER);
  }

  // ============ Clear All ============

  clearAll(): void {
    // Clear session storage completely
    sessionStorage.clear();
    // Explicitly clear refresh token from local storage
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER_PREFERENCES);
  }

  /**
   * Check if user has valid tokens stored
   */
  hasValidTokens(): boolean {
    return !!(this.getAccessToken() || this.getRefreshToken());
  }
}
