import { ISprint } from '../../types/sprintTypes';

export const SprintActions = {
    GET_SPRINTS_REQUEST: 'GET_SPRINTS_REQUEST',
    GET_SPRINTS_SUCCESS: 'GET_SPRINTS_SUCCESS',
    GET_SPRINTS_FAILURE: 'GET_SPRINTS_FAILURE',
    ADD_SPRINTS: 'ADD_SPRINTS',
    SET_SELECTED_SPRINT: 'SET_SELECTED_SPRINT',
};

//interfaces
export interface IGetSprintsRequest {
    type: typeof SprintActions.GET_SPRINTS_REQUEST;
    payload: string;
}

export interface IGetSprintsSuccess {
    type: typeof SprintActions.GET_SPRINTS_SUCCESS;
    payload: ISprint[];
}

export interface IGetSprintsFailure {
    type: typeof SprintActions.GET_SPRINTS_FAILURE;
    payload: Error;
}

export interface IAddSprints {
    type: typeof SprintActions.GET_SPRINTS_FAILURE;
    payload: ISprint[];
}

export interface ISetSelectedSprint {
    type: typeof SprintActions.SET_SELECTED_SPRINT;
    payload: string;
}

//actions
export function getSprintsRequest(epicId: string): IGetSprintsRequest {
    return {
        type: SprintActions.GET_SPRINTS_REQUEST,
        payload: epicId,
    };
}

export function getSprintsSuccess(sprints: ISprint[]): IGetSprintsSuccess {
    return {
        type: SprintActions.GET_SPRINTS_SUCCESS,
        payload: sprints,
    };
}

export function getSprintsFailure(error: Error): IGetSprintsFailure {
    return {
        type: SprintActions.GET_SPRINTS_SUCCESS,
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

export type SprintsActionTypes = IGetSprintsSuccess & IAddSprints & ISetSelectedSprint;
