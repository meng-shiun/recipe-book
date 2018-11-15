import * as Auth from './auth.actions';

export interface State {
    token: string,
    authenticated: boolean
}

const initialState: State = {
    token: null,
    authenticated: false
};

export function AuthReducer(state = initialState, action: Auth.AuthActions) {
    switch (action.type) {
        case Auth.SIGNUP:
        case Auth.SIGNIN:
            console.log(action.type)
            return {
                ...state,
                authenticated: true
            };
        case Auth.LOGOUT:
            console.log(action.type)
            return {
                ...state,
                token: null,
                authenticated: false
            };
        case Auth.SET_TOKEN:
            console.log(action.type)
            return {
                ...state
            };
        default:
            return state;
    }
}