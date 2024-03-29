import { Priority } from '../constants/storyConstants';
import { UserPosition } from '../constants/userConstants';

export interface ILoginForm {
    email: string;
    password: string;
}

export interface IRegistrationForm {
    email: string;
    password: string;
    name: string;
    repeatedPassword: string;
}

export interface IProjectForm {
    projectId?: string;
    projectName: string;
    projectDescription: string;
    startDate: Date;
    endDate: Date;
    workSpaceId?: string;
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
    isReady: boolean;
    isBlocked: boolean;
    blockReason: string;
    creationDate?: Date;
    userId?: string;
    sprintId: string;
    storyPriority: Priority;
    requiredPosition: UserPosition;
    teamId?: string;
}
