import { StoryEstimation } from '../constants/storyConstants';
import { IJsonPatchBody } from '../types';
import { ISelectedItem, IStory, IStoryUpdate, IStoryUpdatePart, Priority, SortFields } from '../types/storyTypes';

export function areStoriesEqual(story: IStory, updatedStory: IStory): boolean {
    return (
        story.storyId === updatedStory.storyId &&
        story.isReady === updatedStory.isReady &&
        story.blockReason === updatedStory.blockReason &&
        story.isBlocked === updatedStory.isBlocked &&
        story.sprintId === updatedStory.sprintId &&
        story.userId === updatedStory.userId &&
        story.title === updatedStory.title &&
        story.description === updatedStory.description &&
        story.estimate === updatedStory.estimate &&
        story.isDefect === updatedStory.isDefect &&
        story.storyPriority === updatedStory.storyPriority
    );
}

export function createStoryUpdatePartsFromStory(
    defaultStory: IStory,
    updatedStory: IStory,
    userId: string
): IStoryUpdate {
    let parts = [];

    const defaultStoryArray = Object.entries(defaultStory);
    const updatedStoryArray = Object.entries(updatedStory);

    defaultStoryArray.forEach((def) => {
        const fieldFromUpdated = updatedStoryArray.find((up) => up[0] === def[0]);

        if (fieldFromUpdated[1] !== def[1]) {
            parts.push({
                field: def[0],
                newValue: fieldFromUpdated[1],
                previousValue: def[1],
                userId,
            } as IStoryUpdatePart);
        }
    });

    return {
        story: updatedStory,
        parts,
    };
}

export function createStoryEstimationDropdownItems(): ISelectedItem[] {
    return Object.values(StoryEstimation).map((pr) => {
        return {
            key: pr.toString(),
            value: pr.toString(),
        } as ISelectedItem;
    });
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
