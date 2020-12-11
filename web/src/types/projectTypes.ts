import { ITeam } from './teamTypes';

export interface IProject {
    projectId?: string;
    projectName: string;
    projectDescription: string;
    startDate: Date;
    endDate: Date;
    customer?: string;
    teams?: ITeam[];
}

export enum LaunchModalType {
    Team,
    Project,
}
