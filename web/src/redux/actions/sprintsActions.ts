import { ISprint } from '../../types/sprintTypes';

export const SprintActions = {
    GET_SPRINTS_FROM_EPIC_REQUEST: 'GET_SPRINTS_FROM_EPIC_REQUEST',
    GET_SPRINTS_FROM_EPIC_SUCCESS: 'GET_SPRINTS_FROM_EPIC_SUCCESS',
    GET_SPRINTS_FROM_EPIC_FAILURE: 'GET_SPRINTS_FROM_EPIC_FAILURE',
    CREATE_SPRINT_REQUEST: 'CREATE_SPRINT_REQUEST',
    CREATE_SPRINT_SUCCESS: 'CREATE_SPRINT_SUCCESS',
    CREATE_SPRINT_FAILURE: 'CREATE_SPRINT_FAILURE',
    ADD_SPRINTS: 'ADD_SPRINTS',
    SET_SELECTED_SPRINT: 'SET_SELECTED_SPRINT',
    GET_FULL_SPRINTS_FROM_EPIC_REQUEST: 'GET_FULL_SPRINTS_FROM_EPIC_REQUEST',
    GET_FULL_SPRINTS_FROM_EPIC_SUCCESS: 'GET_FULL_SPRINTS_FROM_EPIC_SUCCESS',
    GET_FULL_SPRINTS_FROM_EPIC_FAILURE: 'GET_FULL_SPRINTS_FROM_EPIC_FAILURE',
};

//interfaces
export interface IGetSprintsFromEpicRequest {
    type: typeof SprintActions.GET_SPRINTS_FROM_EPIC_REQUEST;
    payload: string;
}

export interface IGetSprintsFromEpicSuccess {
    type: typeof SprintActions.GET_SPRINTS_FROM_EPIC_SUCCESS;
    payload: ISprint[];
}

export interface IGetSprintsFromEpicFailure {
    type: typeof SprintActions.GET_SPRINTS_FROM_EPIC_FAILURE;
    payload: Error;
}

export interface IAddSprints {
    type: typeof SprintActions.ADD_SPRINTS;
    payload: ISprint[];
}

export interface ISetSelectedSprint {
    type: typeof SprintActions.SET_SELECTED_SPRINT;
    payload: string;
}

export interface ICreateSprintRequest {
    type: typeof SprintActions.CREATE_SPRINT_REQUEST;
    payload: ISprint;
}

export interface ICreateSprintSuccess {
    type: typeof SprintActions.CREATE_SPRINT_SUCCESS;
    payload: ISprint;
}

export interface ICreateSprintFailure {
    type: typeof SprintActions.CREATE_SPRINT_FAILURE;
    payload: Error;
}

export interface IGetFullSprintsFromEpicRequest {
    type: typeof SprintActions.GET_FULL_SPRINTS_FROM_EPIC_REQUEST;
}

export interface IGetFullSprintsFromEpicSuccess {
    type: typeof SprintActions.GET_FULL_SPRINTS_FROM_EPIC_SUCCESS;
    payload: ISprint[];
}

export interface IGetFullSprintsFromEpicFailure {
    type: typeof SprintActions.GET_FULL_SPRINTS_FROM_EPIC_FAILURE;
    payload: Error;
}

//actions
export function getSprintsFromEpicRequest(epicId: string): IGetSprintsFromEpicRequest {
    return {
        type: SprintActions.GET_SPRINTS_FROM_EPIC_REQUEST,
        payload: epicId,
    };
}

export function getSprintsFromEpicSuccess(sprints: ISprint[]): IGetSprintsFromEpicSuccess {
    return {
        type: SprintActions.GET_SPRINTS_FROM_EPIC_SUCCESS,
        payload: sprints,
    };
}

export function getSprintsFromEpicFailure(error: Error): IGetSprintsFromEpicFailure {
    return {
        type: SprintActions.GET_SPRINTS_FROM_EPIC_FAILURE,
        payload: error,
    };
}

export function addSprints(sprints: ISprint[]): IAddSprints {
    return {
        type: SprintActions.ADD_SPRINTS,
        payload: sprints,
    };
}

export function setSelectedSprint(sprintId: string): ISetSelectedSprint {
    return {
        type: SprintActions.SET_SELECTED_SPRINT,
        payload: sprintId,
    };
}

export function createSprintRequest(sprint: ISprint): ICreateSprintRequest {
    return {
        type: SprintActions.CREATE_SPRINT_REQUEST,
        payload: sprint,
    };
}

export function createSprintSuccess(sprint: ISprint): ICreateSprintSuccess {
    return {
        type: SprintActions.CREATE_SPRINT_SUCCESS,
        payload: sprint,
    };
}

export function createSprintFailure(error: Error): ICreateSprintFailure {
    return {
        type: SprintActions.CREATE_SPRINT_FAILURE,
        payload: error,
    };
}

export function getFullSprintsFromEpicRequest(): IGetFullSprintsFromEpicRequest {
    return {
        type: SprintActions.GET_FULL_SPRINTS_FROM_EPIC_REQUEST,
    };
}

export function getFullSprintsFromEpicSuccess(sprints: ISprint[]): IGetFullSprintsFromEpicSuccess {
    return {
        type: SprintActions.GET_FULL_SPRINTS_FROM_EPIC_SUCCESS,
        payload: sprints,
    };
}

export function getFullSprintsFromEpicFailure(error: Error): IGetFullSprintsFromEpicFailure {
    return {
        type: SprintActions.GET_FULL_SPRINTS_FROM_EPIC_FAILURE,
        payload: error,
    };
}

export type SprintsActionTypes = IGetFullSprintsFromEpicSuccess &
    IGetSprintsFromEpicSuccess &
    IAddSprints &
    ISetSelectedSprint &
    ICreateSprintSuccess;
