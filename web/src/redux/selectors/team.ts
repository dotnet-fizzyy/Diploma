import { ITeam, ITeamSimpleModel } from '../../types/team';
import { IUser } from '../../types/user';
import { IState } from '../store/state';

export const getSelectedTeam = (state: IState): ITeam =>
    state.teams.teams.find((team) => team.teamId === state.teams.selectedTeamId);

export const getTeamUsers = (state: IState): IUser[] => {
    const team = getSelectedTeam(state);

    return team?.users ?? [];
};

export const getSelectedTeamId = (state: IState): string => state.teams.selectedTeamId;

export const getTeamSimpleItems = (state: IState): ITeamSimpleModel[] => state.teams.simpleItems;

export const getSelectedTeamFromSimpleItems = (state: IState): ITeamSimpleModel =>
    state.teams.simpleItems.find((team) => team.teamId === state.teams.selectedTeamId);
