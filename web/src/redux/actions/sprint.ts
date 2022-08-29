import { IBaseAction } from '../../types';
import { ISprint } from '../../types/sprint';

export const SprintActions = {
    GET_SPRINTS_FROM_EPIC_REQUEST: 'GET_SPRINTS_FROM_EPIC_REQUEST',
    GET_SPRINTS_FROM_EPIC_SUCCESS: 'GET_SPRINTS_FROM_EPIC_SUCCESS',
    GET_SPRINTS_FROM_EPIC_FAILURE: 'GET_SPRINTS_FROM_EPIC_FAILURE',
    CREATE_SPRINT_REQUEST: 'CREATE_SPRINT_REQUEST',
    CREATE_SPRINT_SUCCESS: 'CREATE_SPRINT_SUCCESS',
    CREATE_SPRINT_FAILURE: 'CREATE_SPRINT_FAILURE',
    ADD_SPRINTS: 'ADD_SPRINTS',
    SET_SELECTED_SPRINT: 'SET_SELECTED_SPRINT',
    UPDATE_SPRINT_REQUEST: 'UPDATE_SPRINT_REQUEST',
    UPDATE_SPRINT_SUCCESS: 'UPDATE_SPRINT_SUCCESS',
    UPDATE_SPRINT_FAILURE: 'UPDATE_SPRINT_FAILURE',
    REMOVE_SPRINT_REQUEST: 'REMOVE_SPRINT_REQUEST',
    REMOVE_SPRINT_SUCCESS: 'REMOVE_SPRINT_SUCCESS',
    REMOVE_SPRINT_FAILURE: 'REMOVE_SPRINT_FAILURE',
    CHANGE_STATS_SPRINT: 'CHANGE_STATS_SPRINT',
};

/**
 * Interfaces
 */
export interface IGetSprintsFromEpicRequest extends IBaseAction {
    payload: string;
}

export interface IGetSprintsFromEpicSuccess extends IBaseAction {
    payload: ISprint[];
}

export interface IGetSprintsFromEpicFailure extends IBaseAction {
    payload: Error;
}

export interface IAddSprints extends IBaseAction {
    payload: ISprint[];
}

export interface ISetSelectedSprint extends IBaseAction {
    payload: string;
}

export interface ICreateSprintRequest extends IBaseAction {
    payload: ISprint;
}

export interface ICreateSprintSuccess extends IBaseAction {
    payload: ISprint;
}

export interface ICreateSprintFailure extends IBaseAction {
    payload: Error;
}

export interface IUpdateSprintRequest extends IBaseAction {
    payload: ISprint;
}

export interface IUpdateSprintSuccess extends IBaseAction {
    payload: ISprint;
}

export interface IUpdateSprintFailure extends IBaseAction {
    payload: Error;
}

export interface IRemoveSprintRequest extends IBaseAction {
    payload: string;
}

export interface IRemoveSprintSuccess extends IBaseAction {
    payload: string;
}

export interface IRemoveSprintFailure extends IBaseAction {
    payload: Error;
}

export interface IChangesStatsSprint extends IBaseAction {
    payload: string;
}

/**
 * Actions
 */
export const getSprintsFromEpicRequest = (epicId: string): IGetSprintsFromEpicRequest => ({
    type: SprintActions.GET_SPRINTS_FROM_EPIC_REQUEST,
    payload: epicId,
});

export const getSprintsFromEpicSuccess = (sprints: ISprint[]): IGetSprintsFromEpicSuccess => ({
    type: SprintActions.GET_SPRINTS_FROM_EPIC_SUCCESS,
    payload: sprints,
});

export const getSprintsFromEpicFailure = (error: Error): IGetSprintsFromEpicFailure => ({
    type: SprintActions.GET_SPRINTS_FROM_EPIC_FAILURE,
    payload: error,
});

export const addSprints = (sprints: ISprint[]): IAddSprints => ({
    type: SprintActions.ADD_SPRINTS,
    payload: sprints,
});

export const setSelectedSprint = (sprintId: string): ISetSelectedSprint => ({
    type: SprintActions.SET_SELECTED_SPRINT,
    payload: sprintId,
});

export const createSprintRequest = (sprint: ISprint): ICreateSprintRequest => ({
    type: SprintActions.CREATE_SPRINT_REQUEST,
    payload: sprint,
});

export const createSprintSuccess = (sprint: ISprint): ICreateSprintSuccess => ({
    type: SprintActions.CREATE_SPRINT_SUCCESS,
    payload: sprint,
});

export const createSprintFailure = (error: Error): ICreateSprintFailure => ({
    type: SprintActions.CREATE_SPRINT_FAILURE,
    payload: error,
});

export const updateSprintRequest = (sprint: ISprint): IUpdateSprintRequest => ({
    type: SprintActions.UPDATE_SPRINT_REQUEST,
    payload: sprint,
});

export const updateSprintSuccess = (sprint: ISprint): IUpdateSprintSuccess => ({
    type: SprintActions.UPDATE_SPRINT_SUCCESS,
    payload: sprint,
});

export const updateSprintFailure = (error: Error): IUpdateSprintFailure => ({
    type: SprintActions.UPDATE_SPRINT_FAILURE,
    payload: error,
});

export const removeSprintRequest = (sprintId: string): IRemoveSprintRequest => ({
    type: SprintActions.REMOVE_SPRINT_REQUEST,
    payload: sprintId,
});

export const removeSprintSuccess = (sprintId: string): IRemoveSprintSuccess => ({
    type: SprintActions.REMOVE_SPRINT_SUCCESS,
    payload: sprintId,
});

export const removeSprintFailure = (error: Error): IRemoveSprintFailure => ({
    type: SprintActions.REMOVE_SPRINT_FAILURE,
    payload: error,
});

export const changeStatsSprint = (sprintId: string): IChangesStatsSprint => ({
    type: SprintActions.CHANGE_STATS_SPRINT,
    payload: sprintId,
});
