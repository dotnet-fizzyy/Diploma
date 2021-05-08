import { IFullStory, IStory, IStoryHistory } from '../types/storyTypes';

export const mapToStoryModel = (data): IStory => ({
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
});

export const mapToStoryHistoryModel = (data): IStoryHistory => ({
    storyHistoryId: data.storyHistoryId,
    userName: data.userName,
    storyHistoryAction: data.storyHistoryAction,
    creationDate: new Date(data.creationDate),
    currentValue: data.currentValue,
    previousValue: data.previousValue,
    fieldName: data.fieldName,
});

export const mapToFullStory = (data): IFullStory => ({
    ...mapToStoryModel(data),
    storyHistory:
        data.storyHistories && data.storyHistories.length ? data.storyHistories.map(mapToStoryHistoryModel) : [],
});

export const mapFullStoryToStory = (fullStory: IStory): IStory => mapToStoryModel(fullStory);
