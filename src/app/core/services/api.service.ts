import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ErrorResponse } from '../../model/common.model';

/**
 * ApiService
 * Responsibility: Centralized HTTP communication with base URL and error handling
 * - Uses environment.apiBaseUrl for all requests
 * - Handles request retry and error mapping
 * - Returns typed responses
 * - Interceptors (auth, refresh, error handling) are applied globally via app.config.ts
 */
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiBaseUrl;

  /**
   * GET request
   */
  get<T>(endpoint: string, params?: Record<string, string | number | boolean>): Observable<T> {
    let httpParams = new HttpParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        httpParams = httpParams.set(key, String(value));
      });
    }

    return this.http.get<T>(`${this.baseUrl}${endpoint}`, { params: httpParams }).pipe(
      retry({ count: 1, delay: 1000 }),
      catchError(error => this.handleError(error))
    );
  }

  /**
   * POST request
   */
  post<T>(endpoint: string, body: unknown): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}${endpoint}`, body).pipe(
      catchError(error => this.handleError(error))
    );
  }

  /**
   * PUT request
   */
  put<T>(endpoint: string, body: unknown): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}${endpoint}`, body).pipe(
      catchError(error => this.handleError(error))
    );
  }

  /**
   * PATCH request
   */
  patch<T>(endpoint: string, body: unknown): Observable<T> {
    return this.http.patch<T>(`${this.baseUrl}${endpoint}`, body).pipe(
      catchError(error => this.handleError(error))
    );
  }

  /**
   * DELETE request
   */
  delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}${endpoint}`).pipe(
      catchError(error => this.handleError(error))
    );
  }

  /**
   * Error handler - converts HTTP errors to structured ErrorResponse
   */
  private handleError(error: unknown): Observable<never> {
    const httpError = error as { error?: ErrorResponse; status?: number; message?: string };

    // If backend returned structured error, use it
    if (httpError.error && typeof httpError.error === 'object') {
      return throwError(() => httpError.error);
    }

    // Otherwise create a generic error response
    const errorResponse: ErrorResponse = {
      status: httpError.status ?? 500,
      error: 'Unknown Error',
      message: httpError.message ?? 'An unexpected error occurred',
      path: '',
      timestamp: new Date().toISOString(),
    };

    return throwError(() => errorResponse);
  }
}
