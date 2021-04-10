import * as WorkSpaceActions from '../actions/workSpaceActions';
import { IWorkSpaceState } from '../store/state';

const initialState: IWorkSpaceState = {
    workSpace: {
        workSpaceId: undefined,
        workSpaceName: '',
        workSpaceDescription: '',
        creationDate: undefined,
    },
    projects: [],
    isLoading: false,
};

export default function workSpaceReducer(
    state = initialState,
    action: WorkSpaceActions.WorkSpaceActionTypes
): IWorkSpaceState {
    switch (action.type) {
        case WorkSpaceActions.WorkSpaceActions.GET_USER_WORKSPACE_REQUEST:
        case WorkSpaceActions.WorkSpaceActions.CREATE_WORKSPACE_REQUEST:
            return handleSetLoadingStatusForWorkSpace(state, action);
        case WorkSpaceActions.WorkSpaceActions.CREATE_WORKSPACE_SUCCESS:
        case WorkSpaceActions.WorkSpaceActions.UPDATE_WORKSPACE_SUCCESS:
            return handleSetWorkSpace(state, action);
        case WorkSpaceActions.WorkSpaceActions.GET_USER_WORKSPACE_SUCCESS:
            return handleGetUserWorkSpacePage(state, action);
        case WorkSpaceActions.WorkSpaceActions.GET_USER_WORKSPACE_FAILURE:
            return handleGetUserWorkSpaceFailure(state);
        default:
            return state;
    }
}

function handleSetLoadingStatusForWorkSpace(
    state: IWorkSpaceState,
    action: WorkSpaceActions.IGetUserWorkspaceRequest | WorkSpaceActions.ICreateWorkSpaceRequest
): IWorkSpaceState {
    return {
        ...state,
        isLoading: true,
    };
}

function handleSetWorkSpace(state: IWorkSpaceState, action: WorkSpaceActions.ICreateWorkSpaceSuccess): IWorkSpaceState {
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

function handleGetUserWorkSpacePage(
    state: IWorkSpaceState,
    action: WorkSpaceActions.IGetUserWorkspaceSuccess
): IWorkSpaceState {
    return {
        ...state,
        workSpace: action.payload.workSpace,
        projects: action.payload.projects,
        isLoading: false,
    };
}
