import { initialStory, Priority, SortFields, StoryEstimation, StoryHistoryAction } from '../constants/story';
import { IJsonPatchBody } from '../types';
import { IStoryFormTypes } from '../types/forms';
import { ISprint } from '../types/sprint';
import { ISelectedItem, IStory } from '../types/story';

export const areStoriesEqual = (story: IStory, updatedStory: IStory): boolean =>
    story.storyId === updatedStory.storyId &&
    story.blockReason === updatedStory.blockReason &&
    story.sprintId === updatedStory.sprintId &&
    story.userId === updatedStory.userId &&
    story.title === updatedStory.title &&
    story.description === updatedStory.description &&
    story.estimate === updatedStory.estimate &&
    story.storyPriority === updatedStory.storyPriority &&
    story.notes === updatedStory.notes;

export const createStoryEstimationDropdownItems = (): ISelectedItem[] =>
    Object.values(StoryEstimation).map((pr) => ({
        key: pr.toString(),
        value: pr.toString(),
    }));

export const createStoryPriorityDropdownItems = (): ISelectedItem[] =>
    Object.entries(Priority).map(
        (pr) =>
            ({
                key: pr[1],
                value: pr[1],
            } as ISelectedItem)
    );

export const createSortFields = (): ISelectedItem[] =>
    Object.entries(SortFields).map(
        (pr) =>
            ({
                key: pr[0],
                value: pr[1],
            } as ISelectedItem)
    );

export const createRequestBodyForColumnMovement = (story: IStory): IJsonPatchBody[] => [
    {
        op: 'add',
        path: '/storyId',
        value: story.storyId,
    },
    {
        op: 'add',
        path: '/columnType',
        value: story.columnType,
    },
    {
        op: 'add',
        path: '/recordVersion',
        value: story.recordVersion.toString(),
    },
];

export const createRequestBodyForRemoveStory = (storyId: string, recordVersion: number): IJsonPatchBody[] => [
    {
        op: 'add',
        path: '/storyId',
        value: storyId,
    },
    {
        op: 'add',
        path: '/isDeleted',
        value: 'true',
    },
    {
        op: 'add',
        path: '/recordVersion',
        value: recordVersion.toString(),
    },
];

export const createRequestBodyForReadyStory = (
    storyId: string,
    isReady: boolean,
    recordVersion: number
): IJsonPatchBody[] => [
    {
        op: 'add',
        path: '/storyId',
        value: storyId,
    },
    {
        op: 'add',
        path: '/isReady',
        value: `${!isReady}`,
    },
    {
        op: 'add',
        path: '/recordVersion',
        value: recordVersion.toString(),
    },
];

export const getSprintNames = (sprints: ISprint[]): ISelectedItem[] =>
    sprints?.map(
        (sprint) =>
            ({
                key: sprint.sprintId,
                value: sprint.sprintName,
            } as ISelectedItem)
    ) ?? [];

export const getInitialValuesWithLatestSprintIdForStory = (sprints: ISprint[]): IStoryFormTypes => {
    const lastSprintId: string = sprints?.length
        ? sprints.sort((a: any, b: any) => a.startDate - b.endDate).reverse()[0].sprintId
        : '';

    return {
        ...initialStory,
        sprintId: lastSprintId,
    };
};

export const getStoryHistoryActionText = (action: StoryHistoryAction): string => {
    switch (action) {
        case StoryHistoryAction.Add:
            return 'created';
        case StoryHistoryAction.Update:
            return 'changed';
        case StoryHistoryAction.Remove:
            return 'removed';
        default:
            return '';
    }
};
