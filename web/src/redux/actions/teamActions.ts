import { ITeam } from '../../types/teamTypes';

export const TeamActions = {
    ADD_TEAMS: 'ADD_TEAMS',
    SET_SELECTED_TEAM: 'SET_SELECTED_TEAM',
};

//interfaces
export interface IAddTeams {
    type: typeof TeamActions.ADD_TEAMS;
    payload: ITeam[];
}

export interface ISetSelectedTeam {
    type: typeof TeamActions.SET_SELECTED_TEAM;
    payload: string;
}

//actions
export function addTeams(teams: ITeam[]): IAddTeams {
    return {
        type: TeamActions.ADD_TEAMS,
        payload: teams,
    };
}

export function setSelectedTeam(teamId: string): ISetSelectedTeam {
    return {
        type: TeamActions.SET_SELECTED_TEAM,
        payload: teamId,
    };
}

export type TeamActionsType = IAddTeams & ISetSelectedTeam;
