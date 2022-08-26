import { IBaseAction } from '../../types';
import { ITeam, ITeamSimpleModel } from '../../types/teamTypes';

export const TeamActions = {
    GET_USER_TEAM_PAGE_REQUEST: 'GET_USER_TEAM_PAGE_REQUEST',
    GET_USER_TEAM_PAGE_SUCCESS: 'GET_USER_TEAM_PAGE_SUCCESS',
    GET_USER_TEAM_PAGE_FAILURE: 'GET_USER_TEAM_PAGE_FAILURE',
    CREATE_TEAM_REQUEST: 'CREATE_TEAM_REQUEST',
    CREATE_TEAM_SUCCESS: 'CREATE_TEAM_SUCCESS',
    CREATE_TEAM_FAILURE: 'CREATE_TEAM_FAILURE',
    SET_SELECTED_TEAM: 'SET_SELECTED_TEAM',
    SET_SELECTED_TEAM_BY_ID: 'SET_SELECTED_TEAM_BY_ID',
    ADD_TEAM_SIMPLE_ITEMS: 'ADD_TEAM_SIMPLE_ITEMS',
    UPDATE_TEAM_REQUEST: 'UPDATE_TEAM_REQUEST',
    UPDATE_TEAM_SUCCESS: 'UPDATE_TEAM_SUCCESS',
    UPDATE_TEAM_FAILURE: 'UPDATE_TEAM_FAILURE',
    REMOVE_TEAM_REQUEST: 'REMOVE_TEAM_REQUEST',
    REMOVE_TEAM_SUCCESS: 'REMOVE_TEAM_SUCCESS',
    REMOVE_TEAM_FAILURE: 'REMOVE_TEAM_FAILURE',
};

/**
 * Interfaces
 */
export interface IGetUserTeamPageRequest extends IBaseAction {
    payload: string;
}

export interface IGetUserTeamPageSuccess extends IBaseAction {
    payload: ITeam;
}

export interface IGetUserTeamPageFailure extends IBaseAction {
    payload: Error;
}

export interface ICreateTeamRequest extends IBaseAction {
    payload: ITeam;
}

export interface ICreateTeamSuccess extends IBaseAction {
    payload: ITeam;
}

export interface ICreateTeamFailure extends IBaseAction {
    payload: Error;
}

export interface ISetSelectedTeam extends IBaseAction {
    payload: ITeam;
}

export interface ISetSelectedTeamById extends IBaseAction {
    payload: string;
}

export interface IAddTeamSimpleItems extends IBaseAction {
    payload: ITeamSimpleModel[];
}

export interface IUpdateTeamRequest extends IBaseAction {
    payload: ITeam;
}

export interface IUpdateTeamSuccess extends IBaseAction {
    payload: ITeam;
}

export interface IUpdateTeamFailure extends IBaseAction {
    payload: Error;
}

export interface IRemoveTeamRequest extends IBaseAction {
    payload: string;
}

export interface IRemoveTeamSuccess extends IBaseAction {
    payload: string;
}

export interface IRemoveTeamFailure extends IBaseAction {
    payload: Error;
}

/**
 * Actions
 */
export const getUserTeamPageRequest = (teamId: string): IGetUserTeamPageRequest => ({
    type: TeamActions.GET_USER_TEAM_PAGE_REQUEST,
    payload: teamId,
});

export const getUserTeamPageSuccess = (team: ITeam): IGetUserTeamPageSuccess => ({
    type: TeamActions.GET_USER_TEAM_PAGE_SUCCESS,
    payload: team,
});

export const getUserTeamPageFailure = (error: Error): IGetUserTeamPageFailure => ({
    type: TeamActions.GET_USER_TEAM_PAGE_FAILURE,
    payload: error,
});

export const createTeamRequest = (team: ITeam): ICreateTeamRequest => ({
    type: TeamActions.CREATE_TEAM_REQUEST,
    payload: team,
});

export const createTeamSuccess = (team: ITeam): ICreateTeamSuccess => ({
    type: TeamActions.CREATE_TEAM_SUCCESS,
    payload: team,
});

export const createTeamFailure = (error: Error): ICreateTeamFailure => ({
    type: TeamActions.CREATE_TEAM_FAILURE,
    payload: error,
});

export const setSelectedTeam = (team: ITeam): ISetSelectedTeam => ({
    type: TeamActions.SET_SELECTED_TEAM,
    payload: team,
});

export const setSelectedTeamById = (teamId: string): ISetSelectedTeamById => ({
    type: TeamActions.SET_SELECTED_TEAM_BY_ID,
    payload: teamId,
});

export const addTeamSimpleItems = (items: ITeamSimpleModel[]): IAddTeamSimpleItems => ({
    type: TeamActions.ADD_TEAM_SIMPLE_ITEMS,
    payload: items,
});

export const updateTeamRequest = (team: ITeam): IUpdateTeamRequest => ({
    type: TeamActions.UPDATE_TEAM_REQUEST,
    payload: team,
});

export const updateTeamSuccess = (team: ITeam): IUpdateTeamSuccess => ({
    type: TeamActions.UPDATE_TEAM_SUCCESS,
    payload: team,
});

export const updateTeamFailure = (error: Error): IUpdateTeamFailure => ({
    type: TeamActions.UPDATE_TEAM_FAILURE,
    payload: error,
});

export const removeTeamRequest = (teamId: string): IRemoveTeamRequest => ({
    type: TeamActions.REMOVE_TEAM_REQUEST,
    payload: teamId,
});

export const removeTeamSuccess = (teamId: string): IRemoveTeamSuccess => ({
    type: TeamActions.REMOVE_TEAM_SUCCESS,
    payload: teamId,
});

export const removeTeamFailure = (error: Error): IRemoveTeamFailure => ({
    type: TeamActions.REMOVE_TEAM_FAILURE,
    payload: error,
});
