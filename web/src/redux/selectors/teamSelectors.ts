import { ISelectedItem } from '../../types/storyTypes';
import { ITeam, ITeamSimpleModel } from '../../types/teamTypes';
import { IUser } from '../../types/userTypes';
import { IState } from '../store/state';

export function getTeams(state: IState): ITeam[] {
    return state.teams.teams;
}

export function getUserNames(state: IState): ISelectedItem[] {
    const team = getSelectedTeam(state);

    return team
        ? team.users.map((user) => {
              return {
                  key: user.userId,
                  value: user.userName,
              } as ISelectedItem;
          })
        : [];
}

export function getUserNamesForBoard(state: IState): ISelectedItem[] {
    const users: ISelectedItem[] = getUserNames(state);
    users.unshift({ key: '', value: 'No owner' } as ISelectedItem);

    return users;
}

export function getTeamUsers(state: IState): IUser[] {
    const team = getSelectedTeam(state);

    return team ? team.users : [];
}

export function getSelectedTeam(state: IState): ITeam {
    return state.teams.teams.find((x) => x.teamId === state.teams.selectedTeamId);
}

export function getSelectedTeamId(state: IState): string {
    return state.teams.selectedTeamId;
}

export function getTeamSimpleItems(state: IState): ITeamSimpleModel[] {
    return state.teams.simpleItems;
}

export function getSelectedTeamFromSimpleItems(state: IState): ITeamSimpleModel {
    return state.teams.simpleItems.find((x) => x.teamId === state.teams.selectedTeamId);
}
