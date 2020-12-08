import { IEpic } from '../../types/epicTypes';

export const EpicActions = {
    CREATE_EPIC_REQUEST: 'CREATE_EPIC_REQUEST',
    CREATE_EPIC_SUCCESS: 'CREATE_EPIC_SUCCESS',
    CREATE_EPIC_FAILURE: 'CREATE_EPIC_FAILURE',
    GET_EPICS_REQUEST: 'GET_EPICS_REQUEST',
    GET_EPICS_SUCCESS: 'GET_EPICS_SUCCESS',
    GET_EPICS_FAILURE: 'GET_EPICS_FAILURE',
    SET_CURRENT_EPIC: 'SET_CURRENT_EPIC',
    SET_CURRENT_EPIC_BY_ID: 'SET_CURRENT_EPIC_BY_ID',
};

//interfaces
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

export interface ISetCurrentEpic {
    type: typeof EpicActions.SET_CURRENT_EPIC;
    payload: IEpic;
}

export interface ISetCurrentEpicById {
    type: typeof EpicActions.SET_CURRENT_EPIC_BY_ID;
    payload: string;
}

//actions
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

export function setCurrentEpic(epic: IEpic): ISetCurrentEpic {
    return {
        type: EpicActions.SET_CURRENT_EPIC,
        payload: epic,
    };
}

export function setCurrentEpicById(epicId: string): ISetCurrentEpicById {
    return {
        type: EpicActions.SET_CURRENT_EPIC_BY_ID,
        payload: epicId,
    };
}

export type EpicActionTypes = ICreateEpicSuccess & IGetEpicsRequest & IGetEpicsSuccess & ISetCurrentEpic;
