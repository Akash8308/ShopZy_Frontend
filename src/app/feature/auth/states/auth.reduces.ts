import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { initialState } from './auth.states';

export const authReducer = createReducer(

    initialState,

    on(AuthActions.login, (state) => ({
        ...state,
        loading: true
    })),

    on(AuthActions.loginSuccess, (state, { username }) => ({
        ...state,
        loading: false,
        isAuthenticated: true,
        username,
        error: null
    })),

    on(AuthActions.loginFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    on(AuthActions.logout, () => initialState)
);