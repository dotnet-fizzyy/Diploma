import { IFullUser } from '../../types/userTypes';
import { IState } from '../store/state';

export const getUser = (state: IState): IFullUser => state.currentUser.user;

export const getIsAuthenticationSuccessful = (state: IState): boolean => state.currentUser.isAuthenticationSuccessful;

export const getWasCustomerCreated = (state: IState): boolean => state.currentUser.wasCustomerCreated;

export const getIsUserLoading = (state: IState): boolean => state.currentUser.isLoading;

export const getUserSelectedProjectId = (state: IState): string => state.currentUser.selectedProject;

export const getUserSelectedTeamId = (state: IState): string => state.currentUser.selectedTeam;

export const getUserTeamIds = (state: IState): string[] =>
    state.currentUser.user.teams.map((userTeam) => userTeam.teamId);

export const getEmailExistence = (state: IState): boolean => state.currentUser.emailExists;

export const getWorkSpaceId = (state: IState): string => state.currentUser.user.workSpaceId;
