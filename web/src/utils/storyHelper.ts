import { initialStory, Priority, SortFields, StoryEstimation } from '../constants/storyConstants';
import { IJsonPatchBody } from '../types';
import { IStoryFormTypes } from '../types/formTypes';
import { ISprint } from '../types/sprintTypes';
import { ISelectedItem, IStory } from '../types/storyTypes';

export function areStoriesEqual(story: IStory, updatedStory: IStory): boolean {
    return (
        story.storyId === updatedStory.storyId &&
        story.blockReason === updatedStory.blockReason &&
        story.sprintId === updatedStory.sprintId &&
        story.userId === updatedStory.userId &&
        story.title === updatedStory.title &&
        story.description === updatedStory.description &&
        story.estimate === updatedStory.estimate &&
        story.storyPriority === updatedStory.storyPriority &&
        story.notes === updatedStory.notes
    );
}

export function createStoryEstimationDropdownItems(): ISelectedItem[] {
    return Object.values(StoryEstimation).map((pr) => ({
        key: pr.toString(),
        value: pr.toString(),
    }));
}

export function createStoryPriorityDropdownItems(): ISelectedItem[] {
    return Object.entries(Priority).map((pr) => {
        return {
            key: pr[1],
            value: pr[1],
        } as ISelectedItem;
    });
}

export function createSortFields(): ISelectedItem[] {
    return Object.entries(SortFields).map((pr) => {
        return {
            key: pr[0],
            value: pr[1],
        } as ISelectedItem;
    });
}

export function getShortIdNameForStory(storyId: string): string {
    return 'US' + storyId.split('-')[0].toUpperCase();
}

export function createRequestBodyForColumnMovement(story: IStory): IJsonPatchBody[] {
    return [
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
}

export function createRequestBodyForReadyState(story: IStory): IJsonPatchBody[] {
    return [
        {
            op: 'add',
            path: '/storyId',
            value: story.storyId,
        },
        {
            op: 'add',
            path: '/isReady',
            value: story.isReady.toString(),
        },
        {
            op: 'add',
            path: '/recordVersion',
            value: story.recordVersion.toString(),
        },
    ];
}

export function createRequestBodyForBlockedState(story: IStory): IJsonPatchBody[] {
    return [
        {
            op: 'add',
            path: '/storyId',
            value: story.storyId,
        },
        {
            op: 'add',
            path: '/isBlocked',
            value: story.isBlocked.toString(),
        },
        {
            op: 'add',
            path: '/blockReason',
            value: story.blockReason,
        },
        {
            op: 'add',
            path: '/recordVersion',
            value: story.recordVersion.toString(),
        },
    ];
}

export function createRequestBodyForReadyStory(
    storyId: string,
    isReady: boolean,
    recordVersion: number
): IJsonPatchBody[] {
    return [
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
}

export function getSprintNames(sprints: ISprint[]): ISelectedItem[] {
    return sprints && sprints.length
        ? sprints.map((sprint) => {
              return {
                  key: sprint.sprintId,
                  value: sprint.sprintName,
              } as ISelectedItem;
          })
        : [];
}

export function getInitialValuesWithLatestSprintIdForStory(sprints: ISprint[]): IStoryFormTypes {
    const lastSprintId: string =
        sprints && sprints.length
            ? sprints.sort((a: any, b: any) => a.startDate - b.endDate).reverse()[0].sprintId
            : '';

    return {
        ...initialStory,
        sprintId: lastSprintId,
    };
}
