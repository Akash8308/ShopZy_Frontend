import { Injectable, inject } from '@angular/core';
import { Observable, tap, catchError, of } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { TokenService } from './token.service';
import { StorageService } from './storage.service';
import { LoginRequest, AuthResponse, RegisterRequest, User, RefreshTokenRequest, RefreshTokenResponse } from '../../../model/auth.model';
import { API_ENDPOINTS } from '../../../constants/api-endpoints.constant';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly api = inject(ApiService);
  private readonly tokenService = inject(TokenService);
  private readonly storageService = inject(StorageService);

  login(request: LoginRequest): Observable<AuthResponse> {
    return this.api.post<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, request).pipe(
      tap(response => this.handleAuthSuccess(response)),
      catchError(error => {
        console.error('Login failed:', error);
        throw error;
      })
    );
  }
  
  exchange(code: string): Observable<AuthResponse> {
    return this.api.post<AuthResponse>( `${API_ENDPOINTS.AUTH.EXCHANGE}?code=${encodeURIComponent(code)}`, {}).pipe(
      tap(response => this.handleAuthSuccess(response)),
      catchError(error => {
        console.error('Login failed:', error);
        throw error;
      })
    );
  }
  
  register(request: RegisterRequest): Observable<AuthResponse> {
    return this.api.post<AuthResponse>(API_ENDPOINTS.AUTH.REGISTER, request).pipe(
      tap(response => this.handleAuthSuccess(response)),
      catchError(error => {
        console.error('Login failed:', error);
        throw error;
      })
    );
  }

  logout(): void {
    this.storageService.clearAll();
  }

  isAuthenticated(): boolean {
    const token = this.getAccessToken();
    if (!token) return false;
    return !this.tokenService.isTokenExpired(token);
  }

  
  getAccessToken(): string | null {
    return this.storageService.getAccessToken();
  }

  
  getRefreshToken(): string | null {
    return this.storageService.getRefreshToken();
  }

  
  refreshToken(): Observable<RefreshTokenResponse> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const request: RefreshTokenRequest = { refreshToken };
    return this.api.post<RefreshTokenResponse>(API_ENDPOINTS.AUTH.REFRESH, request).pipe(
      tap(response => {
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

  
  getCurrentUser(): User | null {
    return this.storageService.getUser();
  }

  
  private handleAuthSuccess(response: AuthResponse): void {
    // Store tokens
    this.storageService.setAccessToken(response.accessToken);
    this.storageService.setRefreshToken(response.refreshToken);

    // Store minimal user data
    const user: User = {
      id: response.userId,
      email: response.email,
      role: response.role,
      name: '',
      enabled: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.storageService.setUser(user);
  }
}
