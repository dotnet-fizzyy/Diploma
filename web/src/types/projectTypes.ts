import { IEpic } from './epicTypes';
import { ITeam, ITeamListItem } from './teamTypes';

interface IBaseProject {
    projectId?: string;
    projectName: string;
}

export interface IProject extends IBaseProject {
    workSpaceId?: string;
    projectDescription: string;
    startDate: Date;
    endDate: Date;
    teams?: ITeam[];
}

export interface IProjectListItem extends IBaseProject {}

export interface IProjectPage {
    project: IProject;
    teams: ITeamListItem[];
    epics: IEpic[];
}
