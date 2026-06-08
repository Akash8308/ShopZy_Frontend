import { Injectable } from '@angular/core';
import { JwtPayload } from '../../../model/auth.model';

/**
 * TokenService
 * Responsibility: JWT parsing, token validation, and expiry detection
 * - Does NOT access localStorage/sessionStorage directly
 * - Only provides token utility methods for analysis
 */
@Injectable({
  providedIn: 'root'
})
export class TokenService {

  /**
   * Decode a JWT token to extract its payload
   */
  decodeToken(token: string): JwtPayload | null {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return null;

      const payload = parts[1];
      const decoded = atob(payload);
      return JSON.parse(decoded) as JwtPayload;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  /**
   * Check if a token is expired (with 30-second buffer)
   */
  isTokenExpired(token: string): boolean {
    const payload = this.decodeToken(token);
    if (!payload || !payload.exp) return true;
    
    // Add 30-second buffer
    const bufferMs = 30 * 1000;
    return Date.now() >= (payload.exp * 1000) - bufferMs;
  }

  /**
   * Get the expiry date of a token
   */
  getExpiryDate(token: string): Date | null {
    const payload = this.decodeToken(token);
    return payload && payload.exp ? new Date(payload.exp * 1000) : null;
  }

  /**
   * Get the time remaining until token expiry in milliseconds
   */
  getTimeUntilExpiry(token: string): number {
    const payload = this.decodeToken(token);
    if (!payload || !payload.exp) return 0;
    return (payload.exp * 1000) - Date.now();
  }

  /**
   * Extract user ID/subject from token
   */
  getSubject(token: string): string | null {
    const payload = this.decodeToken(token);
    return payload?.sub ?? null;
  }
}
