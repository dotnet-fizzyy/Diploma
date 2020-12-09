import { IProject } from '../../types/projectTypes';

export const ProjectActions = {
    GET_USER_PROJECTS_REQUEST: 'GET_USER_PROJECTS_REQUEST',
    GET_USER_PROJECTS_SUCCESS: 'GET_USER_PROJECTS_SUCCESS',
    GET_USER_PROJECTS_FAILURE: 'GET_USER_PROJECTS_FAILURE',
    CREATE_PROJECT_REQUEST: 'CREATE_PROJECT_REQUEST',
    CREATE_PROJECT_SUCCESS: 'CREATE_PROJECT_SUCCESS',
    CREATE_PROJECT_FAILURE: 'CREATE_PROJECT_FAILURE',
    SET_PROJECTS: 'SET_PROJECTS',
    SET_CURRENT_PROJECT: 'SET_CURRENT_PROJECT',
};

//interfaces
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

//actions
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

export type ProjectActionTypes = IGetUserProjectsSuccess & ISetProjects & ISetCurrentProject;
