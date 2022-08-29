import { IProjectSimpleModel } from '../../types/project';
import { ITeamSimpleModel } from '../../types/team';
import { IWorkSpace } from '../../types/workspace';
import { IState } from '../store/state';

export const getWorkSpace = (state: IState): IWorkSpace => state.workspace.workSpace;

export const getWorkSpaceId = (state: IState): string => state.workspace.workSpace.workSpaceId;

export const getWorkSpaceIsLoading = (state: IState): boolean => state.workspace.isLoading;

export const getSearchTitleTerm = (state: IState): string => state.workspace.search.searchTerm;

export const getSearchProjects = (state: IState): IProjectSimpleModel[] => state.workspace.search.projects;

export const getSearchTeams = (state: IState): ITeamSimpleModel[] => state.workspace.search.teams;

export const getIsSearchTermSearching = (state: IState): boolean => state.workspace.search.searching;
