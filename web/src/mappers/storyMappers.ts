import { IStory, IStoryHistory } from '../types/storyTypes';

export function mapToStoryModel(data): IStory {
    return {
        storyId: data.storyId,
        columnType: data.columnType,
        description: data.description,
        estimate: data.estimate,
        isBlocked: data.isBlocked,
        blockReason: data.blockReason,
        isReady: data.isReady,
        notes: data.notes,
        storyPriority: data.storyPriority,
        recordVersion: data.recordVersion,
        sprintId: data.sprintId,
        title: data.title,
        userId: data.userId,
        creationDate: new Date(data.creationDate),
        requiredPosition: data.requiredPosition,
    };
}

export function mapToStoryHistoryModel(data): IStoryHistory {
    return {
        storyHistoryId: data.storyHistoryId,
        userId: data.userId,
        storyHistoryAction: data.storyHistoryAction,
        creationDate: new Date(data.creationDate),
        currentValue: data.currentValue,
        previousValue: data.previousValue,
        fieldName: data.fieldName,
    };
}
