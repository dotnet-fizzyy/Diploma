import { ITeam, ITeamListItem } from '../../types/teamTypes';

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
    payload: ITeamListItem[];
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

export function addTeamSimpleItems(items: ITeamListItem[]): IAddTeamSimpleItems {
    return {
        type: TeamActions.ADD_TEAM_SIMPLE_ITEMS,
        payload: items,
    };
}

export type TeamActionsType = IGetUserTeamPageSuccess &
    ISetSelectedTeam &
    ISetSelectedTeamById &
    ICreateTeamSuccess &
    IAddTeamSimpleItems;
