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
    isLoading: false,
    search: {
        searchTerm: '',
        searching: true,
        teams: [],
        projects: [],
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
            teams: action.payload.teams,
            projects: action.payload.projects,
        },
    };
}

function handleBlurSearchFieldTerm(state: IWorkSpaceState): IWorkSpaceState {
    return {
        ...state,
        search: {
            ...state.search,
            searching: false,
            projects: [],
            teams: [],
        },
    };
}
