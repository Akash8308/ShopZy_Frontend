import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { initialState } from './auth.states';
import { User } from '../../../model/auth.model';

export const authReducer = createReducer(

    initialState,

    // Login action - set loading state
    on(AuthActions.login, (state) => ({
        ...state,
        loading: true,
        error: null
    })),

    // Login success - store tokens and user
    on(AuthActions.loginSuccess, (state, { response }) => {
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

    // Login failure
    on(AuthActions.loginFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
        isAuthenticated: false
    })),

    // Logout
    on(AuthActions.logout, () => initialState)
);