import { ITeam } from './teamTypes';

export interface IProject {
    projectId?: string;
    workSpaceId?: string;
    projectName: string;
    projectDescription: string;
    startDate: Date;
    endDate: Date;
    customer?: string;
    teams?: ITeam[];
}
