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

/*
Interfaces
 */
export interface IGetUserTeamPageRequest {
    type: typeof TeamActions.GET_USER_TEAM_PAGE_REQUEST;
    payload: string;
}

export interface IGetUserTeamPageSuccess {
    type: typeof TeamActions.GET_USER_TEAM_PAGE_SUCCESS;
    payload: ITeam;
}

export interface IGetUserTeamPageFailure {
    type: typeof TeamActions.GET_USER_TEAM_PAGE_FAILURE;
    payload: Error;
}

export interface ICreateTeamRequest {
    type: typeof TeamActions.CREATE_TEAM_REQUEST;
    payload: ITeam;
}

export interface ICreateTeamSuccess {
    type: typeof TeamActions.CREATE_TEAM_SUCCESS;
    payload: ITeam;
}

export interface ICreateTeamFailure {
    type: typeof TeamActions.CREATE_TEAM_FAILURE;
    payload: Error;
}

export interface ISetSelectedTeam {
    type: typeof TeamActions.SET_SELECTED_TEAM;
    payload: ITeam;
}

export interface ISetSelectedTeamById {
    type: typeof TeamActions.SET_SELECTED_TEAM_BY_ID;
    payload: string;
}

export interface IAddTeamSimpleItems {
    type: typeof TeamActions.ADD_TEAM_SIMPLE_ITEMS;
    payload: ITeamSimpleModel[];
}

export interface IUpdateTeamRequest {
    type: typeof TeamActions.UPDATE_TEAM_REQUEST;
    payload: ITeam;
}

export interface IUpdateTeamSuccess {
    type: typeof TeamActions.UPDATE_TEAM_SUCCESS;
    payload: ITeam;
}

export interface IUpdateTeamFailure {
    type: typeof TeamActions.UPDATE_TEAM_FAILURE;
    payload: Error;
}

export interface IRemoveTeamRequest {
    type: typeof TeamActions.REMOVE_TEAM_REQUEST;
    payload: string;
}

export interface IRemoveTeamSuccess {
    type: typeof TeamActions.REMOVE_TEAM_SUCCESS;
    payload: string;
}

export interface IRemoveTeamFailure {
    type: typeof TeamActions.REMOVE_TEAM_FAILURE;
    payload: Error;
}

/*
Actions
 */
export function getUserTeamPageRequest(teamId: string): IGetUserTeamPageRequest {
    return {
        type: TeamActions.GET_USER_TEAM_PAGE_REQUEST,
        payload: teamId,
    };
}

export function getUserTeamPageSuccess(team: ITeam): IGetUserTeamPageSuccess {
    return {
        type: TeamActions.GET_USER_TEAM_PAGE_SUCCESS,
        payload: team,
    };
}

export function getUserTeamPageFailure(error: Error): IGetUserTeamPageFailure {
    return {
        type: TeamActions.GET_USER_TEAM_PAGE_FAILURE,
        payload: error,
    };
}

export function createTeamRequest(team: ITeam): ICreateTeamRequest {
    return {
        type: TeamActions.CREATE_TEAM_REQUEST,
        payload: team,
    };
}

export function createTeamSuccess(team: ITeam): ICreateTeamSuccess {
    return {
        type: TeamActions.CREATE_TEAM_SUCCESS,
        payload: team,
    };
}

export function createTeamFailure(error: Error): ICreateTeamFailure {
    return {
        type: TeamActions.CREATE_TEAM_FAILURE,
        payload: error,
    };
}

export function setSelectedTeam(team: ITeam): ISetSelectedTeam {
    return {
        type: TeamActions.SET_SELECTED_TEAM,
        payload: team,
    };
}

export function setSelectedTeamById(teamId: string): ISetSelectedTeamById {
    return {
        type: TeamActions.SET_SELECTED_TEAM_BY_ID,
        payload: teamId,
    };
}

export function addTeamSimpleItems(items: ITeamSimpleModel[]): IAddTeamSimpleItems {
    return {
        type: TeamActions.ADD_TEAM_SIMPLE_ITEMS,
        payload: items,
    };
}

export function updateTeamRequest(team: ITeam): IUpdateTeamRequest {
    return {
        type: TeamActions.UPDATE_TEAM_REQUEST,
        payload: team,
    };
}

export function updateTeamSuccess(team: ITeam): IUpdateTeamSuccess {
    return {
        type: TeamActions.UPDATE_TEAM_SUCCESS,
        payload: team,
    };
}

export function updateTeamFailure(error: Error): IUpdateTeamFailure {
    return {
        type: TeamActions.UPDATE_TEAM_FAILURE,
        payload: error,
    };
}

export function removeTeamRequest(teamId: string): IRemoveTeamRequest {
    return {
        type: TeamActions.REMOVE_TEAM_REQUEST,
        payload: teamId,
    };
}

export function removeTeamSuccess(teamId: string): IRemoveTeamSuccess {
    return {
        type: TeamActions.REMOVE_TEAM_SUCCESS,
        payload: teamId,
    };
}

export function removeTeamFailure(error: Error): IRemoveTeamFailure {
    return {
        type: TeamActions.REMOVE_TEAM_FAILURE,
        payload: error,
    };
}
