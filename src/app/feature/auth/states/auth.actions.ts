import { createAction, props } from '@ngrx/store';
import { LoginResponse, RegisterResponse, User } from '../../../model/auth.model';

export const login = createAction(
    '[Auth] Login',
    props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
    '[Auth] Login Success',
    props<{ response: LoginResponse }>()
);

export const loginFailure = createAction(
    '[Auth] Login Failure',
    props<{ error: string }>()
);

export const logout = createAction(
    '[Auth] Logout'
);

export const logout$ = createAction(
    '[Auth] Logout Success'
);

export const register = createAction(
    '[Auth] Register',
    props<{ username: string, email: string; password: string }>()
)

export const registerSuccess = createAction(
    '[Auth] Register Success',
    props<{ response: RegisterResponse }>()
);

export const registrationFailure = createAction(
    '[Auth] Registration Failed',
    props<{ error: string }>()
);