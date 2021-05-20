import { IFullUser } from '../../types/userTypes';
import { IState } from '../store/state';

export function getUser(state: IState): IFullUser {
    return state.currentUser.user;
}

export function getIsAuthenticationSuccessful(state: IState): boolean {
    return state.currentUser.isAuthenticationSuccessful;
}

export function getWasCustomerCreated(state: IState): boolean {
    return state.currentUser.wasCustomerCreated;
}

export function getIsUserLoading(state: IState): boolean {
    return state.currentUser.isLoading;
}

export function getUserSelectedProjectId(state: IState): string {
    return state.currentUser.selectedProject;
}

export function getUserSelectedTeamId(state: IState): string {
    return state.currentUser.selectedTeam;
}

export function getUserTeamIds(state: IState): string[] {
    return state.currentUser.user.teams.map((x) => x.teamId);
}
