import { Priority } from './storyTypes';

export interface ILoginForm {
    name: string;
    password: string;
}

export interface IRegistrationForm {
    name: string;
    password: string;
    email: string;
    repeatedPassword: string;
}

export interface IProjectForm {
    projectId?: string;
    projectName: string;
    projectDescription: string;
    startDate: Date;
    endDate: Date;
}

export interface IWorkSpaceForm {
    workSpaceId?: string;
    workSpaceName: string;
    workSpaceDescription: string;
    creationDate?: Date;
}

export interface IProfileSettingsForm {
    userName: string;
    email: string;
}

export interface IProfilePasswordUpdateForm {
    password: string;
    newPassword: string;
    repeatedPassword: string;
}

export interface IEpicFormTypes {
    epicId?: string;
    projectId: string;
    epicName: string;
    startDate: Date;
    endDate: Date;
    epicDescription: string;
}

export interface IStoryFormTypes {
    storyId?: string;
    title: string;
    description: string;
    notes: string;
    recordVersion?: number;
    columnType: string;
    estimate: number;
    isDefect: boolean;
    isReady: boolean;
    isBlocked: boolean;
    blockReason: string;
    creationDate?: Date;
    userId?: string;
    sprintId: string;
    storyPriority: Priority;
}
