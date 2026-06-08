import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {

    private actions$ = inject(Actions);
    private router = inject(Router);


    login$ = createEffect(() =>
        this.actions$.pipe(

            ofType(AuthActions.login),
            tap(() => console.log('log in action received')),


            switchMap(({ username, password }) => {

                if (
                    username === 'Onkar' &&
                    password === 'Abc@123'
                ) {

                    return of(
                        AuthActions.loginSuccess({
                            username
                        })
                    );
                }

                return of(
                    AuthActions.loginFailure({
                        error: 'Invalid credentials'
                    })
                );
            })
        )
    );

    redirectAfterLogin$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(AuthActions.loginSuccess),
                tap(() => {
                    this.router.navigate(['/restaurant-list']);
                }),

            ),
        { dispatch: false }
    );

    logInFailure$ = createEffect(
        () => this.actions$.pipe(
            ofType(AuthActions.loginFailure),
            tap(({ error }) => {
                console.log('log in failure action received');
            })
        ),
        { dispatch: false }
    )
}