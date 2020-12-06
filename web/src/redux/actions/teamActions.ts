import { ITeam } from '../../types/teamTypes';

export const TeamActions = {
    CREATE_TEAM_REQUEST: 'CREATE_TEAM_REQUEST',
    CREATE_TEAM_SUCCESS: 'CREATE_TEAM_SUCCESS',
    CREATE_TEAM_FAILURE: 'CREATE_TEAM_FAILURE',
    ADD_TEAMS: 'ADD_TEAMS',
    SET_SELECTED_TEAM: 'SET_SELECTED_TEAM',
    SET_SELECTED_TEAM_BY_ID: 'SET_SELECTED_TEAM_BY_ID',
};

//interfaces
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

export interface IAddTeams {
    type: typeof TeamActions.ADD_TEAMS;
    payload: ITeam[];
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

export function addTeams(teams: ITeam[]): IAddTeams {
    return {
        type: TeamActions.ADD_TEAMS,
        payload: teams,
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
        type: TeamActions.SET_SELECTED_TEAM,
        payload: teamId,
    };
}

export type TeamActionsType = IAddTeams & ISetSelectedTeam & ISetSelectedTeamById & ICreateTeamSuccess;
