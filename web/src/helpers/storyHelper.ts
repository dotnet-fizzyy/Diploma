import { ISelectedItem, IStory, Priority } from '../types/storyTypes';

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
    return Object.keys(Priority).map((pr) => {
        return {
            key: pr,
            value: pr.toLowerCase(),
        } as ISelectedItem;
    });
}
