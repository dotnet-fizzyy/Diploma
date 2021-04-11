import { IProject } from '../../types/projectTypes';

export const ProjectActions = {
    GET_USER_PROJECT_PAGE_REQUEST: 'GET_USER_PROJECT_PAGE_REQUEST',
    GET_USER_PROJECT_PAGE_SUCCESS: 'GET_USER_PROJECT_PAGE_SUCCESS',
    GET_USER_PROJECT_PAGE_FAILURE: 'GET_USER_PROJECT_PAGE_FAILURE',
    GET_USER_PROJECTS_REQUEST: 'GET_USER_PROJECTS_REQUEST',
    GET_USER_PROJECTS_SUCCESS: 'GET_USER_PROJECTS_SUCCESS',
    GET_USER_PROJECTS_FAILURE: 'GET_USER_PROJECTS_FAILURE',
    CREATE_PROJECT_REQUEST: 'CREATE_PROJECT_REQUEST',
    CREATE_PROJECT_SUCCESS: 'CREATE_PROJECT_SUCCESS',
    CREATE_PROJECT_FAILURE: 'CREATE_PROJECT_FAILURE',
    SET_PROJECTS: 'SET_PROJECTS',
    SET_CURRENT_PROJECT: 'SET_CURRENT_PROJECT',
    SET_CURRENT_PROJECT_BY_ID: 'SET_CURRENT_PROJECT_BY_ID',
    GET_PROJECT_REQUEST: 'GET_PROJECT_REQUEST',
    GET_PROJECT_SUCCESS: 'GET_PROJECT_SUCCESS',
    GET_PROJECT_FAILURE: 'GET_PROJECT_FAILURE',
};

/*
Interfaces
 */
export interface IGetUserProjectPageRequest {
    type: typeof ProjectActions.GET_USER_PROJECT_PAGE_REQUEST;
    payload: string;
}

export interface IGetUserProjectPageSuccess {
    type: typeof ProjectActions.GET_USER_PROJECT_PAGE_SUCCESS;
    payload: IProject;
}

export interface IGetUserProjectPageFailure {
    type: typeof ProjectActions.GET_USER_PROJECT_PAGE_FAILURE;
    payload: Error;
}

export interface IGetUserProjectsRequest {
    type: typeof ProjectActions.GET_USER_PROJECTS_REQUEST;
}

export interface IGetUserProjectsSuccess {
    type: typeof ProjectActions.GET_USER_PROJECTS_SUCCESS;
    payload: IProject[];
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

export interface ISetCurrentProject {
    type: typeof ProjectActions.SET_CURRENT_PROJECT;
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

/*
Actions
 */
export function getUserProjectPageRequest(projectId: string): IGetUserProjectPageRequest {
    return {
        type: ProjectActions.GET_USER_PROJECT_PAGE_REQUEST,
        payload: projectId,
    };
}

export function getUserProjectPageSuccess(project: IProject): IGetUserProjectPageSuccess {
    return {
        type: ProjectActions.GET_USER_PROJECT_PAGE_SUCCESS,
        payload: project,
    };
}

export function getUserProjectPageFailure(error: Error): IGetUserProjectPageFailure {
    return {
        type: ProjectActions.GET_USER_PROJECT_PAGE_FAILURE,
        payload: error,
    };
}

export function getUserProjectsRequest(): IGetUserProjectsRequest {
    return {
        type: ProjectActions.GET_USER_PROJECTS_REQUEST,
    };
}

export function getUserProjectsSuccess(projects: IProject[]): IGetUserProjectsSuccess {
    return {
        type: ProjectActions.GET_USER_PROJECTS_SUCCESS,
        payload: projects,
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

export function setCurrentProject(project: IProject): ISetCurrentProject {
    return {
        type: ProjectActions.SET_CURRENT_PROJECT,
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

export type ProjectActionTypes = IGetUserProjectsSuccess &
    IGetUserProjectPageSuccess &
    ISetProjects &
    ISetCurrentProject &
    ISetCurrentProjectById;
