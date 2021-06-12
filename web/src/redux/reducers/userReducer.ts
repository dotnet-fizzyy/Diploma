import { IUserProject, IUserTeam } from '../../types/userTypes';
import {
    ICreateProjectSuccess,
    IRemoveProjectSuccess,
    IUpdateProjectSuccess,
    ProjectActions,
} from '../actions/projectActions';
import { ICreateTeamSuccess, IRemoveTeamSuccess, IUpdateTeamSuccess, TeamActions } from '../actions/teamActions';
import * as UserActions from '../actions/userActions';
import { IUserState } from '../store/state';

const initialState: IUserState = {
    isAuthenticationSuccessful: false,
    wasCustomerCreated: false,
    user: null,
    isLoading: false,
    selectedTeam: '',
    selectedProject: '',
    emailExists: false,
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case UserActions.UserActions.VERIFY_USER_REQUEST:
        case UserActions.UserActions.AUTHENTICATION_REQUEST:
            return handleVerifyUserRequest(state);
        case UserActions.UserActions.ADD_USER:
        case UserActions.UserActions.VERIFY_USER_SUCCESS:
        case UserActions.UserActions.UPDATE_PROFILE_SETTINGS_SUCCESS:
        case UserActions.UserActions.AUTHENTICATION_SUCCESS:
            return handleGetUser(state, action);
        case UserActions.UserActions.VERIFY_USER_FAILURE:
            return handleVerifyUserFailure(state);
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
        case UserActions.UserActions.CHECK_EMAIL_EXISTENCE_SUCCESS:
            return handleEmailExistence(state, action);
        case UserActions.UserActions.RESET_EMAIL_EXISTENCE:
            return handleResetEmailExistence(state);
        case ProjectActions.CREATE_PROJECT_SUCCESS:
            return handleCreateProject(state, action);
        case ProjectActions.UPDATE_PROJECT_SUCCESS:
            return handleUpdateProject(state, action);
        case ProjectActions.REMOVE_PROJECT_SUCCESS:
            return handleRemoveUserProject(state, action);
        case TeamActions.CREATE_TEAM_SUCCESS:
            return handleCreateTeam(state, action);
        case TeamActions.UPDATE_TEAM_SUCCESS:
            return handleUpdateTeam(state, action);
        case TeamActions.REMOVE_TEAM_SUCCESS:
            return handleRemoveUserTeam(state, action);
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

function handleRegistrationSuccess(state: IUserState): IUserState {
    return {
        ...state,
        wasCustomerCreated: true,
    };
}

function handleAuthenticationFailure(state: IUserState): IUserState {
    return {
        ...state,
        isLoading: false,
        isAuthenticationSuccessful: false,
    };
}

function handleGetUser(
    state: IUserState,
    action: UserActions.IAddUser | UserActions.IUpdateProfileSettingsSuccess | UserActions.IVerifyUserSuccess
): IUserState {
    const projectExistence: boolean = !!(action.payload.projects && action.payload.projects.length);

    return {
        ...state,
        user: {
            ...state.user,
            ...action.payload,
        },
        selectedProject: projectExistence ? action.payload.projects[0].projectId : '',
        selectedTeam:
            projectExistence &&
            action.payload.teams &&
            action.payload.teams.length &&
            action.payload.teams.some((x) => x.projectId === action.payload.projects[0].projectId)
                ? action.payload.teams.find((x) => x.projectId === action.payload.projects[0].projectId).teamId
                : '',
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
        selectedTeam:
            state.user.teams && state.user.teams.length && state.user.teams.some((x) => x.projectId === action.payload)
                ? state.user.teams.find((x) => x.projectId === action.payload).teamId
                : '',
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

function handleEmailExistence(state: IUserState, action: UserActions.ICheckEmailExistenceSuccess): IUserState {
    return {
        ...state,
        emailExists: action.payload,
    };
}

function handleResetEmailExistence(state: IUserState): IUserState {
    return {
        ...state,
        emailExists: false,
    };
}

function handleRemoveUserProject(state: IUserState, action: IRemoveProjectSuccess): IUserState {
    return {
        ...state,
        user: {
            ...state.user,
            projects: state.user.projects.filter((x) => x.projectId !== action.payload),
        },
        selectedProject:
            state.selectedProject !== action.payload ? state.selectedProject : state.user.projects[0].projectId,
    };
}

function handleUpdateProject(state: IUserState, action: IUpdateProjectSuccess): IUserState {
    return {
        ...state,
        user: {
            ...state.user,
            projects: state.user.projects.map((x) =>
                x.projectId === action.payload.projectId
                    ? {
                          projectId: action.payload.projectId,
                          projectName: action.payload.projectName,
                      }
                    : x
            ),
        },
    };
}

function handleUpdateTeam(state: IUserState, action: IUpdateTeamSuccess): IUserState {
    return {
        ...state,
        user: {
            ...state.user,
            teams: state.user.teams.map((x) =>
                x.teamId === action.payload.teamId
                    ? {
                          teamId: action.payload.teamId,
                          teamName: action.payload.teamName,
                          projectId: action.payload.projectId,
                      }
                    : x
            ),
        },
    };
}

function handleRemoveUserTeam(state: IUserState, action: IRemoveTeamSuccess): IUserState {
    return {
        ...state,
        user: {
            ...state.user,
            teams: state.user.teams.filter((x) => x.teamId !== action.payload),
        },
        selectedTeam: state.selectedTeam !== action.payload ? state.selectedTeam : state.user.teams[0].teamId,
    };
}

function handleCreateProject(state: IUserState, action: ICreateProjectSuccess): IUserState {
    const project: IUserProject = {
        projectId: action.payload.projectId,
        projectName: action.payload.projectName,
    };

    return {
        ...state,
        user: {
            ...state.user,
            projects:
                state.user.projects && state.user.projects.length ? state.user.projects.concat(project) : [project],
        },
        selectedProject: state.selectedProject || project.projectId,
    };
}

function handleCreateTeam(state: IUserState, action: ICreateTeamSuccess): IUserState {
    const team: IUserTeam = {
        teamId: action.payload.teamId,
        teamName: action.payload.teamName,
        projectId: action.payload.projectId,
    };

    return {
        ...state,
        user: {
            ...state.user,
            teams: state.user.teams && state.user.teams.length ? state.user.teams.concat(team) : [team],
        },
        selectedTeam: state.selectedTeam || team.teamId,
    };
}
