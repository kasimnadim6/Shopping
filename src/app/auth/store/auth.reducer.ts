import { User } from '../user.model';
import * as AuthActions from './auth.action';
export interface State {
    user: User;
    authError: string;
}

const initialState: State = {
    user: null,
    authError: null
};

export function AuthReducer(state = initialState, action: AuthActions.Actions) {
    switch (action.type) {
        case AuthActions.LOGIN:
            const user = new User(action.payload.email, action.payload.localId,
                action.payload._token, action.payload._tokenExpirationDate);
            return {
                ...state,
                // user: user
                user,
                authError: null
            };
        case AuthActions.LOGOUT:
            return {
                ...state,
                user: null
            };
        case AuthActions.LOGIN_START:
            return {
                ...state,
                authError: null
            };
        case AuthActions.LOGIN_FAIL:
            return {
                ...state,
                user: null,
                authError: action.payload
            };
        default: return state;
    }
}
