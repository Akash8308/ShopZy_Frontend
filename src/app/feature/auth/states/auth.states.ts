export interface AuthState {
    isAuthenticated: boolean;
    loading: boolean;
    username: string | null;
    error: string | null;
}

export const initialState: AuthState = {
    isAuthenticated: false,
    loading: false,
    username: null,
    error: null
};