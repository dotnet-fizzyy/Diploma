import { Priority, StoryHistoryAction } from '../constants/storyConstants';
import { UserPosition } from '../constants/userConstants';

export interface IStory {
    storyId?: string;
    title: string;
    description: string;
    notes: string;
    recordVersion?: number;
    columnType: string;
    estimate: number;
    isReady: boolean;
    isBlocked: boolean;
    blockReason: string;
    creationDate?: Date;
    teamId?: string;
    userId?: string;
    sprintId: string;
    storyPriority: Priority;
    requiredPosition: UserPosition;
}

export interface IFullStory extends IStory {
    storyHistory: IStoryHistory[];
}

export interface ISelectedItem {
    key: string;
    value: string;
}

export interface IStoryDragAndDrop {
    columnTypeOrigin: string;
    columnTypeDestination: string;
    storyId: string;
}

export interface IStoryColumns {
    key: string;
    value: IStory[];
}

export interface IStoryHistory {
    storyHistoryId: string;
    storyHistoryAction: StoryHistoryAction;
    fieldName: string;
    previousValue: string;
    currentValue: string;
    userName: string;
    creationDate: Date;
}

export interface IStorySimpleModel {
    storyId: string;
    title: string;
    columnType: string;
    storyPriority: string;
    isReady: boolean;
    isBlocked: boolean;
    estimate: number;
    sprintId: string;
    recordVersion: number;
}
