import { ITeam } from './teamTypes';

interface IBaseProject {
    projectId?: string;
    projectName: string;
}

export interface IProject extends IBaseProject {
    workSpaceId?: string;
    projectDescription: string;
    startDate: Date;
    endDate: Date;
    customer?: string;
    teams?: ITeam[];
}

export interface IProjectListItem extends IBaseProject {}
