import { IBaseAction } from '../../types';
import { ISearchResults, IWorkSpace, IWorkSpacePage } from '../../types/workSpaceTypes';

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
    SET_SEARCH_TITLE_TERM_REQUEST: 'SET_SEARCH_TITLE_TERM_REQUEST',
    SET_SEARCH_TITLE_TERM_SUCCESS: 'SET_SEARCH_TITLE_TERM_SUCCESS',
    SET_SEARCH_TITLE_TERM_FAILURE: 'SET_SEARCH_TITLE_TERM_FAILURE',
    BLUR_SEARCH_FIELD_TERM: 'BLUR_STORY_TITLE_TERM',
};

/**
 * Interfaces
 */
export interface IGetUserWorkspacePageRequest extends IBaseAction {}

export interface IGetUserWorkspacePageSuccess extends IBaseAction {
    payload: IWorkSpacePage;
}

export interface IGetUserWorkspacePageFailure extends IBaseAction {
    payload: Error;
}

export interface ICreateWorkSpaceRequest extends IBaseAction {
    payload: IWorkSpace;
}

export interface ICreateWorkSpaceSuccess extends IBaseAction {
    payload: IWorkSpace;
}

export interface ICreateWorkSpaceFailure extends IBaseAction {
    payload: Error;
}

export interface IUpdateWorkSpaceRequest extends IBaseAction {
    payload: IWorkSpace;
}

export interface IUpdateWorkSpaceSuccess extends IBaseAction {
    payload: IWorkSpace;
}

export interface IUpdateWorkSpaceFailure extends IBaseAction {
    payload: Error;
}

export interface IAddWorkSpace extends IBaseAction {
    payload: IWorkSpace;
}

export interface ISetSearchTitleTermRequest extends IBaseAction {
    payload: string;
}

export interface ISetSearchTitleTermSuccess extends IBaseAction {
    payload: ISearchResults;
}

export interface ISetSearchTitleTermFailure extends IBaseAction {
    payload: Error;
}

export interface IBlurSearchTitleTerm extends IBaseAction {}

/**
 * Actions
 */
export const getUserWorkSpacePageRequest = (): IGetUserWorkspacePageRequest => ({
    type: WorkSpaceActions.GET_USER_WORKSPACE_PAGE_REQUEST,
});

export const getUserWorkSpacePageSuccess = (workSpace: IWorkSpacePage): IGetUserWorkspacePageSuccess => ({
    type: WorkSpaceActions.GET_USER_WORKSPACE_PAGE_SUCCESS,
    payload: workSpace,
});

export const getUserWorkSpacePageFailure = (error: Error): IGetUserWorkspacePageFailure => ({
    type: WorkSpaceActions.GET_USER_WORKSPACE_PAGE_FAILURE,
    payload: error,
});

export const createWorkSpaceRequest = (workSpace: IWorkSpace): ICreateWorkSpaceRequest => ({
    type: WorkSpaceActions.CREATE_WORKSPACE_REQUEST,
    payload: workSpace,
});

export const createWorkSpaceSuccess = (workSpace: IWorkSpace): ICreateWorkSpaceSuccess => ({
    type: WorkSpaceActions.CREATE_WORKSPACE_SUCCESS,
    payload: workSpace,
});

export const createWorkSpaceFailure = (error: Error): ICreateWorkSpaceFailure => ({
    type: WorkSpaceActions.CREATE_WORKSPACE_REQUEST,
    payload: error,
});

export const updateWorkSpaceRequest = (workSpace: IWorkSpace): IUpdateWorkSpaceRequest => ({
    type: WorkSpaceActions.UPDATE_WORKSPACE_REQUEST,
    payload: workSpace,
});

export const updateWorkSpaceSuccess = (workSpace: IWorkSpace): IUpdateWorkSpaceSuccess => ({
    type: WorkSpaceActions.UPDATE_WORKSPACE_SUCCESS,
    payload: workSpace,
});

export const updateWorkSpaceFailure = (error: Error): IUpdateWorkSpaceFailure => ({
    type: WorkSpaceActions.UPDATE_WORKSPACE_FAILURE,
    payload: error,
});

export const addWorkSpace = (workSpace: IWorkSpace): IAddWorkSpace => ({
    type: WorkSpaceActions.ADD_WORKSPACE,
    payload: workSpace,
});

export const setSearchTitleTermRequest = (term: string): ISetSearchTitleTermRequest => ({
    type: WorkSpaceActions.SET_SEARCH_TITLE_TERM_REQUEST,
    payload: term,
});

export const setSearchTitleTermSuccess = (results: ISearchResults): ISetSearchTitleTermSuccess => ({
    type: WorkSpaceActions.SET_SEARCH_TITLE_TERM_SUCCESS,
    payload: results,
});

export const setSearchTitleTermFailure = (error: Error): ISetSearchTitleTermFailure => ({
    type: WorkSpaceActions.SET_SEARCH_TITLE_TERM_FAILURE,
    payload: error,
});

export const blurSearchTitleTerm = (): IBlurSearchTitleTerm => ({
    type: WorkSpaceActions.BLUR_SEARCH_FIELD_TERM,
});
