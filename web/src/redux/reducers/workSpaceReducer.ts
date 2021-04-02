import * as WorkSpaceActions from '../actions/workSpaceActions';
import { IWorkSpaceState } from '../store/state';

const initialState: IWorkSpaceState = {
    workSpace: {
        workSpaceId: undefined,
        workSpaceName: '',
        workSpaceDescription: '',
        creationDate: undefined,
    },
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
            return handleCreateWorkSpace(state, action);
        case WorkSpaceActions.WorkSpaceActions.GET_USER_WORKSPACE_SUCCESS:
            return handleGetUserWorkSpace(state, action);
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

function handleCreateWorkSpace(
    state: IWorkSpaceState,
    action: WorkSpaceActions.ICreateWorkSpaceSuccess
): IWorkSpaceState {
    return {
        ...state,
        workSpace: action.payload,
        isLoading: false,
    };
}

function handleGetUserWorkSpace(
    state: IWorkSpaceState,
    action: WorkSpaceActions.IGetUserWorkspaceSuccess
): IWorkSpaceState {
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
