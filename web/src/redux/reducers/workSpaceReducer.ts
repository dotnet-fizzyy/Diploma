import { IWorkSpacePageProject } from '../../types/workSpaceTypes';
import { ICreateProjectSuccess, ProjectActions } from '../actions/projectActions';
import {
    IAddWorkSpace,
    ICreateWorkSpaceSuccess,
    IGetUserWorkspacePageSuccess,
    ISetSearchTitleTermRequest,
    ISetSearchTitleTermSuccess,
    WorkSpaceActions,
} from '../actions/workSpaceActions';
import { IWorkSpaceState } from '../store/state';

const initialState: IWorkSpaceState = {
    workSpace: {
        workSpaceId: null,
        workSpaceName: '',
        workSpaceDescription: '',
        creationDate: null,
    },
    projects: [],
    isLoading: false,
    search: {
        searchTerm: '',
        searching: true,
        stories: [],
        users: [],
    },
};

export default function workSpaceReducer(state = initialState, action): IWorkSpaceState {
    switch (action.type) {
        case WorkSpaceActions.GET_USER_WORKSPACE_PAGE_REQUEST:
        case WorkSpaceActions.CREATE_WORKSPACE_REQUEST:
            return handleSetLoadingStatusForWorkSpace(state);
        case WorkSpaceActions.CREATE_WORKSPACE_SUCCESS:
        case WorkSpaceActions.UPDATE_WORKSPACE_SUCCESS:
        case WorkSpaceActions.ADD_WORKSPACE:
            return handleSetWorkSpace(state, action);
        case WorkSpaceActions.GET_USER_WORKSPACE_PAGE_SUCCESS:
            return handleGetUserWorkSpacePage(state, action);
        case WorkSpaceActions.GET_USER_WORKSPACE_PAGE_FAILURE:
            return handleGetUserWorkSpaceFailure(state);
        case WorkSpaceActions.SET_SEARCH_TITLE_TERM_REQUEST:
            return handleSetSearchTitleTerm(state, action);
        case WorkSpaceActions.SET_SEARCH_TITLE_TERM_SUCCESS:
            return handleSetSearchTitleSuccess(state, action);
        case WorkSpaceActions.BLUR_SEARCH_FIELD_TERM:
            return handleBlurSearchFieldTerm(state);
        case ProjectActions.CREATE_PROJECT_SUCCESS:
            return handleCreateProjectSuccess(state, action);
        default:
            return state;
    }
}

function handleSetLoadingStatusForWorkSpace(state: IWorkSpaceState): IWorkSpaceState {
    return {
        ...state,
        isLoading: true,
    };
}

function handleSetWorkSpace(state: IWorkSpaceState, action: ICreateWorkSpaceSuccess | IAddWorkSpace): IWorkSpaceState {
    return {
        ...state,
        workSpace: action.payload,
        isLoading: false,
    };
}

function handleGetUserWorkSpaceFailure(state: IWorkSpaceState): IWorkSpaceState {
    return {
        ...state,
        isLoading: false,
    };
}

function handleGetUserWorkSpacePage(state: IWorkSpaceState, action: IGetUserWorkspacePageSuccess): IWorkSpaceState {
    return {
        ...state,
        workSpace: action.payload.workSpace,
        projects: action.payload.projects,
        isLoading: false,
    };
}

function handleSetSearchTitleTerm(state: IWorkSpaceState, action: ISetSearchTitleTermRequest): IWorkSpaceState {
    return {
        ...state,
        search: {
            ...state.search,
            searchTerm: action.payload,
            searching: true,
        },
    };
}

function handleSetSearchTitleSuccess(state: IWorkSpaceState, action: ISetSearchTitleTermSuccess): IWorkSpaceState {
    return {
        ...state,
        search: {
            ...state.search,
            searching: false,
            stories: action.payload.stories,
            users: action.payload.users,
        },
    };
}

function handleBlurSearchFieldTerm(state: IWorkSpaceState): IWorkSpaceState {
    return {
        ...state,
        search: {
            ...state.search,
            searching: false,
            users: [],
            stories: [],
        },
    };
}

function handleCreateProjectSuccess(state: IWorkSpaceState, action: ICreateProjectSuccess): IWorkSpaceState {
    const workSpaceProject: IWorkSpacePageProject = {
        projectId: action.payload.projectId,
        projectName: action.payload.projectName,
        teams: [],
    };

    return {
        ...state,
        projects: state.projects.length ? [...state.projects, workSpaceProject] : [workSpaceProject],
    };
}
