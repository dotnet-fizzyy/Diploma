import {
    IAddWorkSpace,
    ICreateWorkSpaceSuccess,
    IGetUserWorkspacePageSuccess,
    ISetSearchTitleTermRequest,
    ISetSearchTitleTermSuccess,
    WorkSpaceActions,
} from '../actions/workspace';
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

const handleSetLoadingStatusForWorkSpace = (state: IWorkSpaceState): IWorkSpaceState => ({
    ...state,
    isLoading: true,
});

const handleSetWorkSpace = (
    state: IWorkSpaceState,
    action: ICreateWorkSpaceSuccess | IAddWorkSpace
): IWorkSpaceState => ({
    ...state,
    workSpace: action.payload,
    isLoading: false,
});

const handleGetUserWorkSpaceFailure = (state: IWorkSpaceState): IWorkSpaceState => ({
    ...state,
    isLoading: false,
});

const handleGetUserWorkSpacePage = (state: IWorkSpaceState, action: IGetUserWorkspacePageSuccess): IWorkSpaceState => ({
    ...state,
    workSpace: action.payload.workSpace,
    isLoading: false,
});

const handleSetSearchTitleTerm = (state: IWorkSpaceState, action: ISetSearchTitleTermRequest): IWorkSpaceState => ({
    ...state,
    search: {
        ...state.search,
        searchTerm: action.payload,
        searching: true,
    },
});

const handleSetSearchTitleSuccess = (
    state: IWorkSpaceState,
    { payload: { teams, projects } }: ISetSearchTitleTermSuccess
): IWorkSpaceState => ({
    ...state,
    search: {
        ...state.search,
        searching: false,
        teams,
        projects,
    },
});

const handleBlurSearchFieldTerm = (state: IWorkSpaceState): IWorkSpaceState => ({
    ...state,
    search: {
        ...state.search,
        searching: false,
        projects: [],
        teams: [],
    },
});
