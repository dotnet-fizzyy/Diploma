import { IProjectSimpleModel } from './projectTypes';
import { ITeamSimpleModel } from './teamTypes';
import { IUserListItem } from './userTypes';

export interface IWorkSpace {
    workSpaceId?: string;
    workSpaceName: string;
    workSpaceDescription: string;
    creationDate?: Date;
}

export interface IWorkSpaceTableItem {
    project: IProjectSimpleModel;
    teams: ITeamSimpleModel[];
    customer: IUserListItem;
}

export interface IWorkSpaceTable {
    items: IWorkSpaceTableItem[];
}

export interface IWorkSpacePageProject extends IProjectSimpleModel {
    teams: ITeamSimpleModel[];
}

export interface IWorkSpacePage {
    workSpace: IWorkSpace;
    projects: IWorkSpacePageProject[];
}
