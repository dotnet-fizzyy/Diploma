import * as UserActions from '../actions/currentUserActions';
import { ICurrentUserState } from '../store/state';

const initialState: ICurrentUserState = {
    isAuthenticationSuccessful: false,
    wasCustomerCreated: false,
    accessToken: '',
    refreshToken: '',
    user: null,
};

export default function currentUserReducer(state = initialState, action: UserActions.CurrentUserActionTypes) {
    switch (action.type) {
        case UserActions.CurrentUserActions.ADD_USER:
        case UserActions.CurrentUserActions.VERIFY_USER_SUCCESS:
            return handleAddUser(state, action);
        case UserActions.CurrentUserActions.AUTHENTICATION_SUCCESS:
            return handleAuthenticationSuccess(state, action);
        case UserActions.CurrentUserActions.AUTHENTICATION_FAILURE:
            return handleAuthenticationFailure(state, action);
        case UserActions.CurrentUserActions.REGISTRATION_SUCCESS:
            return handleRegistrationSuccess(state, action);
        case UserActions.CurrentUserActions.HIDE_CUSTOMER_SUCCESSFUL_REGISTRATION:
            return handleHideCustomerSuccessfulRegistration(state, action);
        default:
            return state;
    }
}

function handleAuthenticationSuccess(
    state: ICurrentUserState,
    action: UserActions.IAuthenticationSuccess
): ICurrentUserState {
    return {
        ...state,
        isAuthenticationSuccessful: true,
        accessToken: action.payload.accessToken.value,
        refreshToken: action.payload.refreshToken.value,
        user: action.payload.user,
    };
}

function handleRegistrationSuccess(
    state: ICurrentUserState,
    action: UserActions.IRegistrationSuccess
): ICurrentUserState {
    return {
        ...state,
        wasCustomerCreated: true,
    };
}

function handleAuthenticationFailure(
    state: ICurrentUserState,
    action: UserActions.IAuthenticationFailure
): ICurrentUserState {
    return {
        ...state,
        isAuthenticationSuccessful: false,
    };
}

function handleAddUser(state: ICurrentUserState, action: UserActions.IAddUser): ICurrentUserState {
    return {
        ...state,
        user: action.payload,
    };
}

function handleHideCustomerSuccessfulRegistration(
    state: ICurrentUserState,
    action: UserActions.IHideCustomerSuccessfulRegistration
): ICurrentUserState {
    return {
        ...state,
        wasCustomerCreated: false,
    };
}
