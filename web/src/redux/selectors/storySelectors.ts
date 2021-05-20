import { SortDirection } from '../../constants/storyConstants';
import { IStory, IStoryColumns, IStoryHistory, IStorySimpleModel } from '../../types/storyTypes';
import { IState } from '../store/state';

export function getColumns(state: IState): IStoryColumns[] {
    return state.stories.columns;
}

export const getStoriesForColumn = (columnId: string) => (state: IState): IStory[] => {
    return state.stories.columns.find((column) => column.key === columnId).value;
};

export const getAllStories = (state: IState): IStory[] => {
    return state.stories.columns.map((x) => x.value).reduce((acc, x) => acc.concat(x), []);
};

export function getSelectedStory(state: IState): IStory {
    return state.stories.columns
        .map((x) => x.value)
        .reduce((acc, x) => acc.concat(x), [])
        .find((x) => x.storyId === state.stories.selectedStoryId);
}

export function getWasStoryBlocked(state: IState): boolean {
    return state.stories.wasStoryBlocked;
}

export function getStoryHistory(state: IState): IStoryHistory[] {
    return state.stories.storyHistory.items;
}

export function getStoryFromHistory(state: IState): IStory {
    return state.stories.storyHistory.story;
}

export function getIsDragging(state: IState): boolean {
    return state.stories.isDragging;
}

export function getSortType(state: IState): string {
    return state.stories.sortType;
}

export function getSortDirection(state: IState): SortDirection {
    return state.stories.sortDirection;
}

export function getStorySimpleModels(state: IState): IStorySimpleModel[] {
    return state.stories.simpleItems;
}
