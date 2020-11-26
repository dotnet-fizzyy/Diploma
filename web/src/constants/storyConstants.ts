import { IStory } from '../types/storyTypes';

export const debouncePeriod: number = 1000;

export enum StoryActions {
    CREATE = 'Create',
    UPDATE = 'Update',
    REMOVE = 'REMOVE',
}

export const initialStory: IStory = {
    blockReason: '',
    columnType: '',
    creationDate: '',
    description: '',
    estimate: 0,
    isBlocked: false,
    isDefect: false,
    isReady: false,
    notes: '',
    priority: undefined,
    sprintId: '',
    storyId: '',
    title: '',
    userId: '',
};
