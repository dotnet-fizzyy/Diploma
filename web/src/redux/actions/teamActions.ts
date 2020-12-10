import { ITeam } from '../../types/teamTypes';

export const TeamActions = {
    GET_USER_TEAMS_REQUEST: 'GET_USER_TEAMS_REQUEST',
    GET_USER_TEAMS_SUCCESS: 'GET_USER_TEAMS_SUCCESS',
    GET_USER_TEAMS_FAILURE: 'GET_USER_TEAMS_FAILURE',
    CREATE_TEAM_REQUEST: 'CREATE_TEAM_REQUEST',
    CREATE_TEAM_SUCCESS: 'CREATE_TEAM_SUCCESS',
    CREATE_TEAM_FAILURE: 'CREATE_TEAM_FAILURE',
    SET_SELECTED_TEAM: 'SET_SELECTED_TEAM',
    SET_SELECTED_TEAM_BY_ID: 'SET_SELECTED_TEAM_BY_ID',
};

//interfaces
export interface IGetUserTeamsRequest {
    type: typeof TeamActions.GET_USER_TEAMS_REQUEST;
}

export interface IGetUserTeamsSuccess {
    type: typeof TeamActions.GET_USER_TEAMS_SUCCESS;
    payload: ITeam[];
}

export interface IGetUserTeamsFailure {
    type: typeof TeamActions.GET_USER_TEAMS_FAILURE;
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

//actions
export function getUserTeamsRequest(): IGetUserTeamsRequest {
    return {
        type: TeamActions.GET_USER_TEAMS_REQUEST,
    };
}

export function getUserTeamsSuccess(teams: ITeam[]): IGetUserTeamsSuccess {
    return {
        type: TeamActions.GET_USER_TEAMS_SUCCESS,
        payload: teams,
    };
}

export function getUserTeamsFailure(error: Error): IGetUserTeamsFailure {
    return {
        type: TeamActions.GET_USER_TEAMS_FAILURE,
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

export type TeamActionsType = IGetUserTeamsSuccess & ISetSelectedTeam & ISetSelectedTeamById & ICreateTeamSuccess;
