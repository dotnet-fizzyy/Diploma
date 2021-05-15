import { IWorkSpace, IWorkSpacePage } from '../../types/workSpaceTypes';

export const WorkSpaceActions = {
    GET_USER_WORKSPACE_PAGE_REQUEST: 'GET_USER_WORKSPACE_PAGE_REQUEST',
    GET_USER_WORKSPACE_PAGE_SUCCESS: 'GET_USER_WORKSPACE_PAGE_SUCCESS',
    GET_USER_WORKSPACE_PAGE_FAILURE: 'GET_USER_WORKSPACE_PAGE_FAILURE',
    CREATE_WORKSPACE_REQUEST: 'CREATE_WORKSPACE_REQUEST',
    CREATE_WORKSPACE_SUCCESS: 'CREATE_WORKSPACE_SUCCESS',
    CREATE_WORKSPACE_FAILURE: 'CREATE_WORKSPACE_FAILURE',
    UPDATE_WORKSPACE_REQUEST: 'UPDATE_WORKSPACE_REQUEST',
    UPDATE_WORKSPACE_SUCCESS: 'UPDATE_WORKSPACE_SUCCESS',
    UPDATE_WORKSPACE_FAILURE: 'UPDATE_WORKSPACE_FAILURE',
    ADD_WORKSPACE: 'ADD_WORKSPACE',
};

/*
Interfaces
 */
export interface IGetUserWorkspacePageRequest {
    type: typeof WorkSpaceActions.GET_USER_WORKSPACE_PAGE_REQUEST;
}

export interface IGetUserWorkspacePageSuccess {
    type: typeof WorkSpaceActions.GET_USER_WORKSPACE_PAGE_SUCCESS;
    payload: IWorkSpacePage;
}

export interface IGetUserWorkspacePageFailure {
    type: typeof WorkSpaceActions.GET_USER_WORKSPACE_PAGE_FAILURE;
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

export interface IAddWorkSpace {
    type: typeof WorkSpaceActions.ADD_WORKSPACE;
    payload: IWorkSpace;
}

/*
Actions
 */
export function getUserWorkSpacePageRequest(): IGetUserWorkspacePageRequest {
    return {
        type: WorkSpaceActions.GET_USER_WORKSPACE_PAGE_REQUEST,
    };
}

export function getUserWorkSpacePageSuccess(workSpace: IWorkSpacePage): IGetUserWorkspacePageSuccess {
    return {
        type: WorkSpaceActions.GET_USER_WORKSPACE_PAGE_SUCCESS,
        payload: workSpace,
    };
}

export function getUserWorkSpacePageFailure(error: Error): IGetUserWorkspacePageFailure {
    return {
        type: WorkSpaceActions.GET_USER_WORKSPACE_PAGE_FAILURE,
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

export function updateWorkSpaceFailure(error: Error): IUpdateWorkSpaceFailure {
    return {
        type: WorkSpaceActions.UPDATE_WORKSPACE_FAILURE,
        payload: error,
    };
}

export function addWorkSpace(workSpace: IWorkSpace): IAddWorkSpace {
    return {
        type: WorkSpaceActions.ADD_WORKSPACE,
        payload: workSpace,
    };
}

//Types
export type WorkSpaceActionTypes = ICreateWorkSpaceSuccess &
    IGetUserWorkspacePageSuccess &
    IUpdateWorkSpaceSuccess &
    IAddWorkSpace;
