import { IProject } from '../../types/projectTypes';

export const ProjectActions = {
    GET_PROJECT_PAGE_REQUEST: 'GET_PROJECT_PAGE_REQUEST',
    GET_PROJECT_PAGE_SUCCESS: 'GET_PROJECT_PAGE_SUCCESS',
    GET_PROJECT_PAGE_FAILURE: 'GET_PROJECT_PAGE_FAILURE',
    GET_USER_PROJECTS_REQUEST: 'GET_USER_PROJECTS_REQUEST',
    GET_USER_PROJECTS_FAILURE: 'GET_USER_PROJECTS_FAILURE',
    CREATE_PROJECT_REQUEST: 'CREATE_PROJECT_REQUEST',
    CREATE_PROJECT_SUCCESS: 'CREATE_PROJECT_SUCCESS',
    CREATE_PROJECT_FAILURE: 'CREATE_PROJECT_FAILURE',
    SET_PROJECTS: 'SET_PROJECTS',
    SET_SELECTED_PROJECT: 'SET_SELECTED_PROJECT',
    SET_CURRENT_PROJECT_BY_ID: 'SET_CURRENT_PROJECT_BY_ID',
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
};

/*
Interfaces
 */
export interface IGetProjectPageRequest {
    type: typeof ProjectActions.GET_PROJECT_PAGE_REQUEST;
    payload: string;
}

export interface IGetProjectPageSuccess {
    type: typeof ProjectActions.GET_PROJECT_PAGE_SUCCESS;
    payload: IProject;
}

export interface IGetProjectPageFailure {
    type: typeof ProjectActions.GET_PROJECT_PAGE_FAILURE;
    payload: Error;
}

export interface IGetUserProjectsRequest {
    type: typeof ProjectActions.GET_USER_PROJECTS_REQUEST;
}

export interface IGetUserProjectsFailure {
    type: typeof ProjectActions.GET_USER_PROJECTS_FAILURE;
    payload: Error;
}

export interface ICreateProjectRequest {
    type: typeof ProjectActions.CREATE_PROJECT_REQUEST;
    payload: IProject;
}

export interface ICreateProjectSuccess {
    type: typeof ProjectActions.CREATE_PROJECT_SUCCESS;
    payload: IProject;
}

export interface ICreateProjectFailure {
    type: typeof ProjectActions.CREATE_PROJECT_FAILURE;
    payload: Error;
}

export interface ISetProjects {
    type: typeof ProjectActions.SET_PROJECTS;
    payload: IProject[];
}

export interface ISetSelectedProject {
    type: typeof ProjectActions.SET_SELECTED_PROJECT;
    payload: IProject;
}

export interface ISetCurrentProjectById {
    type: typeof ProjectActions.SET_CURRENT_PROJECT_BY_ID;
    payload: string;
}

export interface IGetProjectRequest {
    type: typeof ProjectActions.GET_PROJECT_REQUEST;
    payload: string;
}

export interface IGetProjectSuccess {
    type: typeof ProjectActions.GET_PROJECT_SUCCESS;
    payload: IProject;
}

export interface IGetProjectFailure {
    type: typeof ProjectActions.GET_PROJECT_FAILURE;
    payload: Error;
}

export interface IUpdateProjectRequest {
    type: typeof ProjectActions.UPDATE_PROJECT_REQUEST;
    payload: IProject;
}

export interface IUpdateProjectSuccess {
    type: typeof ProjectActions.UPDATE_PROJECT_SUCCESS;
    payload: IProject;
}

export interface IUpdateProjectFailure {
    type: typeof ProjectActions.UPDATE_PROJECT_FAILURE;
    payload: Error;
}

export interface IGetBoardInfoRequest {
    type: typeof ProjectActions.GET_BOARD_INFO_REQUEST;
    payload: {
        projectId: string;
        teamId: string;
    };
}

export interface IGetBoardInfoFailure {
    type: typeof ProjectActions.GET_BOARD_INFO_FAILURE;
    payload: Error;
}

export interface IRemoveProjectRequest {
    type: typeof ProjectActions.REMOVE_PROJECT_REQUEST;
    payload: string;
}

export interface IRemoveProjectSuccess {
    type: typeof ProjectActions.REMOVE_PROJECT_SUCCESS;
    payload: string;
}

export interface IRemoveProjectFailure {
    type: typeof ProjectActions.REMOVE_PROJECT_FAILURE;
    payload: Error;
}

export interface IGetProjectStatsPageRequest {
    type: typeof ProjectActions.GET_PROJECTS_STATS_PAGE_REQUEST;
    payload: string;
}

export interface IGetProjectStatsPageFailure {
    type: typeof ProjectActions.GET_PROJECTS_STATS_PAGE_FAILURE;
    payload: Error;
}

export interface IChangeStatsSearchItemsRequest {
    type: typeof ProjectActions.CHANGE_STATS_SEARCH_ITEMS_REQUEST;
    payload: string;
}

export interface IChangeStatsSearchItemsFailure {
    type: typeof ProjectActions.CHANGE_STATS_SEARCH_ITEMS_FAILURE;
    payload: Error;
}

/*
Actions
 */
export function getProjectPageRequest(projectId: string): IGetProjectPageRequest {
    return {
        type: ProjectActions.GET_PROJECT_PAGE_REQUEST,
        payload: projectId,
    };
}

export function getProjectPageSuccess(project: IProject): IGetProjectPageSuccess {
    return {
        type: ProjectActions.GET_PROJECT_PAGE_SUCCESS,
        payload: project,
    };
}

export function getProjectPageFailure(error: Error): IGetProjectPageFailure {
    return {
        type: ProjectActions.GET_PROJECT_PAGE_FAILURE,
        payload: error,
    };
}

export function getUserProjectsRequest(): IGetUserProjectsRequest {
    return {
        type: ProjectActions.GET_USER_PROJECTS_REQUEST,
    };
}

export function getUserProjectsFailure(error: Error): IGetUserProjectsFailure {
    return {
        type: ProjectActions.GET_USER_PROJECTS_FAILURE,
        payload: error,
    };
}

export function createProjectRequest(project: IProject): ICreateProjectRequest {
    return {
        type: ProjectActions.CREATE_PROJECT_REQUEST,
        payload: project,
    };
}

export function createProjectSuccess(project: IProject): ICreateProjectSuccess {
    return {
        type: ProjectActions.CREATE_PROJECT_SUCCESS,
        payload: project,
    };
}

export function createProjectFailure(error: Error): ICreateProjectFailure {
    return {
        type: ProjectActions.CREATE_PROJECT_FAILURE,
        payload: error,
    };
}

export function setProjects(projects: IProject[]): ISetProjects {
    return {
        type: ProjectActions.SET_PROJECTS,
        payload: projects,
    };
}

export function setSelectedProject(project: IProject): ISetSelectedProject {
    return {
        type: ProjectActions.SET_SELECTED_PROJECT,
        payload: project,
    };
}

export function setCurrentProjectById(projectId: string): ISetCurrentProjectById {
    return {
        type: ProjectActions.SET_CURRENT_PROJECT_BY_ID,
        payload: projectId,
    };
}

export function getProjectRequest(projectId: string): IGetProjectRequest {
    return {
        type: ProjectActions.GET_PROJECT_REQUEST,
        payload: projectId,
    };
}

export function getProjectSuccess(project: IProject): IGetProjectSuccess {
    return {
        type: ProjectActions.GET_PROJECT_SUCCESS,
        payload: project,
    };
}

export function getProjectFailure(error: Error): IGetProjectFailure {
    return {
        type: ProjectActions.GET_PROJECT_FAILURE,
        payload: error,
    };
}

export function updateProjectRequest(project: IProject): IUpdateProjectRequest {
    return {
        type: ProjectActions.UPDATE_PROJECT_REQUEST,
        payload: project,
    };
}

export function updateProjectSuccess(project: IProject): IUpdateProjectSuccess {
    return {
        type: ProjectActions.UPDATE_PROJECT_SUCCESS,
        payload: project,
    };
}

export function updateProjectFailure(error: Error): IUpdateProjectFailure {
    return {
        type: ProjectActions.UPDATE_PROJECT_FAILURE,
        payload: error,
    };
}

export function getBoardInfoRequest(projectId: string, teamId: string): IGetBoardInfoRequest {
    return {
        type: ProjectActions.GET_BOARD_INFO_REQUEST,
        payload: {
            projectId,
            teamId,
        },
    };
}

export function getBoardInfoFailure(error: Error): IGetBoardInfoFailure {
    return {
        type: ProjectActions.GET_BOARD_INFO_FAILURE,
        payload: error,
    };
}

export function removeProjectRequest(projectId: string): IRemoveProjectRequest {
    return {
        type: ProjectActions.REMOVE_PROJECT_REQUEST,
        payload: projectId,
    };
}

export function removeProjectSuccess(projectId: string): IRemoveProjectSuccess {
    return {
        type: ProjectActions.REMOVE_PROJECT_SUCCESS,
        payload: projectId,
    };
}

export function removeProjectFailure(error: Error): IRemoveProjectFailure {
    return {
        type: ProjectActions.REMOVE_PROJECT_FAILURE,
        payload: error,
    };
}

export function getProjectStatsPageRequest(projectId: string): IGetProjectStatsPageRequest {
    return {
        type: ProjectActions.GET_PROJECTS_STATS_PAGE_REQUEST,
        payload: projectId,
    };
}

export function getProjectStatsPageFailure(error: Error): IGetProjectStatsPageFailure {
    return {
        type: ProjectActions.GET_PROJECTS_STATS_PAGE_FAILURE,
        payload: error,
    };
}

export function changeStatsSearchItemsRequest(epicId: string): IChangeStatsSearchItemsRequest {
    return {
        type: ProjectActions.CHANGE_STATS_SEARCH_ITEMS_REQUEST,
        payload: epicId,
    };
}

export function changeStatsSearchItemsFailure(error: Error): IChangeStatsSearchItemsFailure {
    return {
        type: ProjectActions.CHANGE_STATS_SEARCH_ITEMS_FAILURE,
        payload: error,
    };
}
