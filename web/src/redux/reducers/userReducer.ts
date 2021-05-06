import * as UserActions from '../actions/userActions';
import { IUserState } from '../store/state';

const initialState: IUserState = {
    isAuthenticationSuccessful: false,
    wasCustomerCreated: false,
    user: null,
    isLoading: false,
    selectedTeam: '',
    selectedProject: '',
};

export default function userReducer(state = initialState, action: UserActions.CurrentUserActionTypes) {
    switch (action.type) {
        case UserActions.UserActions.VERIFY_USER_REQUEST:
            return handleVerifyUserRequest(state);
        case UserActions.UserActions.ADD_USER:
        case UserActions.UserActions.VERIFY_USER_SUCCESS:
        case UserActions.UserActions.UPDATE_PROFILE_SETTINGS_SUCCESS:
            return handleGetUser(state, action);
        case UserActions.UserActions.VERIFY_USER_FAILURE:
            return handleVerifyUserFailure(state);
        case UserActions.UserActions.AUTHENTICATION_SUCCESS:
            return handleAuthenticationSuccess(state, action);
        case UserActions.UserActions.AUTHENTICATION_FAILURE:
            return handleAuthenticationFailure(state);
        case UserActions.UserActions.REGISTRATION_SUCCESS:
            return handleRegistrationSuccess(state);
        case UserActions.UserActions.HIDE_CUSTOMER_SUCCESSFUL_REGISTRATION:
            return handleHideCustomerSuccessfulRegistration(state);
        case UserActions.UserActions.UPDATE_AVATAR_SUCCESS:
            return handleUpdateAvatarLink(state, action);
        case UserActions.UserActions.CHANGE_USER_PROJECT:
            return handleChangeUserProject(state, action);
        case UserActions.UserActions.CHANGE_USER_TEAM:
            return handleChangeUserTeam(state, action);
        case UserActions.UserActions.LOGOUT_USER:
            return handleUserLogOut();
        default:
            return state;
    }
}

function handleVerifyUserRequest(state: IUserState): IUserState {
    return {
        ...state,
        isLoading: true,
    };
}

function handleVerifyUserFailure(state: IUserState): IUserState {
    return {
        ...state,
        isLoading: false,
    };
}

function handleAuthenticationSuccess(state: IUserState, action: UserActions.IAuthenticationSuccess): IUserState {
    return {
        ...state,
        isAuthenticationSuccessful: true,
        isLoading: false,
        user: action.payload,
        selectedTeam:
            action.payload.projects && action.payload.projects.length ? action.payload.projects[0].projectId : '',
        selectedProject: action.payload.teams && action.payload.teams.length ? action.payload.teams[0].teamId : '',
    };
}

function handleRegistrationSuccess(state: IUserState): IUserState {
    return {
        ...state,
        wasCustomerCreated: true,
    };
}

function handleAuthenticationFailure(state: IUserState): IUserState {
    return {
        ...state,
        isAuthenticationSuccessful: false,
    };
}

function handleGetUser(
    state: IUserState,
    action: UserActions.IAddUser | UserActions.IUpdateProfileSettingsSuccess | UserActions.IVerifyUserSuccess
): IUserState {
    return {
        ...state,
        user: {
            ...state.user,
            ...action.payload,
        },
        selectedProject:
            action.payload.projects && action.payload.projects.length ? action.payload.projects[0].projectId : '',
        selectedTeam: action.payload.teams && action.payload.teams.length ? action.payload.teams[0].teamId : '',
        isLoading: false,
    };
}

function handleHideCustomerSuccessfulRegistration(state: IUserState): IUserState {
    return {
        ...state,
        wasCustomerCreated: false,
    };
}

function handleUpdateAvatarLink(state: IUserState, action: UserActions.IUpdateAvatarSuccess): IUserState {
    return {
        ...state,
        user: {
            ...state.user,
            avatarLink: action.payload,
        },
    };
}

function handleChangeUserProject(state: IUserState, action: UserActions.IChangeUserProject): IUserState {
    return {
        ...state,
        selectedProject: action.payload,
    };
}

function handleChangeUserTeam(state: IUserState, action: UserActions.IChangeUserTeam): IUserState {
    return {
        ...state,
        selectedTeam: action.payload,
    };
}

function handleUserLogOut(): IUserState {
    return initialState;
}
