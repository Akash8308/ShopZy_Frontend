import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { map, switchMap, tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth/services/auth.service';
import { StorageService } from '../../../core/auth/services/storage.service';
import { ROUTES } from '../../../constants/routes.constant';
import { LoginRequest, RegisterRequest } from '../../../model/auth.model';
import { create } from 'domain';

@Injectable()
export class AuthEffects {

    private readonly actions$ = inject(Actions);
    private readonly router = inject(Router);
    private readonly authService = inject(AuthService);
    private readonly storageService = inject(StorageService);

    /**
     * Login effect - calls backend API
     */
    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.login),
            switchMap(({ email, password }) => {
                const request: LoginRequest = { email, password };
                return this.authService.login(request).pipe(
                    map(response => 
                        AuthActions.loginSuccess({ response })
                    ),
                    catchError(error => {
                        const errorMessage = error?.error?.message || 
                                           error?.message || 
                                           'Invalid email or password';
                        console.error('Login error:', error);
                        return of(
                            AuthActions.loginFailure({ error: errorMessage })
                        );
                    })
                );
            })
        )
    );

    /**
     * Redirect after successful login
     */
    redirectAfterLogin$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(AuthActions.loginSuccess),
                tap(({ response }) => {
                    console.log('Login successful, redirecting to dashboard');
                    this.router.navigate([ROUTES.HOME]);
                })
            ),
        { dispatch: false }
    );

    register$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.register),
            switchMap(({ username, email, password }) => {
                const request: RegisterRequest = { username, email, password };
                return this.authService.register(request).pipe(
                    map(response => 
                        AuthActions.registerSuccess({ response })
                    ),
                    catchError(error => {
                        const errorMessage = error?.error?.message || 
                                           error?.message || 
                                           'Invalid email or password';
                        console.error('Login error:', error);
                        return of(
                            AuthActions.registrationFailure({ error: errorMessage })
                        );
                    })
                );
            })
        )
    );

    /**
     * Handle logout
     */
    logout$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(AuthActions.logout),
                tap(() => {
                    this.authService.logout();
                    this.router.navigate([ROUTES.AUTH.LOGIN]);
                })
            ),
        { dispatch: false }
    );
}