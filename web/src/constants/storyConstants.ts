import { IStoryFormTypes } from '../types/formTypes';
import { ColumnIds } from './boardConstants';
import { UserPosition } from './userConstants';

export const debouncePeriod: number = 1000;

export enum StoryActions {
    CREATE = 'Create',
    UPDATE = 'Update',
    REMOVE = 'Remove',
}

export const StoryEstimation = {
    ONE_POINT: 1,
    TWO_POINTS: 2,
    THREE_POINTS: 3,
    FIVE_POINTS: 5,
    EIGHT_POINTS: 8,
    SIXTEEN_POINTS: 16,
};

export enum storyFields {
    blockReason = 'blockReason',
    columnType = 'columnType',
    creationDate = 'creationDate',
    description = 'description',
    estimate = 'estimate',
    isBlocked = 'isBlocked',
    isReady = 'isReady',
    notes = 'notes',
    storyPriority = 'storyPriority',
    sprintId = 'sprintId',
    storyId = 'storyId',
    title = 'title',
    userId = 'userId',
    recordVersion = 'recordVersion',
    requiredPosition = 'requiredPosition',
}

export enum Priority {
    LOW = 'Low',
    MEDIUM = 'Medium',
    HIGH = 'High',
}

export const initialStory: IStoryFormTypes = {
    [storyFields.blockReason]: '',
    [storyFields.columnType]: ColumnIds.ToDo,
    [storyFields.creationDate]: new Date(),
    [storyFields.description]: '',
    [storyFields.estimate]: StoryEstimation.ONE_POINT,
    [storyFields.isBlocked]: false,
    [storyFields.isReady]: false,
    [storyFields.notes]: '',
    [storyFields.storyPriority]: Priority.LOW,
    [storyFields.sprintId]: '',
    [storyFields.storyId]: '',
    [storyFields.title]: '',
    [storyFields.userId]: '',
    [storyFields.recordVersion]: 0,
    [storyFields.requiredPosition]: UserPosition.Developer,
};

export const SortFieldsNames = {
    PRIORITY: 'PRIORITY',
    NAME: 'NAME',
    ESTIMATE: 'ESTIMATE',
    CREATION_DATE: 'CREATION_DATE',
};

export const SortFields = {
    [SortFieldsNames.PRIORITY]: 'Priority',
    [SortFieldsNames.NAME]: 'Name',
    [SortFieldsNames.ESTIMATE]: 'Estimate',
    [SortFieldsNames.CREATION_DATE]: 'Creation Date',
};

export enum SortDirection {
    ASC = 'ASC',
    DESC = 'DESC',
}
