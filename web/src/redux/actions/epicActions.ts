import { IEpic, IEpicSimpleModel } from '../../types/epicTypes';

export const EpicActions = {
    CREATE_EPIC_REQUEST: 'CREATE_EPIC_REQUEST',
    CREATE_EPIC_SUCCESS: 'CREATE_EPIC_SUCCESS',
    CREATE_EPIC_FAILURE: 'CREATE_EPIC_FAILURE',
    GET_EPICS_REQUEST: 'GET_EPICS_REQUEST',
    GET_EPICS_SUCCESS: 'GET_EPICS_SUCCESS',
    GET_EPICS_FAILURE: 'GET_EPICS_FAILURE',
    SET_SELECTED_EPIC: 'SET_SELECTED_EPIC',
    SET_SELECTED_EPIC_BY_ID: 'SET_SELECTED_EPIC_BY_ID',
    ADD_EPICS: 'ADD_EPICS',
    ADD_SIMPLE_EPICS: 'ADD_SIMPLE_EPICS',
    UPDATE_EPIC_REQUEST: 'UPDATE_EPIC_REQUEST',
    UPDATE_EPIC_SUCCESS: 'UPDATE_EPIC_SUCCESS',
    UPDATE_EPIC_FAILURE: 'UPDATE_EPIC_FAILURE',
    REMOVE_EPIC_REQUEST: 'REMOVE_EPIC_REQUEST',
    REMOVE_EPIC_SUCCESS: 'REMOVE_EPIC_SUCCESS',
    REMOVE_EPIC_FAILURE: 'REMOVE_EPIC_FAILURE',
    CHANGE_STATS_EPIC: 'CHANGE_STATS_EPIC',
};

/*
Interfaces
 */
export interface ICreateEpicRequest {
    type: typeof EpicActions.CREATE_EPIC_REQUEST;
    payload: IEpic;
}

export interface ICreateEpicSuccess {
    type: typeof EpicActions.CREATE_EPIC_SUCCESS;
    payload: IEpic;
}

export interface ICreateEpicFailure {
    type: typeof EpicActions.CREATE_EPIC_FAILURE;
    payload: Error;
}

export interface IGetEpicsRequest {
    type: typeof EpicActions.GET_EPICS_REQUEST;
    payload: string;
}

export interface IGetEpicsSuccess {
    type: typeof EpicActions.GET_EPICS_SUCCESS;
    payload: IEpic[];
}

export interface IGetEpicsFailure {
    type: typeof EpicActions.GET_EPICS_FAILURE;
    payload: Error;
}

export interface ISetSelectedEpic {
    type: typeof EpicActions.SET_SELECTED_EPIC;
    payload: IEpic;
}

export interface ISetSelectedEpicById {
    type: typeof EpicActions.SET_SELECTED_EPIC_BY_ID;
    payload: string;
}

export interface IAddEpics {
    type: typeof EpicActions.ADD_EPICS;
    payload: IEpic[];
}

export interface IAddSimpleEpics {
    type: typeof EpicActions.ADD_SIMPLE_EPICS;
    payload: IEpicSimpleModel[];
}

export interface IUpdateEpicRequest {
    type: typeof EpicActions.UPDATE_EPIC_REQUEST;
    payload: IEpic;
}

export interface IUpdateEpicSuccess {
    type: typeof EpicActions.UPDATE_EPIC_SUCCESS;
    payload: IEpic;
}

export interface IUpdateEpicFailure {
    type: typeof EpicActions.UPDATE_EPIC_FAILURE;
    payload: Error;
}

export interface IRemoveEpicRequest {
    type: typeof EpicActions.REMOVE_EPIC_REQUEST;
    payload: string;
}

export interface IRemoveEpicSuccess {
    type: typeof EpicActions.REMOVE_EPIC_SUCCESS;
    payload: string;
}

export interface IRemoveEpicFailure {
    type: typeof EpicActions.REMOVE_EPIC_FAILURE;
    payload: Error;
}

export interface IChangeStatsEpic {
    type: typeof EpicActions.CHANGE_STATS_EPIC;
    payload: string;
}

/*
Actions
 */
export function createEpicRequest(epic: IEpic): ICreateEpicRequest {
    return {
        type: EpicActions.CREATE_EPIC_REQUEST,
        payload: epic,
    };
}

export function createEpicSuccess(epic: IEpic): ICreateEpicSuccess {
    return {
        type: EpicActions.CREATE_EPIC_SUCCESS,
        payload: epic,
    };
}

export function createEpicFailure(error: Error): ICreateEpicFailure {
    return {
        type: EpicActions.CREATE_EPIC_FAILURE,
        payload: error,
    };
}

export function getEpicsRequest(projectId: string): IGetEpicsRequest {
    return {
        type: EpicActions.GET_EPICS_REQUEST,
        payload: projectId,
    };
}

export function getEpicsSuccess(epics: IEpic[]): IGetEpicsSuccess {
    return {
        type: EpicActions.GET_EPICS_SUCCESS,
        payload: epics,
    };
}

export function getEpicsFailure(error: Error): IGetEpicsFailure {
    return {
        type: EpicActions.GET_EPICS_FAILURE,
        payload: error,
    };
}

export function setSelectedEpic(epic: IEpic): ISetSelectedEpic {
    return {
        type: EpicActions.SET_SELECTED_EPIC,
        payload: epic,
    };
}

export function setSelectedEpicById(epicId: string): ISetSelectedEpicById {
    return {
        type: EpicActions.SET_SELECTED_EPIC_BY_ID,
        payload: epicId,
    };
}

export function addEpics(epics: IEpic[]): IAddEpics {
    return {
        type: EpicActions.ADD_EPICS,
        payload: epics,
    };
}

export function addSimpleEpics(epics: IEpicSimpleModel[]): IAddSimpleEpics {
    return {
        type: EpicActions.ADD_SIMPLE_EPICS,
        payload: epics,
    };
}

export function updateEpicRequest(epic: IEpic): IUpdateEpicRequest {
    return {
        type: EpicActions.UPDATE_EPIC_REQUEST,
        payload: epic,
    };
}

export function updateEpicSuccess(epic: IEpic): IUpdateEpicSuccess {
    return {
        type: EpicActions.UPDATE_EPIC_SUCCESS,
        payload: epic,
    };
}

export function updateEpicFailure(error: Error): IUpdateEpicFailure {
    return {
        type: EpicActions.UPDATE_EPIC_FAILURE,
        payload: error,
    };
}

export function removeEpicRequest(epicId: string): IRemoveEpicRequest {
    return {
        type: EpicActions.REMOVE_EPIC_REQUEST,
        payload: epicId,
    };
}

export function removeEpicSuccess(epicId: string): IRemoveEpicSuccess {
    return {
        type: EpicActions.REMOVE_EPIC_SUCCESS,
        payload: epicId,
    };
}

export function removeEpicFailure(error: Error): IRemoveEpicFailure {
    return {
        type: EpicActions.REMOVE_EPIC_FAILURE,
        payload: error,
    };
}

export function changeStatsEpic(epicId: string): IChangeStatsEpic {
    return {
        type: EpicActions.CHANGE_STATS_EPIC,
        payload: epicId,
    };
}
