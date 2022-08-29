import { StoryHistoryAction } from '../constants/story';

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
