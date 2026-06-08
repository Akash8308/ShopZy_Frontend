import { User } from '../../../model/auth.model';

export interface AuthState {
    isAuthenticated: boolean;
    loading: boolean;
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;
    error: string | null;
}

export const initialState: AuthState = {
    isAuthenticated: false,
    loading: false,
    user: null,
    accessToken: null,
    refreshToken: null,
    error: null
};