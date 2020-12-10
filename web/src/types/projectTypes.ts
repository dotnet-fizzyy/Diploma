export interface IProject {
    projectId?: string;
    projectName: string;
    projectDescription: string;
    startDate: Date;
    endDate: Date;
    customer?: string;
}

export enum LaunchModalType {
    Team,
    Project,
}
