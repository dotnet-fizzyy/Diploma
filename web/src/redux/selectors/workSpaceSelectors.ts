import { IProjectSimpleModel } from '../../types/projectTypes';
import { ITeamSimpleModel } from '../../types/teamTypes';
import { IWorkSpace } from '../../types/workSpaceTypes';
import { IState } from '../store/state';

export function getWorkSpace(state: IState): IWorkSpace {
    return state.workspace.workSpace;
}

export function getWorkSpaceId(state: IState): string {
    return state.workspace.workSpace.workSpaceId;
}

export function getWorkSpaceName(state: IState): string {
    return state.workspace.workSpace.workSpaceName;
}

export function getWorkSpaceDate(state: IState): Date {
    return state.workspace.workSpace.creationDate;
}

export function getWorkSpaceIsLoading(state: IState): boolean {
    return state.workspace.isLoading;
}

export function getSearchTitleTerm(state: IState): string {
    return state.workspace.search.searchTerm;
}

export function getSearchProjects(state: IState): IProjectSimpleModel[] {
    return state.workspace.search.projects;
}

export function getSearchTeams(state: IState): ITeamSimpleModel[] {
    return state.workspace.search.teams;
}

export function getIsSearchTermSearching(state: IState): boolean {
    return state.workspace.search.searching;
}
