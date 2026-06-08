import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.states';

export const selectAuthState =
    createFeatureSelector<AuthState>('auth');

export const selectIsAuthenticated =
    createSelector(
        selectAuthState,
        state => state.isAuthenticated
    );

export const selectUser =
    createSelector(
        selectAuthState,
        state => state.user
    );

export const selectAccessToken =
    createSelector(
        selectAuthState,
        state => state.accessToken
    );

export const selectRefreshToken =
    createSelector(
        selectAuthState,
        state => state.refreshToken
    );

export const selectLoading =
    createSelector(
        selectAuthState,
        state => state.loading
    );

export const selectAuthError = createSelector(
    selectAuthState,
    state => state.error
);