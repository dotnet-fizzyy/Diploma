import { IStorySimpleModel } from '../../types/storyTypes';
import { IUserSimpleModel } from '../../types/userTypes';
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

export function getSearchUsers(state: IState): IUserSimpleModel[] {
    return state.workspace.search.users;
}

export function getSearchStories(state: IState): IStorySimpleModel[] {
    return state.workspace.search.stories;
}

export function getIsSearchTermSearching(state: IState): boolean {
    return state.workspace.search.searching;
}
