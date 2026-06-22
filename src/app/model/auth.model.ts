/**
 * Backend Contract for Authentication
 * All models strictly match the Spring Boot backend responses
 */

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User
}

export interface RegisterRequest{
    username: string;
    email: string;
    password: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface JwtPayload {
  sub: string;
  exp: number;
  iat: number;
  roles?: string[];
}

export interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  error: string | null;
}
