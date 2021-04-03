import * as UserActions from '../actions/userActions';
import { ICurrentUserState } from '../store/state';

const initialState: ICurrentUserState = {
    isAuthenticationSuccessful: false,
    wasCustomerCreated: false,
    accessToken: '',
    refreshToken: '',
    user: null,
    isLoading: false,
};

export default function userReducer(state = initialState, action: UserActions.CurrentUserActionTypes) {
    switch (action.type) {
        case UserActions.UserActions.VERIFY_USER_REQUEST:
            return handleVerifyUserRequest(state, action);
        case UserActions.UserActions.ADD_USER:
        case UserActions.UserActions.VERIFY_USER_SUCCESS:
            return handleAddUser(state, action);
        case UserActions.UserActions.VERIFY_USER_FAILURE:
            return handleVerifyUserFailure(state);
        case UserActions.UserActions.AUTHENTICATION_SUCCESS:
            return handleAuthenticationSuccess(state, action);
        case UserActions.UserActions.AUTHENTICATION_FAILURE:
            return handleAuthenticationFailure(state, action);
        case UserActions.UserActions.REGISTRATION_SUCCESS:
            return handleRegistrationSuccess(state, action);
        case UserActions.UserActions.HIDE_CUSTOMER_SUCCESSFUL_REGISTRATION:
            return handleHideCustomerSuccessfulRegistration(state, action);
        case UserActions.UserActions.UPDATE_AVATAR_SUCCESS:
            return handleUpdateAvatarLink(state, action);
        default:
            return state;
    }
}

function handleVerifyUserRequest(state: ICurrentUserState, action: UserActions.IVerifyUserRequest): ICurrentUserState {
    return {
        ...state,
        isLoading: true,
    };
}

function handleVerifyUserFailure(state: ICurrentUserState): ICurrentUserState {
    return {
        ...state,
        isLoading: false,
    };
}

function handleAuthenticationSuccess(
    state: ICurrentUserState,
    action: UserActions.IAuthenticationSuccess
): ICurrentUserState {
    return {
        ...state,
        isAuthenticationSuccessful: true,
        isLoading: false,
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
        isLoading: false,
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

function handleUpdateAvatarLink(state: ICurrentUserState, action: UserActions.IUpdateAvatarSuccess): ICurrentUserState {
    return {
        ...state,
        user: {
            ...state.user,
            avatarLink: action.payload,
        },
    };
}
