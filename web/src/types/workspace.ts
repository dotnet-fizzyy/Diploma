import { IProjectSimpleModel } from './project';
import { ITeamSimpleModel } from './team';

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

export interface ISearchResults {
    projects: IProjectSimpleModel[];
    teams: ITeamSimpleModel[];
}
