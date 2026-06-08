import { Injectable, inject } from '@angular/core';
import { Observable, tap, catchError, of } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { TokenService } from './token.service';
import { StorageService } from './storage.service';
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse, User, RefreshTokenRequest, RefreshTokenResponse } from '../../../model/auth.model';
import { API_ENDPOINTS } from '../../../constants/api-endpoints.constant';

/**
 * AuthService
 * Responsibility: Orchestrates authentication lifecycle
 * - login() - performs login with email/password
 * - logout() - clears authentication state
 * - isAuthenticated() - checks if user has valid tokens
 * - getAccessToken() - retrieves stored access token
 * - refreshToken() - refreshes expired access token
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly api = inject(ApiService);
  private readonly tokenService = inject(TokenService);
  private readonly storageService = inject(StorageService);

  /**
   * Perform login with email and password
   * Stores tokens and user data on success
   */
  login(request: LoginRequest): Observable<LoginResponse> {
    return this.api.post<LoginResponse>(API_ENDPOINTS.AUTH.LOGIN, request).pipe(
      tap(response => this.handleAuthSuccess(response)),
      catchError(error => {
        console.error('Login failed:', error);
        throw error;
      })
    );
  }
  
  register(request: RegisterRequest): Observable<RegisterResponse> {
    return this.api.post<RegisterResponse>(API_ENDPOINTS.AUTH.REGISTER, request).pipe(
      tap(response => this.handleAuthSuccess(response)),
      catchError(error => {
        console.error('Login failed:', error);
        throw error;
      })
    );
  }

  /**
   * Perform logout
   * Clears all stored tokens and user data
   */
  logout(): void {
    this.storageService.clearAll();
  }

  /**
   * Check if user is authenticated
   * Returns true if access token exists and is not expired
   */
  isAuthenticated(): boolean {
    const token = this.getAccessToken();
    if (!token) return false;
    return !this.tokenService.isTokenExpired(token);
  }

  /**
   * Retrieve stored access token
   */
  getAccessToken(): string | null {
    return this.storageService.getAccessToken();
  }

  /**
   * Retrieve stored refresh token
   */
  getRefreshToken(): string | null {
    return this.storageService.getRefreshToken();
  }

  /**
   * Refresh the access token using refresh token
   */
  refreshToken(): Observable<RefreshTokenResponse> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const request: RefreshTokenRequest = { refreshToken };
    return this.api.post<RefreshTokenResponse>(API_ENDPOINTS.AUTH.REFRESH, request).pipe(
      tap(response => {
        // Store the new tokens
        this.storageService.setAccessToken(response.accessToken);
        this.storageService.setRefreshToken(response.refreshToken);
      }),
      catchError(error => {
        console.error('Token refresh failed:', error);
        this.logout();
        throw error;
      })
    );
  }

  /**
   * Get current user from storage
   */
  getCurrentUser(): User | null {
    return this.storageService.getUser();
  }

  /**
   * Internal: handle successful authentication
   */
  private handleAuthSuccess(response: LoginResponse): void {
    // Store tokens
    this.storageService.setAccessToken(response.accessToken);
    this.storageService.setRefreshToken(response.refreshToken);

    // Store minimal user data
    const user: User = {
      id: response.userId,
      email: response.email,
      role: response.role,
      name: '',
      username: '',
      enabled: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.storageService.setUser(user);
  }
}
