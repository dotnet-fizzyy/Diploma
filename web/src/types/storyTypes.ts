export interface IStory {
    storyId: string;
    title: string;
    description: string;
    notes: string;
    columnType: string;
    estimate: number;
    isDefect: boolean;
    isReady: boolean;
    isBlocked: boolean;
    blockReason: string;
    creationDate: string;
    userId: string;
    sprintId: string;
    storyPriority: Priority;
    recordVersion: number;
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
    storyHistoryAction: string;
    fieldName: string;
    previousValue: string;
    currentValue: string;
    recordVersion: number;
    userId: string;
}

export enum Priority {
    LOW = 'Low',
    MEDIUM = 'Medium',
    HIGH = 'High',
}

export const SortFields = {
    PRIORITY: 'Priority',
    NAME: 'Name',
    ESTIMATE: 'Estimate',
    CREATION_DATE: 'Creation Date',
};

export interface IStoryUpdate {
    story: IStory;
    parts: IStoryUpdatePart[];
}

export interface IStoryUpdatePart {
    field: string;
    newValue: string;
    previousValue: string;
    userId: string;
}
