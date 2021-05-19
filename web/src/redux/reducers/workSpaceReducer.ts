import {
    IAddWorkSpace,
    ICreateWorkSpaceSuccess,
    IGetUserWorkspacePageSuccess,
    ISetSearchTitleTermRequest,
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
    searchTerm: '',
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
        searchTerm: action.payload,
    };
}
