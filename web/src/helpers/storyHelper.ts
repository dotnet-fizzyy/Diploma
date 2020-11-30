import { StoryEstimation } from '../constants/storyConstants';
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
        story.priority === updatedStory.priority
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

        parts.push({
            field: def[0],
            newValue: def[1],
            previousValue: fieldFromUpdated[1],
            userId,
        } as IStoryUpdatePart);
    });

    return {
        storyId: updatedStory.storyId,
        recordVersion: updatedStory.recordVersion,
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
            key: pr[0],
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
