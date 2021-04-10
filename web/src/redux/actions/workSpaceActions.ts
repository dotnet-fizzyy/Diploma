import { IWorkSpace, IWorkSpacePage } from '../../types/workSpaceTypes';

export const WorkSpaceActions = {
    GET_USER_WORKSPACE_REQUEST: 'GET_USER_WORKSPACE_REQUEST',
    GET_USER_WORKSPACE_SUCCESS: 'GET_USER_WORKSPACE_SUCCESS',
    GET_USER_WORKSPACE_FAILURE: 'GET_USER_WORKSPACE_FAILURE',
    CREATE_WORKSPACE_REQUEST: 'CREATE_WORKSPACE_REQUEST',
    CREATE_WORKSPACE_SUCCESS: 'CREATE_WORKSPACE_SUCCESS',
    CREATE_WORKSPACE_FAILURE: 'CREATE_WORKSPACE_FAILURE',
    UPDATE_WORKSPACE_REQUEST: 'UPDATE_WORKSPACE_REQUEST',
    UPDATE_WORKSPACE_SUCCESS: 'UPDATE_WORKSPACE_SUCCESS',
    UPDATE_WORKSPACE_FAILURE: 'UPDATE_WORKSPACE_FAILURE',
};

//Interfaces
export interface IGetUserWorkspaceRequest {
    type: typeof WorkSpaceActions.GET_USER_WORKSPACE_REQUEST;
}

export interface IGetUserWorkspaceSuccess {
    type: typeof WorkSpaceActions.GET_USER_WORKSPACE_SUCCESS;
    payload: IWorkSpacePage;
}

export interface IGetUserWorkspaceFailure {
    type: typeof WorkSpaceActions.GET_USER_WORKSPACE_FAILURE;
    payload: Error;
}

export interface ICreateWorkSpaceRequest {
    type: typeof WorkSpaceActions.CREATE_WORKSPACE_REQUEST;
    payload: IWorkSpace;
}

export interface ICreateWorkSpaceSuccess {
    type: typeof WorkSpaceActions.CREATE_WORKSPACE_SUCCESS;
    payload: IWorkSpace;
}

export interface ICreateWorkSpaceFailure {
    type: typeof WorkSpaceActions.CREATE_WORKSPACE_FAILURE;
    payload: Error;
}

export interface IUpdateWorkSpaceRequest {
    type: typeof WorkSpaceActions.UPDATE_WORKSPACE_REQUEST;
    payload: IWorkSpace;
}

export interface IUpdateWorkSpaceSuccess {
    type: typeof WorkSpaceActions.UPDATE_WORKSPACE_SUCCESS;
    payload: IWorkSpace;
}

export interface IUpdateWorkSpaceFailure {
    type: typeof WorkSpaceActions.UPDATE_WORKSPACE_FAILURE;
    payload: Error;
}

//Actions
export function getUserWorkSpaceRequest(): IGetUserWorkspaceRequest {
    return {
        type: WorkSpaceActions.GET_USER_WORKSPACE_REQUEST,
    };
}

export function getUserWorkSpaceSuccess(workSpace: IWorkSpacePage): IGetUserWorkspaceSuccess {
    return {
        type: WorkSpaceActions.GET_USER_WORKSPACE_SUCCESS,
        payload: workSpace,
    };
}

export function getUserWorkSpaceFailure(error: Error): IGetUserWorkspaceFailure {
    return {
        type: WorkSpaceActions.GET_USER_WORKSPACE_FAILURE,
        payload: error,
    };
}

export function createWorkSpaceRequest(workSpace: IWorkSpace): ICreateWorkSpaceRequest {
    return {
        type: WorkSpaceActions.CREATE_WORKSPACE_REQUEST,
        payload: workSpace,
    };
}

export function createWorkSpaceSuccess(workSpace: IWorkSpace): ICreateWorkSpaceSuccess {
    return {
        type: WorkSpaceActions.CREATE_WORKSPACE_SUCCESS,
        payload: workSpace,
    };
}

export function createWorkSpaceFailure(error: Error): ICreateWorkSpaceFailure {
    return {
        type: WorkSpaceActions.CREATE_WORKSPACE_REQUEST,
        payload: error,
    };
}

export function updateWorkSpaceRequest(workSpace: IWorkSpace): IUpdateWorkSpaceRequest {
    return {
        type: WorkSpaceActions.UPDATE_WORKSPACE_REQUEST,
        payload: workSpace,
    };
}

export function updateWorkSpaceSuccess(workSpace: IWorkSpace): IUpdateWorkSpaceSuccess {
    return {
        type: WorkSpaceActions.UPDATE_WORKSPACE_SUCCESS,
        payload: workSpace,
    };
}

export function updateWorkSpaceError(error: Error): IUpdateWorkSpaceFailure {
    return {
        type: WorkSpaceActions.UPDATE_WORKSPACE_FAILURE,
        payload: error,
    };
}

//Types
export type WorkSpaceActionTypes = ICreateWorkSpaceSuccess & IGetUserWorkspaceSuccess & IUpdateWorkSpaceSuccess;
