import { IUserProject, IUserTeam } from '../../types/userTypes';
import {
    ICreateProjectSuccess,
    IRemoveProjectSuccess,
    IUpdateProjectSuccess,
    ProjectActions,
} from '../actions/project';
import { ICreateTeamSuccess, IRemoveTeamSuccess, IUpdateTeamSuccess, TeamActions } from '../actions/team';
import {
    IChangeUserProject,
    IChangeUserTeam,
    ICheckEmailExistenceSuccess,
    IUpdateAvatarSuccess,
    IUpdateProfileSettingsSuccess,
    IVerifyUserSuccess,
    UserActions,
} from '../actions/user';
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
        case UserActions.VERIFY_USER_REQUEST:
        case UserActions.AUTHENTICATION_REQUEST:
            return handleVerifyUserRequest(state);
        case UserActions.VERIFY_USER_SUCCESS:
        case UserActions.UPDATE_PROFILE_SETTINGS_SUCCESS:
        case UserActions.AUTHENTICATION_SUCCESS:
            return handleGetUser(state, action);
        case UserActions.VERIFY_USER_FAILURE:
            return handleVerifyUserFailure(state);
        case UserActions.AUTHENTICATION_FAILURE:
            return handleAuthenticationFailure(state);
        case UserActions.REGISTRATION_SUCCESS:
            return handleRegistrationSuccess(state);
        case UserActions.HIDE_CUSTOMER_SUCCESSFUL_REGISTRATION:
            return handleHideCustomerSuccessfulRegistration(state);
        case UserActions.UPDATE_AVATAR_SUCCESS:
            return handleUpdateAvatarLink(state, action);
        case UserActions.CHANGE_USER_PROJECT:
            return handleChangeUserProject(state, action);
        case UserActions.CHANGE_USER_TEAM:
            return handleChangeUserTeam(state, action);
        case UserActions.LOGOUT_USER:
            return handleUserLogOut();
        case UserActions.CHECK_EMAIL_EXISTENCE_SUCCESS:
            return handleEmailExistence(state, action);
        case UserActions.RESET_EMAIL_EXISTENCE:
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

const handleVerifyUserRequest = (state: IUserState): IUserState => ({
    ...state,
    isLoading: true,
});

const handleVerifyUserFailure = (state: IUserState): IUserState => ({
    ...state,
    isLoading: false,
});

const handleRegistrationSuccess = (state: IUserState): IUserState => ({
    ...state,
    wasCustomerCreated: true,
});

const handleAuthenticationFailure = (state: IUserState): IUserState => ({
    ...state,
    isLoading: false,
    isAuthenticationSuccessful: false,
});

const handleGetUser = (state: IUserState, action: IUpdateProfileSettingsSuccess | IVerifyUserSuccess): IUserState => {
    const projectExistence: boolean = !!action.payload.projects?.length;
    const selectedTeam = action.payload.teams?.find((x) => x.projectId === action.payload.projects[0].projectId)
        ?.teamId;

    return {
        ...state,
        user: {
            ...state.user,
            ...action.payload,
        },
        selectedProject: projectExistence ? action.payload.projects[0].projectId : '',
        selectedTeam: selectedTeam ?? '',
        isLoading: false,
    };
};

const handleHideCustomerSuccessfulRegistration = (state: IUserState): IUserState => ({
    ...state,
    wasCustomerCreated: false,
});

const handleUpdateAvatarLink = (state: IUserState, action: IUpdateAvatarSuccess): IUserState => ({
    ...state,
    user: {
        ...state.user,
        avatarLink: action.payload,
    },
});

const handleChangeUserProject = (state: IUserState, action: IChangeUserProject): IUserState => {
    const selectedTeam = state.user.teams.find((x) => x.projectId === action.payload)?.teamId;

    return {
        ...state,
        selectedProject: action.payload,
        selectedTeam: selectedTeam ?? '',
    };
};

const handleChangeUserTeam = (state: IUserState, action: IChangeUserTeam): IUserState => ({
    ...state,
    selectedTeam: action.payload,
});

const handleUserLogOut = (): IUserState => initialState;

const handleEmailExistence = (state: IUserState, action: ICheckEmailExistenceSuccess): IUserState => ({
    ...state,
    emailExists: action.payload,
});

const handleResetEmailExistence = (state: IUserState): IUserState => ({
    ...state,
    emailExists: false,
});

const handleRemoveUserProject = (state: IUserState, action: IRemoveProjectSuccess): IUserState => ({
    ...state,
    user: {
        ...state.user,
        projects: state.user.projects.filter((userProject) => userProject.projectId !== action.payload),
    },
    selectedProject:
        state.selectedProject !== action.payload ? state.selectedProject : state.user.projects[0].projectId,
});

const handleUpdateProject = (state: IUserState, action: IUpdateProjectSuccess): IUserState => ({
    ...state,
    user: {
        ...state.user,
        projects: state.user.projects.map((userProject) =>
            userProject.projectId === action.payload.projectId
                ? {
                      projectId: action.payload.projectId,
                      projectName: action.payload.projectName,
                  }
                : userProject
        ),
    },
});

const handleUpdateTeam = (state: IUserState, action: IUpdateTeamSuccess): IUserState => ({
    ...state,
    user: {
        ...state.user,
        teams: state.user.teams.map((userTeam) =>
            userTeam.teamId === action.payload.teamId
                ? {
                      teamId: action.payload.teamId,
                      teamName: action.payload.teamName,
                      projectId: action.payload.projectId,
                  }
                : userTeam
        ),
    },
});

const handleRemoveUserTeam = (state: IUserState, action: IRemoveTeamSuccess): IUserState => ({
    ...state,
    user: {
        ...state.user,
        teams: state.user.teams.filter((userTeam) => userTeam.teamId !== action.payload),
    },
    selectedTeam: state.selectedTeam !== action.payload ? state.selectedTeam : state.user.teams[0].teamId,
});

const handleCreateProject = (
    state: IUserState,
    { payload: { projectId, projectName } }: ICreateProjectSuccess
): IUserState => {
    const project: IUserProject = {
        projectId,
        projectName,
    };

    return {
        ...state,
        user: {
            ...state.user,
            projects: state.user.projects?.length ? state.user.projects.concat(project) : [project],
        },
        selectedProject: state.selectedProject || project.projectId,
    };
};

const handleCreateTeam = (
    state: IUserState,
    { payload: { teamId, teamName, projectId } }: ICreateTeamSuccess
): IUserState => {
    const team: IUserTeam = {
        teamId,
        teamName,
        projectId,
    };

    return {
        ...state,
        user: {
            ...state.user,
            teams: state.user.teams?.length ? state.user.teams.concat(team) : [team],
        },
        selectedTeam: state.selectedTeam || team.teamId,
    };
};
