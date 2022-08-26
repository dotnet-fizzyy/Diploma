import { SortDirection } from '../../constants/storyConstants';
import { IStory, IStoryColumns, IStoryHistory, IStorySimpleModel } from '../../types/storyTypes';
import { IState } from '../store/state';

export const getColumns = (state: IState): IStoryColumns[] => state.stories.columns;

export const getStoriesForColumn = (columnId: string) => (state: IState): IStory[] => {
    return state.stories.columns.find((column) => column.key === columnId).value;
};

export const getSelectedStory = (state: IState): IStory =>
    state.stories.columns
        .map((storyColumn) => storyColumn.value)
        .reduce((acc, story) => acc.concat(story), [])
        .find((story) => story.storyId === state.stories.selectedStoryId);

export const getWasStoryBlocked = (state: IState): boolean => state.stories.wasStoryBlocked;

export const getStoryHistory = (state: IState): IStoryHistory[] => state.stories.storyHistory.items;

export const getStoryFromHistory = (state: IState): IStory => state.stories.storyHistory.story;

export const getIsDragging = (state: IState): boolean => state.stories.isDragging;

export const getSortType = (state: IState): string => state.stories.sortType;

export const getSortDirection = (state: IState): SortDirection => state.stories.sortDirection;

export const getStorySimpleModels = (state: IState): IStorySimpleModel[] => state.stories.simpleItems;
