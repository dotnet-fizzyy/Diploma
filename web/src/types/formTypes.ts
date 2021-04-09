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
