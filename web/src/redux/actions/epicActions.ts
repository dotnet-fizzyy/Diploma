import { IEpic } from '../../types/epicTypes';

export const EpicActions = {
    GET_EPICS_REQUEST: 'GET_EPICS_REQUEST',
    GET_EPICS_SUCCESS: 'GET_EPICS_SUCCESS',
    GET_EPICS_FAILURE: 'GET_EPICS_FAILURE',
    SET_CURRENT_EPIC: 'SET_CURRENT_EPIC',
};

//interfaces
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

//actions
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

export type EpicActionTypes = IGetEpicsRequest & IGetEpicsSuccess & ISetCurrentEpic;
