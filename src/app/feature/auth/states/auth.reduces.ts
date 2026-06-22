import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

import { initialState } from './auth.states';
import { User } from '../../../model/auth.model';

export const authReducer = createReducer(

    initialState,

    on(AuthActions.login, (state) => ({
        ...state,
        loading: true,
        error: null
    })),

    on(AuthActions.register, (state) => ({
        ...state,
        loading: true,
        error: null
    })),

    on(AuthActions.loginSuccess, (state, { response }) => {

        const user: User = {
            id: response.user.id,
            email: response.user.email,
            role: response.user.role,
            name: response.user.name,
            enabled: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        return {
            ...state,
            loading: false,
            isAuthenticated: true,
            user,
            accessToken: response.accessToken,
            refreshToken: response.refreshToken,
            error: null
        };
    }),

    on(AuthActions.registerSuccess, (state, { response }) => {

        const user: User = {
            id: response.user.id,
            email: response.user.email,
            role: response.user.role,
            name: response.user.name,
            enabled: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        return {
            ...state,
            loading: false,
            isAuthenticated: true,
            user,
            accessToken: response.accessToken,
            refreshToken: response.refreshToken,
            error: null
        };
    }),

    on(AuthActions.loginFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
        isAuthenticated: false
    })),

    on(AuthActions.registrationFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
        isAuthenticated: false
    })),

    on(AuthActions.logout, () => initialState)
);