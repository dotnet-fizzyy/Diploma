import { ISelectedItem } from '../../types/storyTypes';
import { ITeam } from '../../types/teamTypes';
import { IState } from '../store/state';

export function getTeams(state: IState): ITeam[] {
    return state.teams.teams;
}

export function getUserNames(state: IState): ISelectedItem[] {
    return state.teams.selectedTeam
        ? state.teams.selectedTeam.users.map((user) => {
              return {
                  key: user.userId,
                  value: user.userName,
              } as ISelectedItem;
          })
        : [];
}

export function getSelectedTeam(state: IState): ITeam {
    return state.teams.selectedTeam;
}

export function getSelectedTeamId(state: IState): string {
    return state.teams.selectedTeam ? state.teams.selectedTeam.teamId : '';
}
