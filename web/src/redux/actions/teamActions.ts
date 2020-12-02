import { ITeam } from '../../types/teamTypes';

export const TeamActions = {
    ADD_TEAMS: 'ADD_TEAMS',
    SET_SELECTED_TEAM: 'SET_SELECTED_TEAM',
    SET_SELECTED_TEAM_BY_ID: 'SET_SELECTED_TEAM_BY_ID',
};

//interfaces
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

export type TeamActionsType = IAddTeams & ISetSelectedTeam & ISetSelectedTeamById;
