import { ISelectedItem, IStory, Priority, SortFields } from '../types/storyTypes';

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
