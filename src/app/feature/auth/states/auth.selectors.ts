import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.states';

export const selectAuthState =
    createFeatureSelector<AuthState>('auth');

export const selectIsAuthenticated =
    createSelector(
        selectAuthState,
        state => state.isAuthenticated
    );

export const selectUsername =
    createSelector(
        selectAuthState,
        state => state.username
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