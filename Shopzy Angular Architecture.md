# ShopZy — Production-Grade Angular Frontend Architecture

> **Audience:** Senior frontend engineers who need to start building immediately.
> **Angular version:** 18+ (standalone components, new control flow, signals)
> **Architecture style:** Domain-Driven, Feature-First, Clean Architecture

---

## Table of Contents

1. [Complete Folder Tree](#1-complete-folder-tree)
2. [Folder Explanations](#2-folder-explanations)
3. [TypeScript Models](#3-typescript-models)
4. [Services](#4-services)
5. [Interceptors](#5-interceptors)
6. [Guards](#6-guards)
7. [State Management](#7-state-management)
8. [Constants](#8-constants)
9. [Environment Configuration](#9-environment-configuration)
10. [API Layer Design](#10-api-layer-design)
11. [Routing Architecture](#11-routing-architecture)
12. [Shared Components](#12-shared-components)
13. [Layout Architecture](#13-layout-architecture)
14. [Error Handling Strategy](#14-error-handling-strategy)
15. [Authentication Flow Diagrams](#15-authentication-flow-diagrams)
16. [Refresh Token Sequence Flow](#16-refresh-token-sequence-flow)
17. [Angular Best Practices](#17-angular-best-practices)
18. [Recommended Final Architecture Summary](#18-recommended-final-architecture-summary)

---

## 1. Complete Folder Tree

```
src/
├── app/
│   ├── core/                              # Singleton services, app-wide infrastructure
│   │   ├── auth/
│   │   │   ├── services/
│   │   │   │   ├── auth.service.ts
│   │   │   │   ├── token.service.ts
│   │   │   │   ├── storage.service.ts
│   │   │   │   └── oauth.service.ts
│   │   │   ├── guards/
│   │   │   │   ├── auth.guard.ts
│   │   │   │   ├── role.guard.ts
│   │   │   │   └── guest.guard.ts
│   │   │   └── interceptors/
│   │   │       ├── auth.interceptor.ts
│   │   │       ├── refresh-token.interceptor.ts
│   │   │       ├── error.interceptor.ts
│   │   │       ├── logging.interceptor.ts
│   │   │       └── loading.interceptor.ts
│   │   ├── services/
│   │   │   ├── api.service.ts
│   │   │   ├── notification.service.ts
│   │   │   └── loading.service.ts
│   │   ├── resolvers/
│   │   │   └── user-profile.resolver.ts
│   │   └── core.module.ts                 # (optional if fully standalone)
│   │
│   ├── shared/                            # Reusable UI components, pipes, directives
│   │   ├── components/
│   │   │   ├── header/
│   │   │   │   ├── header.component.ts
│   │   │   │   ├── header.component.html
│   │   │   │   └── header.component.scss
│   │   │   ├── footer/
│   │   │   ├── navbar/
│   │   │   ├── search-bar/
│   │   │   ├── product-card/
│   │   │   ├── product-grid/
│   │   │   ├── loader/
│   │   │   ├── pagination/
│   │   │   ├── modal/
│   │   │   └── toast/
│   │   ├── pipes/
│   │   │   ├── currency-format.pipe.ts
│   │   │   ├── truncate.pipe.ts
│   │   │   └── safe-url.pipe.ts
│   │   ├── directives/
│   │   │   ├── click-outside.directive.ts
│   │   │   ├── lazy-image.directive.ts
│   │   │   └── has-role.directive.ts
│   │   ├── validators/
│   │   │   ├── password-match.validator.ts
│   │   │   ├── strong-password.validator.ts
│   │   │   └── email-unique.validator.ts
│   │   └── utils/
│   │       ├── date.utils.ts
│   │       ├── string.utils.ts
│   │       └── http.utils.ts
│   │
│   ├── features/                          # Domain-specific feature modules
│   │   ├── auth/
│   │   │   ├── pages/
│   │   │   │   ├── login/
│   │   │   │   │   ├── login.component.ts
│   │   │   │   │   ├── login.component.html
│   │   │   │   │   └── login.component.scss
│   │   │   │   ├── register/
│   │   │   │   ├── forgot-password/
│   │   │   │   ├── reset-password/
│   │   │   │   ├── oauth-success/
│   │   │   │   └── oauth-failure/
│   │   │   ├── auth.routes.ts
│   │   │   └── auth.state.ts              # Signals-based local state (or NgRx feature)
│   │   │
│   │   ├── products/
│   │   │   ├── pages/
│   │   │   │   ├── product-list/
│   │   │   │   └── product-detail/
│   │   │   ├── services/
│   │   │   │   ├── product.service.ts
│   │   │   │   └── category.service.ts
│   │   │   ├── models/
│   │   │   │   └── product.model.ts       # (can also live in /models)
│   │   │   ├── store/                     # NgRx feature store (if NgRx chosen)
│   │   │   │   ├── product.actions.ts
│   │   │   │   ├── product.reducer.ts
│   │   │   │   ├── product.effects.ts
│   │   │   │   └── product.selectors.ts
│   │   │   └── products.routes.ts
│   │   │
│   │   ├── cart/
│   │   │   ├── pages/
│   │   │   │   └── cart/
│   │   │   ├── services/
│   │   │   │   └── cart.service.ts
│   │   │   ├── store/
│   │   │   │   ├── cart.actions.ts
│   │   │   │   ├── cart.reducer.ts
│   │   │   │   ├── cart.effects.ts
│   │   │   │   └── cart.selectors.ts
│   │   │   └── cart.routes.ts
│   │   │
│   │   ├── checkout/
│   │   │   ├── pages/
│   │   │   │   └── checkout/
│   │   │   ├── services/
│   │   │   │   └── payment.service.ts
│   │   │   └── checkout.routes.ts
│   │   │
│   │   ├── orders/
│   │   │   ├── pages/
│   │   │   │   ├── order-list/
│   │   │   │   └── order-detail/
│   │   │   ├── services/
│   │   │   │   └── order.service.ts
│   │   │   └── orders.routes.ts
│   │   │
│   │   ├── profile/
│   │   │   ├── pages/
│   │   │   │   └── profile/
│   │   │   ├── services/
│   │   │   │   ├── user.service.ts
│   │   │   │   └── profile.service.ts
│   │   │   └── profile.routes.ts
│   │   │
│   │   └── admin/
│   │       ├── pages/
│   │       │   ├── dashboard/
│   │       │   ├── product-management/
│   │       │   ├── order-management/
│   │       │   └── user-management/
│   │       └── admin.routes.ts
│   │
│   ├── layouts/                           # Layout shell components
│   │   ├── public-layout/
│   │   │   ├── public-layout.component.ts
│   │   │   ├── public-layout.component.html
│   │   │   └── public-layout.component.scss
│   │   ├── auth-layout/
│   │   ├── user-layout/
│   │   └── admin-layout/
│   │
│   ├── models/                            # Global shared interfaces/types
│   │   ├── auth.model.ts
│   │   ├── product.model.ts
│   │   ├── cart.model.ts
│   │   ├── order.model.ts
│   │   ├── payment.model.ts
│   │   └── common.model.ts
│   │
│   ├── constants/                         # App-wide constants
│   │   ├── api-endpoints.constant.ts
│   │   ├── routes.constant.ts
│   │   ├── roles.constant.ts
│   │   ├── storage-keys.constant.ts
│   │   ├── error-messages.constant.ts
│   │   └── success-messages.constant.ts
│   │
│   ├── store/                             # Root NgRx store (if NgRx chosen)
│   │   ├── app.state.ts
│   │   └── index.ts
│   │
│   ├── app.component.ts
│   ├── app.component.html
│   ├── app.component.scss
│   ├── app.config.ts                      # Angular 18 standalone app config
│   └── app.routes.ts                      # Root routing
│
├── environments/
│   ├── environment.ts
│   └── environment.prod.ts
│
└── styles/
    ├── _variables.scss
    ├── _mixins.scss
    ├── _reset.scss
    └── styles.scss
```

---

## 2. Folder Explanations

### `core/`
**Why it exists:** Contains singleton infrastructure that is instantiated once for the lifetime of the application. Guards, interceptors, and core auth services live here. Nothing in `core/` should be imported by feature modules directly — they interact through interfaces and injection tokens.

**What belongs inside it:**
- Auth services (`AuthService`, `TokenService`, `StorageService`, `OAuthService`)
- HTTP interceptors
- Route guards
- App-level resolvers
- Core utility services (`NotificationService`, `LoadingService`, `ApiService`)

### `shared/`
**Why it exists:** Houses reusable, stateless UI building blocks that multiple feature modules consume. Components here have no knowledge of business domain.

**What belongs inside it:**
- Dumb/presentational components (`ProductCard`, `Pagination`, `Modal`)
- Reusable pipes (`CurrencyFormatPipe`, `TruncatePipe`)
- Structural directives (`ClickOutsideDirective`, `HasRoleDirective`)
- Shared validators and utility functions

### `features/`
**Why it exists:** Each sub-folder represents a bounded domain context. Features are lazy-loaded and self-contained. They own their own routing, pages, local services, and state.

**What belongs inside it:**
- Page components (smart/container components)
- Feature-level services
- Feature-level NgRx store slices
- Feature routing file

### `layouts/`
**Why it exists:** Separates layout shells from page content. A layout wraps multiple routes and injects `<router-outlet>`. Changing a layout never affects page components.

### `models/`
**Why it exists:** Centralises TypeScript interfaces. All domain contracts live here to ensure consistency across services, components, and the store.

### `constants/`
**Why it exists:** Eliminates magic strings. API URLs, route paths, role names, and storage keys are defined once and imported everywhere.

### `store/`
**Why it exists:** Root NgRx store registration and global app-state interface. Feature states are registered in their own `store/` sub-folder under each feature.

---

## 3. TypeScript Models

### `models/common.model.ts`

```typescript
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
}

export interface PageResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

export interface ErrorResponse {
  status: number;
  error: string;
  message: string;
  path: string;
  timestamp: string;
  validationErrors?: Record<string, string>;
}
```

### `models/auth.model.ts`

```typescript
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: 'Bearer';
  expiresIn: number;   // seconds
  user: User;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterResponse {
  id: string;
  email: string;
  message: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface JwtPayload {
  sub: string;           // user email or id
  roles: Role[];
  iat: number;
  exp: number;
  jti?: string;          // JWT ID for revocation
}

export type Role = 'ROLE_USER' | 'ROLE_ADMIN' | 'ROLE_MODERATOR';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  roles: Role[];
  emailVerified: boolean;
  provider: AuthProvider;
  createdAt: string;
}

export type AuthProvider = 'LOCAL' | 'GOOGLE';

export interface OAuthUser {
  provider: AuthProvider;
  providerId: string;
  email: string;
  name: string;
  picture?: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
  confirmPassword: string;
}
```

### `models/product.model.ts`

```typescript
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  basePrice: number;
  discountedPrice?: number;
  currency: string;
  brand: Brand;
  category: Category;
  images: ProductImage[];
  variants: ProductVariant[];
  inventory: Inventory;
  rating: number;
  reviewCount: number;
  tags: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductVariant {
  id: string;
  productId: string;
  sku: string;
  size?: string;
  color?: string;
  material?: string;
  price: number;
  stock: number;
  images?: ProductImage[];
}

export interface ProductImage {
  id: string;
  url: string;
  altText: string;
  isPrimary: boolean;
  sortOrder: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parentId?: string;
  imageUrl?: string;
  isActive: boolean;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logoUrl?: string;
}

export interface Inventory {
  productId: string;
  totalStock: number;
  reservedStock: number;
  availableStock: number;
  lowStockThreshold: number;
  isInStock: boolean;
}

export interface ProductFilter {
  categoryId?: string;
  brandId?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  rating?: number;
  search?: string;
  sortBy?: 'price_asc' | 'price_desc' | 'rating' | 'newest';
  page?: number;
  size?: number;
}
```

### `models/cart.model.ts`

```typescript
export interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  couponCode?: string;
  updatedAt: string;
}

export interface CartItem {
  id: string;
  cartId: string;
  product: Product;
  variant?: ProductVariant;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface AddToCartRequest {
  productId: string;
  variantId?: string;
  quantity: number;
}

export interface UpdateCartItemRequest {
  itemId: string;
  quantity: number;
}
```

### `models/order.model.ts`

```typescript
export type OrderStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'PROCESSING'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED'
  | 'REFUNDED';

export interface Order {
  id: string;
  userId: string;
  orderNumber: string;
  status: OrderStatus;
  items: OrderItem[];
  shippingAddress: Address;
  billingAddress: Address;
  payment: Payment;
  subtotal: number;
  shippingCost: number;
  tax: number;
  discount: number;
  total: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  productName: string;
  variantId?: string;
  variantName?: string;
  imageUrl: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Address {
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}
```

### `models/payment.model.ts`

```typescript
export type PaymentStatus = 'PENDING' | 'SUCCESS' | 'FAILED' | 'REFUNDED';
export type PaymentMethodType = 'CARD' | 'UPI' | 'NET_BANKING' | 'WALLET' | 'COD';

export interface Payment {
  id: string;
  orderId: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  method: PaymentMethodType;
  transactionId?: string;
  gatewayResponse?: Record<string, unknown>;
  createdAt: string;
}

export interface PaymentMethod {
  id: string;
  userId: string;
  type: PaymentMethodType;
  last4?: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
  isDefault: boolean;
}

export interface InitiatePaymentRequest {
  orderId: string;
  amount: number;
  currency: string;
  method: PaymentMethodType;
  returnUrl: string;
}
```

---

## 4. Services

### `core/services/api.service.ts`

**Responsibility:** Generic HTTP wrapper with retry, error mapping, and typed responses.

```typescript
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ApiResponse, ErrorResponse } from '../../models/common.model';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiBaseUrl;

  get<T>(path: string, params?: Record<string, string | number | boolean>): Observable<T> {
    let httpParams = new HttpParams();
    if (params) {
      Object.entries(params).forEach(([k, v]) => httpParams = httpParams.set(k, String(v)));
    }
    return this.http.get<ApiResponse<T>>(`${this.baseUrl}${path}`, { params: httpParams }).pipe(
      map(res => res.data),
      retry({ count: 1, delay: 1000 }),
      catchError(this.handleError)
    );
  }

  post<T>(path: string, body: unknown): Observable<T> {
    return this.http.post<ApiResponse<T>>(`${this.baseUrl}${path}`, body).pipe(
      map(res => res.data),
      catchError(this.handleError)
    );
  }

  put<T>(path: string, body: unknown): Observable<T> {
    return this.http.put<ApiResponse<T>>(`${this.baseUrl}${path}`, body).pipe(
      map(res => res.data),
      catchError(this.handleError)
    );
  }

  patch<T>(path: string, body: unknown): Observable<T> {
    return this.http.patch<ApiResponse<T>>(`${this.baseUrl}${path}`, body).pipe(
      map(res => res.data),
      catchError(this.handleError)
    );
  }

  delete<T>(path: string): Observable<T> {
    return this.http.delete<ApiResponse<T>>(`${this.baseUrl}${path}`).pipe(
      map(res => res.data),
      catchError(this.handleError)
    );
  }

  private handleError(error: unknown): Observable<never> {
    const err = error as { error?: ErrorResponse; status?: number };
    return throwError(() => err.error ?? { message: 'An unknown error occurred', status: err.status });
  }
}
```

### `core/auth/services/token.service.ts`

**Responsibility:** JWT parsing, expiry detection, token validation.

```typescript
import { Injectable } from '@angular/core';
import { JwtPayload } from '../../../models/auth.model';

@Injectable({ providedIn: 'root' })
export class TokenService {

  decodeToken(token: string): JwtPayload | null {
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload)) as JwtPayload;
    } catch {
      return null;
    }
  }

  isTokenExpired(token: string): boolean {
    const payload = this.decodeToken(token);
    if (!payload) return true;
    // Add 30-second buffer
    return Date.now() >= (payload.exp - 30) * 1000;
  }

  getExpiryDate(token: string): Date | null {
    const payload = this.decodeToken(token);
    return payload ? new Date(payload.exp * 1000) : null;
  }

  getRoles(token: string): string[] {
    return this.decodeToken(token)?.roles ?? [];
  }

  getUserId(token: string): string | null {
    return this.decodeToken(token)?.sub ?? null;
  }

  getTimeUntilExpiry(token: string): number {
    const payload = this.decodeToken(token);
    if (!payload) return 0;
    return (payload.exp * 1000) - Date.now();
  }
}
```

### `core/auth/services/storage.service.ts`

**Responsibility:** Centralised, XSS-aware token storage. Uses `sessionStorage` for access tokens and `localStorage` only for refresh tokens.

```typescript
import { Injectable } from '@angular/core';
import { STORAGE_KEYS } from '../../../constants/storage-keys.constant';

@Injectable({ providedIn: 'root' })
export class StorageService {

  // Access token: sessionStorage (cleared on tab close, not accessible cross-tab)
  setAccessToken(token: string): void {
    sessionStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
  }

  getAccessToken(): string | null {
    return sessionStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  }

  removeAccessToken(): void {
    sessionStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
  }

  // Refresh token: localStorage (persists across tabs for silent refresh)
  setRefreshToken(token: string): void {
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, token);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
  }

  removeRefreshToken(): void {
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
  }

  setUser(user: object): void {
    sessionStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  }

  getUser<T>(): T | null {
    const raw = sessionStorage.getItem(STORAGE_KEYS.USER);
    try { return raw ? (JSON.parse(raw) as T) : null; } catch { return null; }
  }

  clearAll(): void {
    sessionStorage.clear();
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER_PREFERENCES);
  }
}
```

### `core/auth/services/auth.service.ts`

**Responsibility:** Orchestrates the full auth lifecycle — login, register, logout, OAuth, refresh, and session persistence.

```typescript
import { Injectable, inject, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap, switchMap, catchError, throwError, of } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { TokenService } from './token.service';
import { StorageService } from './storage.service';
import { User, LoginRequest, LoginResponse, RegisterRequest, RegisterResponse, RefreshTokenResponse } from '../../../models/auth.model';
import { API_ENDPOINTS } from '../../../constants/api-endpoints.constant';
import { ROUTES } from '../../../constants/routes.constant';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly api = inject(ApiService);
  private readonly tokenService = inject(TokenService);
  private readonly storageService = inject(StorageService);
  private readonly router = inject(Router);

  // Angular Signals for reactive state
  private readonly _currentUser = signal<User | null>(null);
  private readonly _isLoading = signal<boolean>(false);

  readonly currentUser = this._currentUser.asReadonly();
  readonly isLoading = this._isLoading.asReadonly();
  readonly isLoggedIn = computed(() => this._currentUser() !== null);
  readonly userRoles = computed(() => this._currentUser()?.roles ?? []);

  constructor() {
    this.restoreSession();
  }

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.api.post<LoginResponse>(API_ENDPOINTS.AUTH.LOGIN, request).pipe(
      tap(response => this.handleAuthSuccess(response))
    );
  }

  register(request: RegisterRequest): Observable<RegisterResponse> {
    return this.api.post<RegisterResponse>(API_ENDPOINTS.AUTH.REGISTER, request);
  }

  logout(): void {
    const refreshToken = this.storageService.getRefreshToken();
    if (refreshToken) {
      this.api.post(API_ENDPOINTS.AUTH.LOGOUT, { refreshToken })
        .pipe(catchError(() => of(null)))
        .subscribe();
    }
    this.clearSession();
    this.router.navigate([ROUTES.AUTH.LOGIN]);
  }

  refreshToken(): Observable<RefreshTokenResponse> {
    const refreshToken = this.storageService.getRefreshToken();
    if (!refreshToken) return throwError(() => new Error('No refresh token'));

    return this.api.post<RefreshTokenResponse>(API_ENDPOINTS.AUTH.REFRESH, { refreshToken }).pipe(
      tap(response => {
        this.storageService.setAccessToken(response.accessToken);
        this.storageService.setRefreshToken(response.refreshToken); // Rotation
      }),
      catchError(err => {
        this.clearSession();
        this.router.navigate([ROUTES.AUTH.LOGIN]);
        return throwError(() => err);
      })
    );
  }

  handleOAuthSuccess(token: string, refreshToken: string): void {
    // Called from oauth-success page after redirect
    this.storageService.setAccessToken(token);
    this.storageService.setRefreshToken(refreshToken);
    this.loadUserFromToken(token);
    this.router.navigate([ROUTES.HOME]);
  }

  hasRole(role: string): boolean {
    return this.userRoles().includes(role as never);
  }

  private restoreSession(): void {
    const accessToken = this.storageService.getAccessToken();
    const refreshToken = this.storageService.getRefreshToken();

    if (accessToken && !this.tokenService.isTokenExpired(accessToken)) {
      this.loadUserFromToken(accessToken);
    } else if (refreshToken) {
      this.refreshToken().subscribe();
    }
  }

  private handleAuthSuccess(response: LoginResponse): void {
    this.storageService.setAccessToken(response.accessToken);
    this.storageService.setRefreshToken(response.refreshToken);
    this._currentUser.set(response.user);
    this.storageService.setUser(response.user);
  }

  private loadUserFromToken(token: string): void {
    const stored = this.storageService.getUser<User>();
    if (stored) {
      this._currentUser.set(stored);
    } else {
      // Fetch from API if not cached
      this.api.get<User>(API_ENDPOINTS.USER.ME).subscribe(user => {
        this._currentUser.set(user);
        this.storageService.setUser(user);
      });
    }
  }

  private clearSession(): void {
    this._currentUser.set(null);
    this.storageService.clearAll();
  }
}
```

### `features/products/services/product.service.ts`

```typescript
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import { Product, ProductFilter } from '../../../models/product.model';
import { PageResponse } from '../../../models/common.model';
import { API_ENDPOINTS } from '../../../constants/api-endpoints.constant';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly api = inject(ApiService);

  getProducts(filter: ProductFilter): Observable<PageResponse<Product>> {
    return this.api.get<PageResponse<Product>>(API_ENDPOINTS.PRODUCTS.LIST, filter as Record<string, string | number | boolean>);
  }

  getProductBySlug(slug: string): Observable<Product> {
    return this.api.get<Product>(API_ENDPOINTS.PRODUCTS.BY_SLUG(slug));
  }

  getProductById(id: string): Observable<Product> {
    return this.api.get<Product>(API_ENDPOINTS.PRODUCTS.BY_ID(id));
  }

  getFeaturedProducts(): Observable<Product[]> {
    return this.api.get<Product[]>(API_ENDPOINTS.PRODUCTS.FEATURED);
  }

  searchProducts(query: string, page = 0, size = 20): Observable<PageResponse<Product>> {
    return this.api.get<PageResponse<Product>>(API_ENDPOINTS.PRODUCTS.SEARCH, { query, page, size });
  }
}
```

### `features/cart/services/cart.service.ts`

```typescript
import { Injectable, inject, signal, computed } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import { Cart, CartItem, AddToCartRequest, UpdateCartItemRequest } from '../../../models/cart.model';
import { API_ENDPOINTS } from '../../../constants/api-endpoints.constant';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly api = inject(ApiService);

  private readonly _cart = signal<Cart | null>(null);
  readonly cart = this._cart.asReadonly();
  readonly itemCount = computed(() => this._cart()?.items.reduce((acc, i) => acc + i.quantity, 0) ?? 0);
  readonly total = computed(() => this._cart()?.total ?? 0);

  loadCart(): Observable<Cart> {
    return this.api.get<Cart>(API_ENDPOINTS.CART.BASE).pipe(
      tap(cart => this._cart.set(cart))
    );
  }

  addToCart(request: AddToCartRequest): Observable<Cart> {
    return this.api.post<Cart>(API_ENDPOINTS.CART.ADD, request).pipe(
      tap(cart => this._cart.set(cart))
    );
  }

  updateItem(request: UpdateCartItemRequest): Observable<Cart> {
    return this.api.put<Cart>(API_ENDPOINTS.CART.UPDATE_ITEM(request.itemId), request).pipe(
      tap(cart => this._cart.set(cart))
    );
  }

  removeItem(itemId: string): Observable<Cart> {
    return this.api.delete<Cart>(API_ENDPOINTS.CART.REMOVE_ITEM(itemId)).pipe(
      tap(cart => this._cart.set(cart))
    );
  }

  clearCart(): Observable<void> {
    return this.api.delete<void>(API_ENDPOINTS.CART.CLEAR).pipe(
      tap(() => this._cart.set(null))
    );
  }
}
```

### `core/services/notification.service.ts`

```typescript
import { Injectable, signal } from '@angular/core';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private readonly _toasts = signal<Toast[]>([]);
  readonly toasts = this._toasts.asReadonly();

  show(type: ToastType, message: string, duration = 4000): void {
    const id = crypto.randomUUID();
    this._toasts.update(toasts => [...toasts, { id, type, message, duration }]);
    setTimeout(() => this.dismiss(id), duration);
  }

  success(message: string): void { this.show('success', message); }
  error(message: string): void   { this.show('error', message, 6000); }
  warning(message: string): void { this.show('warning', message); }
  info(message: string): void    { this.show('info', message); }

  dismiss(id: string): void {
    this._toasts.update(toasts => toasts.filter(t => t.id !== id));
  }
}
```

---

## 5. Interceptors

### Execution Order (Registration Order Matters)

```
Request  → [1] Loading → [2] Logging → [3] Auth → [4] RefreshToken
Response ← [5] Error  ← [4] RefreshToken ← [3] Auth ← [2] Logging ← [1] Loading
```

Register in `app.config.ts`:

```typescript
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([
        loadingInterceptor,   // 1st — wraps all requests
        loggingInterceptor,   // 2nd — logs every request
        authInterceptor,      // 3rd — attaches Bearer token
        refreshTokenInterceptor, // 4th — handles 401 silently
        errorInterceptor,     // 5th — maps errors to notifications
      ])
    ),
    // ...
  ]
};
```

### `auth.interceptor.ts`

**Responsibility:** Attaches `Authorization: Bearer <token>` header to every outgoing request, except auth endpoints.

```typescript
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { API_ENDPOINTS } from '../../../constants/api-endpoints.constant';

const PUBLIC_URLS = [
  API_ENDPOINTS.AUTH.LOGIN,
  API_ENDPOINTS.AUTH.REGISTER,
  API_ENDPOINTS.AUTH.REFRESH,
  API_ENDPOINTS.AUTH.OAUTH_CALLBACK,
];

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const storage = inject(StorageService);
  const isPublic = PUBLIC_URLS.some(url => req.url.includes(url));

  if (isPublic) return next(req);

  const token = storage.getAccessToken();
  if (!token) return next(req);

  const authReq = req.clone({
    setHeaders: { Authorization: `Bearer ${token}` }
  });
  return next(authReq);
};
```

### `refresh-token.interceptor.ts`

**Responsibility:** Intercepts 401 responses, attempts a silent token refresh, retries the original request, and serializes concurrent refresh calls.

```typescript
import { HttpInterceptorFn, HttpStatusCode } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { API_ENDPOINTS } from '../../../constants/api-endpoints.constant';

export const refreshTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const storage = inject(StorageService);

  // Never retry refresh endpoint itself
  if (req.url.includes(API_ENDPOINTS.AUTH.REFRESH)) {
    return next(req);
  }

  return next(req).pipe(
    catchError(error => {
      if (error.status !== HttpStatusCode.Unauthorized) {
        return throwError(() => error);
      }

      return authService.refreshToken().pipe(
        switchMap(response => {
          const retryReq = req.clone({
            setHeaders: { Authorization: `Bearer ${response.accessToken}` }
          });
          return next(retryReq);
        }),
        catchError(refreshError => {
          authService.logout();
          return throwError(() => refreshError);
        })
      );
    })
  );
};
```

### `error.interceptor.ts`

**Responsibility:** Catches HTTP errors, maps them to user-friendly notifications, and propagates structured error objects.

```typescript
import { HttpInterceptorFn, HttpStatusCode } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { NotificationService } from '../../services/notification.service';
import { ERROR_MESSAGES } from '../../../constants/error-messages.constant';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const notifications = inject(NotificationService);

  return next(req).pipe(
    catchError(error => {
      switch (error.status) {
        case HttpStatusCode.BadRequest:
          notifications.error(error.error?.message ?? ERROR_MESSAGES.BAD_REQUEST);
          break;
        case HttpStatusCode.Forbidden:
          notifications.error(ERROR_MESSAGES.FORBIDDEN);
          break;
        case HttpStatusCode.NotFound:
          notifications.error(ERROR_MESSAGES.NOT_FOUND);
          break;
        case HttpStatusCode.InternalServerError:
          notifications.error(ERROR_MESSAGES.SERVER_ERROR);
          break;
        case 0:
          notifications.error(ERROR_MESSAGES.NETWORK_ERROR);
          break;
      }
      return throwError(() => error);
    })
  );
};
```

### `loading.interceptor.ts`

```typescript
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { LoadingService } from '../../services/loading.service';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);
  loadingService.start();
  return next(req).pipe(finalize(() => loadingService.stop()));
};
```

### `logging.interceptor.ts`

```typescript
import { HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs';
import { environment } from '../../../../environments/environment';

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  if (environment.production) return next(req);

  const start = Date.now();
  console.groupCollapsed(`[HTTP] ${req.method} ${req.url}`);
  console.log('Request:', req.body);

  return next(req).pipe(
    tap({
      next: res => console.log(`Response (${Date.now() - start}ms):`, res),
      error: err => console.error('Error:', err),
      complete: () => console.groupEnd()
    })
  );
};
```

---

## 6. Guards

### `auth.guard.ts`

**Use case:** Blocks unauthenticated users from accessing protected routes.

```typescript
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ROUTES } from '../../../constants/routes.constant';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isLoggedIn()) return true;

  return router.createUrlTree([ROUTES.AUTH.LOGIN], {
    queryParams: { returnUrl: state.url }
  });
};
```

### `role.guard.ts`

**Use case:** Restricts routes to users with specific roles (e.g., admin-only pages).

```typescript
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ROUTES } from '../../../constants/routes.constant';

export const roleGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const requiredRoles: string[] = route.data['roles'] ?? [];

  if (requiredRoles.length === 0) return true;

  const hasRole = requiredRoles.some(role => auth.hasRole(role));
  if (hasRole) return true;

  return router.createUrlTree([ROUTES.HOME]);
};
```

Route configuration example:
```typescript
{
  path: 'admin',
  canActivate: [authGuard, roleGuard],
  data: { roles: ['ROLE_ADMIN'] },
  loadChildren: () => import('./features/admin/admin.routes')
}
```

### `guest.guard.ts`

**Use case:** Redirects already-authenticated users away from login/register pages.

```typescript
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ROUTES } from '../../../constants/routes.constant';

export const guestGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.isLoggedIn() ? router.createUrlTree([ROUTES.HOME]) : true;
};
```

---

## 7. State Management

### Recommendation: Angular Signals (Primary) + NgRx (for complex async domains)

**Hybrid approach** is recommended for ShopZy:

| Domain              | Approach         | Reason                                         |
|---------------------|------------------|------------------------------------------------|
| Auth state          | Angular Signals  | Simple, reactive, avoids boilerplate           |
| Cart state          | Angular Signals  | Local, per-user, minimal side effects          |
| Notification state  | Angular Signals  | Ephemeral, simple list                         |
| Product catalog     | NgRx             | Complex filtering, pagination, caching         |
| Order management    | NgRx             | Complex async effects, devtools visibility     |
| Admin state         | NgRx             | Multiple parallel operations, audit trail      |

### Why Not Full NgRx?

- NgRx adds 4–5 files per feature (actions, reducer, effects, selectors, state)
- For cart and auth, Signals provide the same reactivity with 80% less code
- NgRx shines for complex async orchestration, optimistic updates, and devtools debugging

### NgRx Store Structure (for Product feature)

**`features/products/store/product.actions.ts`**

```typescript
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Product, ProductFilter } from '../../../models/product.model';
import { PageResponse } from '../../../models/common.model';

export const ProductActions = createActionGroup({
  source: 'Product',
  events: {
    'Load Products': props<{ filter: ProductFilter }>(),
    'Load Products Success': props<{ response: PageResponse<Product> }>(),
    'Load Products Failure': props<{ error: string }>(),
    'Load Product Detail': props<{ slug: string }>(),
    'Load Product Detail Success': props<{ product: Product }>(),
    'Load Product Detail Failure': props<{ error: string }>(),
  }
});
```

**`features/products/store/product.reducer.ts`**

```typescript
import { createReducer, on } from '@ngrx/store';
import { Product } from '../../../models/product.model';
import { PageResponse } from '../../../models/common.model';
import { ProductActions } from './product.actions';

export interface ProductState {
  products: PageResponse<Product> | null;
  selectedProduct: Product | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: null,
  selectedProduct: null,
  isLoading: false,
  error: null,
};

export const productReducer = createReducer(
  initialState,
  on(ProductActions.loadProducts, state => ({ ...state, isLoading: true, error: null })),
  on(ProductActions.loadProductsSuccess, (state, { response }) => ({
    ...state, products: response, isLoading: false
  })),
  on(ProductActions.loadProductsFailure, (state, { error }) => ({
    ...state, error, isLoading: false
  })),
  on(ProductActions.loadProductDetailSuccess, (state, { product }) => ({
    ...state, selectedProduct: product, isLoading: false
  }))
);
```

**`features/products/store/product.effects.ts`**

```typescript
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';
import { ProductService } from '../services/product.service';
import { ProductActions } from './product.actions';

@Injectable()
export class ProductEffects {
  private readonly actions$ = inject(Actions);
  private readonly productService = inject(ProductService);

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      switchMap(({ filter }) =>
        this.productService.getProducts(filter).pipe(
          map(response => ProductActions.loadProductsSuccess({ response })),
          catchError(error => of(ProductActions.loadProductsFailure({ error: error.message })))
        )
      )
    )
  );

  loadProductDetail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProductDetail),
      switchMap(({ slug }) =>
        this.productService.getProductBySlug(slug).pipe(
          map(product => ProductActions.loadProductDetailSuccess({ product })),
          catchError(error => of(ProductActions.loadProductDetailFailure({ error: error.message })))
        )
      )
    )
  );
}
```

**`features/products/store/product.selectors.ts`**

```typescript
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from './product.reducer';

export const selectProductState = createFeatureSelector<ProductState>('products');

export const selectProducts = createSelector(selectProductState, s => s.products?.content ?? []);
export const selectTotalPages = createSelector(selectProductState, s => s.products?.totalPages ?? 0);
export const selectCurrentProduct = createSelector(selectProductState, s => s.selectedProduct);
export const selectProductsLoading = createSelector(selectProductState, s => s.isLoading);
export const selectProductsError = createSelector(selectProductState, s => s.error);
```

---

## 8. Constants

### `constants/api-endpoints.constant.ts`

```typescript
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN:           '/auth/login',
    REGISTER:        '/auth/register',
    LOGOUT:          '/auth/logout',
    REFRESH:         '/auth/refresh',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD:  '/auth/reset-password',
    OAUTH_CALLBACK:  '/auth/oauth2/callback',
  },
  USER: {
    ME:     '/users/me',
    UPDATE: '/users/me',
    AVATAR: '/users/me/avatar',
  },
  PRODUCTS: {
    LIST:         '/products',
    BY_ID:        (id: string) => `/products/${id}`,
    BY_SLUG:      (slug: string) => `/products/slug/${slug}`,
    FEATURED:     '/products/featured',
    SEARCH:       '/products/search',
    ADMIN_CREATE: '/admin/products',
    ADMIN_UPDATE: (id: string) => `/admin/products/${id}`,
    ADMIN_DELETE: (id: string) => `/admin/products/${id}`,
  },
  CATEGORIES: {
    LIST: '/categories',
    BY_ID: (id: string) => `/categories/${id}`,
  },
  CART: {
    BASE:         '/cart',
    ADD:          '/cart/items',
    UPDATE_ITEM:  (itemId: string) => `/cart/items/${itemId}`,
    REMOVE_ITEM:  (itemId: string) => `/cart/items/${itemId}`,
    CLEAR:        '/cart/clear',
  },
  ORDERS: {
    LIST:   '/orders',
    BY_ID:  (id: string) => `/orders/${id}`,
    CREATE: '/orders',
    CANCEL: (id: string) => `/orders/${id}/cancel`,
  },
  PAYMENTS: {
    INITIATE: '/payments/initiate',
    VERIFY:   '/payments/verify',
    METHODS:  '/payments/methods',
  },
  ADMIN: {
    USERS:  '/admin/users',
    ORDERS: '/admin/orders',
    STATS:  '/admin/stats',
  }
} as const;
```

### `constants/routes.constant.ts`

```typescript
export const ROUTES = {
  HOME:         '/',
  AUTH: {
    LOGIN:          '/auth/login',
    REGISTER:       '/auth/register',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD:  '/auth/reset-password',
    OAUTH_SUCCESS:  '/auth/oauth/success',
    OAUTH_FAILURE:  '/auth/oauth/failure',
  },
  PRODUCTS: {
    LIST:   '/products',
    DETAIL: (slug: string) => `/products/${slug}`,
  },
  CART:         '/cart',
  CHECKOUT:     '/checkout',
  ORDERS: {
    LIST:   '/orders',
    DETAIL: (id: string) => `/orders/${id}`,
  },
  PROFILE:      '/profile',
  ADMIN: {
    DASHBOARD:          '/admin/dashboard',
    PRODUCTS:           '/admin/products',
    ORDERS:             '/admin/orders',
    USERS:              '/admin/users',
  }
} as const;
```

### `constants/storage-keys.constant.ts`

```typescript
export const STORAGE_KEYS = {
  ACCESS_TOKEN:      'shopzy_access_token',
  REFRESH_TOKEN:     'shopzy_refresh_token',
  USER:              'shopzy_user',
  USER_PREFERENCES:  'shopzy_preferences',
  CART_GUEST:        'shopzy_guest_cart',
  RECENTLY_VIEWED:   'shopzy_recently_viewed',
} as const;
```

### `constants/roles.constant.ts`

```typescript
export const ROLES = {
  USER:      'ROLE_USER',
  ADMIN:     'ROLE_ADMIN',
  MODERATOR: 'ROLE_MODERATOR',
} as const;

export type AppRole = typeof ROLES[keyof typeof ROLES];
```

### `constants/error-messages.constant.ts`

```typescript
export const ERROR_MESSAGES = {
  BAD_REQUEST:    'Invalid request. Please check your input.',
  UNAUTHORIZED:   'Your session has expired. Please login again.',
  FORBIDDEN:      'You do not have permission to access this resource.',
  NOT_FOUND:      'The requested resource was not found.',
  SERVER_ERROR:   'Something went wrong on our end. Please try again later.',
  NETWORK_ERROR:  'Unable to connect. Please check your internet connection.',
  LOGIN_FAILED:   'Invalid email or password.',
  REGISTER_FAILED:'Registration failed. Please try again.',
  TOKEN_EXPIRED:  'Your session has expired. Please login again.',
  REFRESH_FAILED: 'Unable to refresh your session.',
} as const;
```

---

## 9. Environment Configuration

### `environments/environment.ts`

```typescript
export const environment = {
  production: false,
  appName: 'ShopZy',
  appVersion: '1.0.0',
  apiBaseUrl: 'http://localhost:8080/api/v1',
  oauth: {
    googleLoginUrl: 'http://localhost:8080/oauth2/authorization/google',
    callbackUrl:    'http://localhost:4200/auth/oauth/success',
  },
  features: {
    enableGoogleOAuth: true,
    enableGuestCart:   true,
    enableWishlist:    true,
    enableReviews:     true,
    maintenanceMode:   false,
  },
  pagination: {
    defaultPageSize: 20,
    maxPageSize:     100,
  },
  token: {
    refreshBufferSeconds: 30,  // Refresh 30s before expiry
  },
  logging: {
    enabled: true,
    level: 'debug' as 'debug' | 'info' | 'warn' | 'error',
  }
};
```

### `environments/environment.prod.ts`

```typescript
export const environment = {
  production: true,
  appName: 'ShopZy',
  appVersion: '1.0.0',
  apiBaseUrl: 'https://api.shopzy.com/api/v1',
  oauth: {
    googleLoginUrl: 'https://api.shopzy.com/oauth2/authorization/google',
    callbackUrl:    'https://shopzy.com/auth/oauth/success',
  },
  features: {
    enableGoogleOAuth: true,
    enableGuestCart:   true,
    enableWishlist:    true,
    enableReviews:     true,
    maintenanceMode:   false,
  },
  pagination: {
    defaultPageSize: 20,
    maxPageSize:     100,
  },
  token: {
    refreshBufferSeconds: 60,
  },
  logging: {
    enabled: false,
    level: 'error' as 'debug' | 'info' | 'warn' | 'error',
  }
};
```

---

## 10. API Layer Design

### `app.config.ts` (Angular 18 Standalone)

```typescript
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';
import { authInterceptor } from './core/auth/interceptors/auth.interceptor';
import { refreshTokenInterceptor } from './core/auth/interceptors/refresh-token.interceptor';
import { errorInterceptor } from './core/auth/interceptors/error.interceptor';
import { loggingInterceptor } from './core/auth/interceptors/logging.interceptor';
import { loadingInterceptor } from './core/auth/interceptors/loading.interceptor';
import { productReducer } from './features/products/store/product.reducer';
import { ProductEffects } from './features/products/store/product.effects';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes,
      withComponentInputBinding(),      // Bind route params to @Input()
      withViewTransitions()             // Native view transitions API
    ),
    provideHttpClient(
      withInterceptors([
        loadingInterceptor,
        loggingInterceptor,
        authInterceptor,
        refreshTokenInterceptor,
        errorInterceptor,
      ])
    ),
    provideStore({
      products: productReducer,
      // Add more feature reducers here
    }),
    provideEffects([ProductEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: environment.production }),
  ]
};
```

---

## 11. Routing Architecture

### `app.routes.ts` (Root Router)

```typescript
import { Routes } from '@angular/router';
import { authGuard } from './core/auth/guards/auth.guard';
import { roleGuard } from './core/auth/guards/role.guard';
import { guestGuard } from './core/auth/guards/guest.guard';
import { ROLES } from './constants/roles.constant';

export const routes: Routes = [
  // ─── Public Layout ─────────────────────────────────────────────────
  {
    path: '',
    loadComponent: () => import('./layouts/public-layout/public-layout.component')
      .then(m => m.PublicLayoutComponent),
    children: [
      { path: '', loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent) },
      { path: 'products', loadChildren: () => import('./features/products/products.routes').then(m => m.productsRoutes) },
    ]
  },

  // ─── Auth Layout (guest only) ──────────────────────────────────────
  {
    path: 'auth',
    canActivate: [guestGuard],
    loadComponent: () => import('./layouts/auth-layout/auth-layout.component').then(m => m.AuthLayoutComponent),
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.authRoutes)
  },

  // ─── User Layout (auth required) ──────────────────────────────────
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('./layouts/user-layout/user-layout.component').then(m => m.UserLayoutComponent),
    children: [
      { path: 'cart',     loadChildren: () => import('./features/cart/cart.routes').then(m => m.cartRoutes) },
      { path: 'checkout', loadChildren: () => import('./features/checkout/checkout.routes').then(m => m.checkoutRoutes) },
      { path: 'orders',   loadChildren: () => import('./features/orders/orders.routes').then(m => m.ordersRoutes) },
      { path: 'profile',  loadChildren: () => import('./features/profile/profile.routes').then(m => m.profileRoutes) },
    ]
  },

  // ─── Admin Layout (admin role required) ───────────────────────────
  {
    path: 'admin',
    canActivate: [authGuard, roleGuard],
    data: { roles: [ROLES.ADMIN] },
    loadComponent: () => import('./layouts/admin-layout/admin-layout.component').then(m => m.AdminLayoutComponent),
    loadChildren: () => import('./features/admin/admin.routes').then(m => m.adminRoutes)
  },

  // ─── 404 ───────────────────────────────────────────────────────────
  { path: '**', redirectTo: '' }
];
```

### `features/auth/auth.routes.ts`

```typescript
import { Routes } from '@angular/router';

export const authRoutes: Routes = [
  { path: 'login',           loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent) },
  { path: 'register',        loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent) },
  { path: 'forgot-password', loadComponent: () => import('./pages/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent) },
  { path: 'reset-password',  loadComponent: () => import('./pages/reset-password/reset-password.component').then(m => m.ResetPasswordComponent) },
  { path: 'oauth/success',   loadComponent: () => import('./pages/oauth-success/oauth-success.component').then(m => m.OAuthSuccessComponent) },
  { path: 'oauth/failure',   loadComponent: () => import('./pages/oauth-failure/oauth-failure.component').then(m => m.OAuthFailureComponent) },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
```

### `features/products/products.routes.ts`

```typescript
import { Routes } from '@angular/router';

export const productsRoutes: Routes = [
  { path: '',      loadComponent: () => import('./pages/product-list/product-list.component').then(m => m.ProductListComponent) },
  { path: ':slug', loadComponent: () => import('./pages/product-detail/product-detail.component').then(m => m.ProductDetailComponent) },
];
```

### `features/admin/admin.routes.ts`

```typescript
import { Routes } from '@angular/router';

export const adminRoutes: Routes = [
  { path: '',           redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard',  loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent) },
  { path: 'products',   loadComponent: () => import('./pages/product-management/product-management.component').then(m => m.ProductManagementComponent) },
  { path: 'orders',     loadComponent: () => import('./pages/order-management/order-management.component').then(m => m.OrderManagementComponent) },
  { path: 'users',      loadComponent: () => import('./pages/user-management/user-management.component').then(m => m.UserManagementComponent) },
];
```

---

## 12. Shared Components

### Folder Structure

```
shared/components/
├── header/
│   └── header.component.ts         # Logo, nav, cart icon, user menu
├── footer/
│   └── footer.component.ts         # Links, social, legal
├── navbar/
│   └── navbar.component.ts         # Category navigation
├── search-bar/
│   └── search-bar.component.ts     # Debounced search with autocomplete
├── product-card/
│   └── product-card.component.ts   # Reusable product tile (dumb component)
├── product-grid/
│   └── product-grid.component.ts   # Responsive grid of ProductCards
├── loader/
│   └── loader.component.ts         # Full-page / inline spinner
├── pagination/
│   └── pagination.component.ts     # Page number controls
├── modal/
│   └── modal.component.ts          # Generic dialog with CDK overlay
└── toast/
    └── toast.component.ts          # Notification container (reads NotificationService)
```

### Example: `shared/components/product-card/product-card.component.ts`

```typescript
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Product } from '../../../models/product.model';
import { ROUTES } from '../../../constants/routes.constant';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="product-card">
      <a [routerLink]="productRoute">
        <img [src]="product.images[0]?.url" [alt]="product.name" loading="lazy" />
        <div class="product-info">
          <h3>{{ product.name }}</h3>
          <p class="brand">{{ product.brand.name }}</p>
          <div class="price">
            @if (product.discountedPrice) {
              <span class="discounted">{{ product.discountedPrice | currency }}</span>
              <span class="original">{{ product.basePrice | currency }}</span>
            } @else {
              <span>{{ product.basePrice | currency }}</span>
            }
          </div>
        </div>
      </a>
      <button (click)="onAddToCart.emit(product)" class="btn-cart">Add to Cart</button>
    </article>
  `
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;
  @Output() onAddToCart = new EventEmitter<Product>();

  get productRoute(): string {
    return ROUTES.PRODUCTS.DETAIL(this.product.slug);
  }
}
```

---

## 13. Layout Architecture

### `layouts/public-layout/public-layout.component.ts`

```typescript
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
  selector: 'app-public-layout',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <app-header />
    <main class="main-content">
      <router-outlet />
    </main>
    <app-footer />
  `
})
export class PublicLayoutComponent {}
```

### Layout Matrix

| Layout          | Guard        | Header | Footer | Sidebar | Used for                            |
|-----------------|--------------|--------|--------|---------|-------------------------------------|
| PublicLayout    | None         | ✅     | ✅     | ❌      | Home, product list, product detail  |
| AuthLayout      | guestGuard   | ❌     | ❌     | ❌      | Login, Register, Forgot password    |
| UserLayout      | authGuard    | ✅     | ✅     | ❌      | Cart, Checkout, Orders, Profile     |
| AdminLayout     | authGuard + roleGuard(ADMIN) | ✅ | ❌ | ✅ | Admin dashboard and management   |

---

## 14. Error Handling Strategy

### Global Error Handler

```typescript
import { ErrorHandler, Injectable, inject } from '@angular/core';
import { NotificationService } from '../core/services/notification.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  private readonly notifications = inject(NotificationService);

  handleError(error: unknown): void {
    console.error('[GlobalErrorHandler]', error);

    // Don't show notification for HTTP errors (handled by interceptor)
    if (error instanceof Error && error.message.includes('Http')) return;

    this.notifications.error('An unexpected error occurred. Please refresh the page.');
  }
}
```

Register in `app.config.ts`:
```typescript
{ provide: ErrorHandler, useClass: GlobalErrorHandler }
```

### Form Validation Error Helper

```typescript
// shared/utils/form-error.utils.ts
import { AbstractControl } from '@angular/forms';

export function getFieldError(control: AbstractControl | null): string | null {
  if (!control || !control.errors || !control.touched) return null;

  const errors = control.errors;
  if (errors['required'])    return 'This field is required.';
  if (errors['email'])       return 'Please enter a valid email address.';
  if (errors['minlength'])   return `Minimum ${errors['minlength'].requiredLength} characters required.`;
  if (errors['maxlength'])   return `Maximum ${errors['maxlength'].requiredLength} characters allowed.`;
  if (errors['passwordMismatch']) return 'Passwords do not match.';
  if (errors['weakPassword'])     return 'Password must contain uppercase, lowercase, number, and special character.';

  return 'Invalid input.';
}
```

---

## 15. Authentication Flow Diagrams

### Standard Login Flow

```
User                  LoginComponent            AuthService            Backend API
 │                         │                        │                      │
 │──── Enter credentials ──►│                        │                      │
 │                         │──── login(request) ────►│                      │
 │                         │                        │── POST /auth/login ──►│
 │                         │                        │◄── { accessToken,     │
 │                         │                        │      refreshToken,    │
 │                         │                        │      user }  ─────────│
 │                         │                        │                      │
 │                         │                        │── setAccessToken() ──►(sessionStorage)
 │                         │                        │── setRefreshToken() ─►(localStorage)
 │                         │                        │── _currentUser.set() ─►(Signal)
 │                         │◄── Observable<Response>─│                      │
 │                         │── router.navigate(/) ──►│                      │
 │◄─── Redirected to Home ──│                        │                      │
```

### Google OAuth2 Flow

```
User                Browser                 Angular App              Spring Backend
 │                     │                        │                         │
 │── Click Google ──►  │                        │                         │
 │                     │── Navigate to ─────────►│                         │
 │                     │   /oauth2/authorization/google                    │
 │                     │                        │─── Redirect to Google ──►│
 │                     │◄────────── Google Login page ─────────────────────│
 │── Google Login ───► │                        │                         │
 │                     │──── Google callback ───────────────────────────►  │
 │                     │                        │◄─── Redirect to ─────────│
 │                     │                        │  /auth/oauth/success     │
 │                     │                        │   ?token=xxx             │
 │                     │                        │   &refreshToken=yyy      │
 │                     │                        │                         │
 │                     │                        │─── OAuthSuccessComponent │
 │                     │                        │    reads query params    │
 │                     │                        │    calls handleOAuthSuccess()
 │                     │◄────── Navigated to Home ──────────────────────── │
```

---

## 16. Refresh Token Sequence Flow

```
Component           AuthInterceptor      RefreshTokenInterceptor     AuthService         Backend
    │                     │                       │                      │                  │
    │── HTTP Request ─────►│                       │                      │                  │
    │                     │── Attach Bearer ───────►│                      │                  │
    │                     │                       │── Forward Request ───────────────────────►│
    │                     │                       │◄────────── 401 Unauthorized ──────────────│
    │                     │                       │                      │                  │
    │                     │                       │── refreshToken() ───►│                  │
    │                     │                       │                      │─ POST /auth/refresh►│
    │                     │                       │                      │◄── New tokens ────│
    │                     │                       │                      │── Store new tokens│
    │                     │◄── new accessToken ───│                      │                  │
    │                     │── Retry original req──►│                      │                  │
    │                     │                       │──────────────────────────────────────────►│
    │                     │                       │◄────────── 200 OK ────────────────────────│
    │◄── Response ────────│                       │                      │                  │
    │                                                                                       │
    │  IF refresh fails:                                                                    │
    │                     │                       │── clearSession() ────►│                  │
    │                     │                       │── navigate(/login) ──►│                  │
    │◄── Redirected ──────│                       │                      │                  │
```

---

## 17. Angular Best Practices

### Standalone Components (Angular 18)
All components use `standalone: true` — no `NgModule`. Declare and import what you need at the component level.

### Signals Over RxJS for Simple State
Use Angular Signals for synchronous, reactive state. Reserve RxJS for async streams (HTTP, websockets, timers).

```typescript
// ✅ Signal for simple state
readonly count = signal(0);
readonly doubled = computed(() => this.count() * 2);

// ✅ RxJS for async
this.productService.getProducts(filter).subscribe(...)
```

### Input Binding from Router (Angular 17.1+)

```typescript
// No more ActivatedRoute injection for simple params
@Component({ ... })
export class ProductDetailComponent {
  @Input() slug!: string;  // Auto-bound from route :slug
}
```

### `ChangeDetectionStrategy.OnPush` on All Components
Prevent unnecessary re-renders. Signals and Observables work natively with OnPush.

### Lazy Loading Every Feature
Every feature module is lazy-loaded via `loadChildren` or `loadComponent`. Initial bundle stays under 200KB.

### No Business Logic in Components
Components are thin: they display data and emit events. All logic lives in services.

### Typed HTTP Responses
Always type `HttpClient` calls. Never use `any`.

### Avoid Direct DOM Manipulation
Use Angular's `Renderer2` or built-in structural directives. Never use `document.querySelector`.

### SOLID Principles Applied

| Principle | Application |
|-----------|-------------|
| Single Responsibility | Each service owns one domain |
| Open/Closed | ApiService is extensible without modification |
| Liskov Substitution | Guards implement `CanActivateFn` contract |
| Interface Segregation | Separate interfaces per domain model |
| Dependency Inversion | All services injected, not instantiated directly |

### Security Checklist

| Concern | Mitigation |
|---------|------------|
| XSS | Angular templates auto-escape; never use `innerHTML` without `DomSanitizer` |
| CSRF | Spring Boot backend uses `SameSite=Strict` cookies + CSRF token for state-changing ops |
| Token Storage | Access token in `sessionStorage`; refresh token in `httpOnly` cookie (if supported) or `localStorage` with rotation |
| Token Leakage | Never log tokens; `loggingInterceptor` disabled in production |
| Role Escalation | Backend validates roles on every API call; frontend role guards are UX-only |
| Open Redirect | OAuth `returnUrl` validated against whitelist before redirect |

---

## 18. Recommended Final Architecture Summary

```
┌─────────────────────────────────────────────────────────────────┐
│                         app.config.ts                           │
│   provideRouter | provideHttpClient | provideStore              │
└───────────────────────────┬─────────────────────────────────────┘
                            │
          ┌─────────────────┴──────────────────┐
          │                                    │
   ┌──────▼──────┐                     ┌───────▼──────┐
   │    core/    │                     │   features/  │
   │             │                     │              │
   │ AuthService │◄────────────────────│  auth/       │
   │ TokenService│                     │  products/   │
   │ StorageService                    │  cart/       │
   │ ApiService  │                     │  orders/     │
   │             │                     │  admin/      │
   │ Interceptors│                     └──────┬───────┘
   │ Guards      │                            │
   └──────┬──────┘                     ┌──────▼───────┐
          │                            │   shared/    │
   ┌──────▼──────┐                     │              │
   │  layouts/   │                     │  components/ │
   │             │                     │  pipes/      │
   │ Public      │                     │  directives/ │
   │ Auth        │                     │  validators/ │
   │ User        │                     └──────────────┘
   │ Admin       │
   └─────────────┘
```

### Technology Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| State Management | Signals + NgRx (hybrid) | Signals for auth/cart simplicity; NgRx for products/orders complexity |
| Component Style | Standalone + OnPush | Best practice in Angular 18; no NgModule overhead |
| Token Storage | sessionStorage (access) + localStorage (refresh) | Balances security vs UX |
| HTTP Layer | Functional interceptors | Angular 18 idiomatic; tree-shakeable |
| Route Input Binding | `withComponentInputBinding()` | Eliminates ActivatedRoute boilerplate |
| Error Handling | Interceptor + GlobalErrorHandler + Signal toasts | Layered, consistent, user-friendly |
| Lazy Loading | All feature routes | Optimal initial load performance |

### Development Checklist

- [ ] `ng new shopzy --standalone --routing --style=scss`
- [ ] Install `@ngrx/store @ngrx/effects @ngrx/store-devtools`
- [ ] Set up `environments/` with `ng generate environments`
- [ ] Scaffold folder structure as described above
- [ ] Configure `app.config.ts` with all providers and interceptors
- [ ] Implement `StorageService` and `TokenService` first (no dependencies)
- [ ] Implement `AuthService` next (depends on Storage + Token)
- [ ] Wire up interceptors
- [ ] Implement guards
- [ ] Build shared components with `ChangeDetectionStrategy.OnPush`
- [ ] Feature modules last, lazy-loaded
- [ ] Add `provideStoreDevtools` in dev only

---

*Generated for ShopZy — Angular 18+ Enterprise Architecture*
*Revision: 1.0.0 | Architecture style: DDD-inspired, Feature-first, Standalone*
