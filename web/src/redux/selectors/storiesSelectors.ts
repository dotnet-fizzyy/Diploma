import { IStory, IStoryColumns } from '../../types/storyTypes';
import { IState } from '../store/state';

export function getColumns(state: IState): IStoryColumns[] {
    return state.stories.columns;
}

export const getStoriesForColumn = (columnId: string) => (state: IState): IStory[] => {
    const stories = state.stories.columns.find((column) => column.key === columnId);

    if (stories) {
        return stories.value;
    }

    return [];
};

export function getSelectedStory(state: IState): IStory {
    return state.stories.selectedStory;
}
