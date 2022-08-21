import { IBaseAction } from '../../types';
import { IProject } from '../../types/projectTypes';
import { IWorkSpacePageProject } from '../../types/workSpaceTypes';

export const ProjectActions = {
    GET_PROJECT_PAGE_REQUEST: 'GET_PROJECT_PAGE_REQUEST',
    GET_PROJECT_PAGE_SUCCESS: 'GET_PROJECT_PAGE_SUCCESS',
    GET_PROJECT_PAGE_FAILURE: 'GET_PROJECT_PAGE_FAILURE',
    CREATE_PROJECT_REQUEST: 'CREATE_PROJECT_REQUEST',
    CREATE_PROJECT_SUCCESS: 'CREATE_PROJECT_SUCCESS',
    CREATE_PROJECT_FAILURE: 'CREATE_PROJECT_FAILURE',
    SET_SELECTED_PROJECT: 'SET_SELECTED_PROJECT',
    GET_PROJECT_REQUEST: 'GET_PROJECT_REQUEST',
    GET_PROJECT_SUCCESS: 'GET_PROJECT_SUCCESS',
    GET_PROJECT_FAILURE: 'GET_PROJECT_FAILURE',
    UPDATE_PROJECT_REQUEST: 'UPDATE_PROJECT_REQUEST',
    UPDATE_PROJECT_SUCCESS: 'UPDATE_PROJECT_SUCCESS',
    UPDATE_PROJECT_FAILURE: 'UPDATE_PROJECT_FAILURE',
    GET_BOARD_INFO_REQUEST: 'GET_BOARD_INFO_REQUEST',
    GET_BOARD_INFO_FAILURE: 'GET_BOARD_INFO_FAILURE',
    REMOVE_PROJECT_REQUEST: 'REMOVE_PROJECT_REQUEST',
    REMOVE_PROJECT_SUCCESS: 'REMOVE_PROJECT_SUCCESS',
    REMOVE_PROJECT_FAILURE: 'REMOVE_PROJECT_FAILURE',
    GET_PROJECTS_STATS_PAGE_REQUEST: 'GET_PROJECTS_STATS_PAGE_REQUEST',
    GET_PROJECTS_STATS_PAGE_FAILURE: 'GET_PROJECTS_STATS_PAGE_FAILURE',
    CHANGE_STATS_SEARCH_ITEMS_REQUEST: 'CHANGE_STATS_SEARCH_ITEMS_REQUEST',
    CHANGE_STATS_SEARCH_ITEMS_FAILURE: 'CHANGE_STATS_SEARCH_ITEMS_FAILURE',
    ADD_WORKSPACE_PROJECTS: 'ADD_WORKSPACE_PROJECTS',
    SET_SELECTED_PROJECT_FROM_WORKSPACE_BY_ID: 'SET_SELECTED_PROJECT_FROM_WORKSPACE_BY_ID',
    GET_MAIN_PAGE_DATA_REQUEST: 'GET_MAIN_PAGE_DATA_REQUEST',
    GET_MAIN_PAGE_DATA_SUCCESS: 'GET_MAIN_PAGE_DATA_SUCCESS',
    GET_MAIN_PAGE_DATA_FAILURE: 'GET_MAIN_PAGE_DATA_FAILURE',
};

/**
 * Interfaces
 */

export interface IGetProjectPageRequest extends IBaseAction {
    payload: string;
}

export interface IGetProjectPageSuccess extends IBaseAction {
    payload: IProject;
}

export interface IGetProjectPageFailure extends IBaseAction {
    payload: Error;
}

export interface ICreateProjectRequest extends IBaseAction {
    payload: IProject;
}

export interface ICreateProjectSuccess extends IBaseAction {
    payload: IProject;
}

export interface ICreateProjectFailure extends IBaseAction {
    payload: Error;
}

export interface ISetSelectedProject extends IBaseAction {
    payload: IProject;
}

export interface IGetProjectRequest extends IBaseAction {
    payload: string;
}

export interface IGetProjectSuccess extends IBaseAction {
    payload: IProject;
}

export interface IGetProjectFailure extends IBaseAction {
    payload: Error;
}

export interface IUpdateProjectRequest extends IBaseAction {
    payload: IProject;
}

export interface IUpdateProjectSuccess extends IBaseAction {
    payload: IProject;
}

export interface IUpdateProjectFailure extends IBaseAction {
    payload: Error;
}

export interface IGetBoardInfoRequest extends IBaseAction {
    payload: {
        projectId: string;
        teamId: string;
    };
}

export interface IGetBoardInfoFailure extends IBaseAction {
    payload: Error;
}

export interface IRemoveProjectRequest extends IBaseAction {
    payload: string;
}

export interface IRemoveProjectSuccess extends IBaseAction {
    payload: string;
}

export interface IRemoveProjectFailure extends IBaseAction {
    payload: Error;
}

export interface IGetProjectStatsPageRequest extends IBaseAction {
    payload: string;
}

export interface IGetProjectStatsPageFailure extends IBaseAction {
    payload: Error;
}

export interface IChangeStatsSearchItemsRequest extends IBaseAction {
    payload: string;
}

export interface IChangeStatsSearchItemsFailure extends IBaseAction {
    payload: Error;
}

export interface IAddWorkSpaceProjects extends IBaseAction {
    payload: IWorkSpacePageProject[];
}

export interface ISetSelectedProjectFromWorkSpaceById extends IBaseAction {
    payload: string;
}

export interface IGetMainPageDataRequest extends IBaseAction {}

export interface IGetMainPageDataSuccess extends IBaseAction {
    payload: any;
}

export interface IGetMainPageDataFailure extends IBaseAction {
    payload: Error;
}

/**
 * Actions
 */

export const getProjectPageRequest = (projectId: string): IGetProjectPageRequest => ({
    type: ProjectActions.GET_PROJECT_PAGE_REQUEST,
    payload: projectId,
});

export const getProjectPageSuccess = (project: IProject): IGetProjectPageSuccess => ({
    type: ProjectActions.GET_PROJECT_PAGE_SUCCESS,
    payload: project,
});

export const getProjectPageFailure = (error: Error): IGetProjectPageFailure => ({
    type: ProjectActions.GET_PROJECT_PAGE_FAILURE,
    payload: error,
});

export const createProjectRequest = (project: IProject): ICreateProjectRequest => ({
    type: ProjectActions.CREATE_PROJECT_REQUEST,
    payload: project,
});

export const createProjectSuccess = (project: IProject): ICreateProjectSuccess => ({
    type: ProjectActions.CREATE_PROJECT_SUCCESS,
    payload: project,
});

export const createProjectFailure = (error: Error): ICreateProjectFailure => ({
    type: ProjectActions.CREATE_PROJECT_FAILURE,
    payload: error,
});

export const setSelectedProject = (project: IProject): ISetSelectedProject => ({
    type: ProjectActions.SET_SELECTED_PROJECT,
    payload: project,
});

export const getProjectRequest = (projectId: string): IGetProjectRequest => ({
    type: ProjectActions.GET_PROJECT_REQUEST,
    payload: projectId,
});

export const getProjectSuccess = (project: IProject): IGetProjectSuccess => ({
    type: ProjectActions.GET_PROJECT_SUCCESS,
    payload: project,
});

export const getProjectFailure = (error: Error): IGetProjectFailure => ({
    type: ProjectActions.GET_PROJECT_FAILURE,
    payload: error,
});

export const updateProjectRequest = (project: IProject): IUpdateProjectRequest => ({
    type: ProjectActions.UPDATE_PROJECT_REQUEST,
    payload: project,
});

export const updateProjectSuccess = (project: IProject): IUpdateProjectSuccess => ({
    type: ProjectActions.UPDATE_PROJECT_SUCCESS,
    payload: project,
});

export const updateProjectFailure = (error: Error): IUpdateProjectFailure => ({
    type: ProjectActions.UPDATE_PROJECT_FAILURE,
    payload: error,
});

export const getBoardInfoRequest = (projectId: string, teamId: string): IGetBoardInfoRequest => ({
    type: ProjectActions.GET_BOARD_INFO_REQUEST,
    payload: {
        projectId,
        teamId,
    },
});

export const getBoardInfoFailure = (error: Error): IGetBoardInfoFailure => ({
    type: ProjectActions.GET_BOARD_INFO_FAILURE,
    payload: error,
});

export const removeProjectRequest = (projectId: string): IRemoveProjectRequest => ({
    type: ProjectActions.REMOVE_PROJECT_REQUEST,
    payload: projectId,
});

export const removeProjectSuccess = (projectId: string): IRemoveProjectSuccess => ({
    type: ProjectActions.REMOVE_PROJECT_SUCCESS,
    payload: projectId,
});

export const removeProjectFailure = (error: Error): IRemoveProjectFailure => ({
    type: ProjectActions.REMOVE_PROJECT_FAILURE,
    payload: error,
});

export const getProjectStatsPageRequest = (projectId: string): IGetProjectStatsPageRequest => ({
    type: ProjectActions.GET_PROJECTS_STATS_PAGE_REQUEST,
    payload: projectId,
});

export const getProjectStatsPageFailure = (error: Error): IGetProjectStatsPageFailure => ({
    type: ProjectActions.GET_PROJECTS_STATS_PAGE_FAILURE,
    payload: error,
});

export const changeStatsSearchItemsRequest = (epicId: string): IChangeStatsSearchItemsRequest => ({
    type: ProjectActions.CHANGE_STATS_SEARCH_ITEMS_REQUEST,
    payload: epicId,
});

export const changeStatsSearchItemsFailure = (error: Error): IChangeStatsSearchItemsFailure => ({
    type: ProjectActions.CHANGE_STATS_SEARCH_ITEMS_FAILURE,
    payload: error,
});

export const addWorkSpaceProjects = (projects: IWorkSpacePageProject[]): IAddWorkSpaceProjects => ({
    type: ProjectActions.ADD_WORKSPACE_PROJECTS,
    payload: projects,
});

export const setSelectedProjectFromWorkSpaceById = (projectId: string): ISetSelectedProjectFromWorkSpaceById => ({
    type: ProjectActions.SET_SELECTED_PROJECT_FROM_WORKSPACE_BY_ID,
    payload: projectId,
});

export const getMainPageDataRequest = (): IGetMainPageDataRequest => ({
    type: ProjectActions.GET_MAIN_PAGE_DATA_REQUEST,
});

export const getMainPageDataSuccess = (data: any): IGetMainPageDataSuccess => ({
    type: ProjectActions.GET_MAIN_PAGE_DATA_SUCCESS,
    payload: data,
});

export const getMainPageDataFailure = (error: Error): IGetMainPageDataFailure => ({
    type: ProjectActions.GET_MAIN_PAGE_DATA_FAILURE,
    payload: error,
});
