import { IProjectSimpleModel } from './projectTypes';
import { ITeamSimpleModel } from './teamTypes';

export interface IWorkSpace {
    workSpaceId?: string;
    workSpaceName: string;
    workSpaceDescription: string;
    creationDate?: Date;
}

export interface IWorkSpacePageProject extends IProjectSimpleModel {
    teams: ITeamSimpleModel[];
}

export interface IWorkSpacePage {
    workSpace: IWorkSpace;
    projects: IWorkSpacePageProject[];
}
