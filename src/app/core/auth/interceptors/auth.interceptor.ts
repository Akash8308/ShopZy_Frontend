import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { API_ENDPOINTS } from '../../../constants/api-endpoints.constant';

/**
 * AuthInterceptor
 * Responsibility: Automatically attach Bearer token to all requests except public endpoints
 * - Reads token from StorageService (never directly from localStorage)
 * - Skips public endpoints (login, register, etc.)
 * - Formats Authorization header as: "Bearer <token>"
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const storageService = inject(StorageService);

  // List of public endpoints that don't require authentication
  const publicEndpoints = [
    API_ENDPOINTS.AUTH.LOGIN,
    API_ENDPOINTS.AUTH.REGISTER,
    API_ENDPOINTS.AUTH.REFRESH,
  ];

  // Check if current request is to a public endpoint
  const isPublicEndpoint = publicEndpoints.some(endpoint => req.url.includes(endpoint));

  // If public endpoint, proceed without token
  if (isPublicEndpoint) {
    return next(req);
  }

  // Get access token from storage
  const token = storageService.getAccessToken();

  // If no token available, proceed as-is
  if (!token) {
    return next(req);
  }

  // Clone request and add Authorization header
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  return next(authReq);
};
