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
    userId?: string;
    sprintId: string;
    storyPriority: Priority;
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
    userId: string;
    creationDate: Date;
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
