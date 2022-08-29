import { IBaseAction } from '../../types';
import { IEpic, IEpicSimpleModel } from '../../types/epic';

export const EpicActions = {
    CREATE_EPIC_REQUEST: 'CREATE_EPIC_REQUEST',
    CREATE_EPIC_SUCCESS: 'CREATE_EPIC_SUCCESS',
    CREATE_EPIC_FAILURE: 'CREATE_EPIC_FAILURE',
    GET_EPICS_REQUEST: 'GET_EPICS_REQUEST',
    GET_EPICS_SUCCESS: 'GET_EPICS_SUCCESS',
    GET_EPICS_FAILURE: 'GET_EPICS_FAILURE',
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

/**
 * Interfaces
 */

export interface ICreateEpicRequest extends IBaseAction {
    payload: IEpic;
}

export interface ICreateEpicSuccess extends IBaseAction {
    payload: IEpic;
}

export interface ICreateEpicFailure extends IBaseAction {
    payload: Error;
}

export interface IGetEpicsRequest extends IBaseAction {
    payload: string;
}

export interface IGetEpicsSuccess extends IBaseAction {
    payload: IEpic[];
}

export interface IGetEpicsFailure extends IBaseAction {
    payload: Error;
}

export interface ISetSelectedEpicById extends IBaseAction {
    payload: string;
}

export interface IAddEpics extends IBaseAction {
    payload: IEpic[];
}

export interface IAddSimpleEpics extends IBaseAction {
    payload: IEpicSimpleModel[];
}

export interface IUpdateEpicRequest extends IBaseAction {
    payload: IEpic;
}

export interface IUpdateEpicSuccess extends IBaseAction {
    payload: IEpic;
}

export interface IUpdateEpicFailure extends IBaseAction {
    payload: Error;
}

export interface IRemoveEpicRequest extends IBaseAction {
    payload: string;
}

export interface IRemoveEpicSuccess extends IBaseAction {
    payload: string;
}

export interface IRemoveEpicFailure extends IBaseAction {
    payload: Error;
}

export interface IChangeStatsEpic extends IBaseAction {
    payload: string;
}

/**
 * Actions
 */

export const createEpicRequest = (epic: IEpic): ICreateEpicRequest => ({
    type: EpicActions.CREATE_EPIC_REQUEST,
    payload: epic,
});

export const createEpicSuccess = (epic: IEpic): ICreateEpicSuccess => ({
    type: EpicActions.CREATE_EPIC_SUCCESS,
    payload: epic,
});

export const createEpicFailure = (error: Error): ICreateEpicFailure => ({
    type: EpicActions.CREATE_EPIC_FAILURE,
    payload: error,
});

export const getEpicsSuccess = (epics: IEpic[]): IGetEpicsSuccess => ({
    type: EpicActions.GET_EPICS_SUCCESS,
    payload: epics,
});

export const getEpicsFailure = (error: Error): IGetEpicsFailure => ({
    type: EpicActions.GET_EPICS_FAILURE,
    payload: error,
});

export const setSelectedEpicById = (epicId: string): ISetSelectedEpicById => ({
    type: EpicActions.SET_SELECTED_EPIC_BY_ID,
    payload: epicId,
});

export const addEpics = (epics: IEpic[]): IAddEpics => ({
    type: EpicActions.ADD_EPICS,
    payload: epics,
});

export const addSimpleEpics = (epics: IEpicSimpleModel[]): IAddSimpleEpics => ({
    type: EpicActions.ADD_SIMPLE_EPICS,
    payload: epics,
});

export const updateEpicRequest = (epic: IEpic): IUpdateEpicRequest => ({
    type: EpicActions.UPDATE_EPIC_REQUEST,
    payload: epic,
});

export const updateEpicSuccess = (epic: IEpic): IUpdateEpicSuccess => ({
    type: EpicActions.UPDATE_EPIC_SUCCESS,
    payload: epic,
});

export const updateEpicFailure = (error: Error): IUpdateEpicFailure => ({
    type: EpicActions.UPDATE_EPIC_FAILURE,
    payload: error,
});

export const removeEpicRequest = (epicId: string): IRemoveEpicRequest => ({
    type: EpicActions.REMOVE_EPIC_REQUEST,
    payload: epicId,
});

export const removeEpicSuccess = (epicId: string): IRemoveEpicSuccess => ({
    type: EpicActions.REMOVE_EPIC_SUCCESS,
    payload: epicId,
});

export const removeEpicFailure = (error: Error): IRemoveEpicFailure => ({
    type: EpicActions.REMOVE_EPIC_FAILURE,
    payload: error,
});

export const changeStatsEpic = (epicId: string): IChangeStatsEpic => ({
    type: EpicActions.CHANGE_STATS_EPIC,
    payload: epicId,
});
