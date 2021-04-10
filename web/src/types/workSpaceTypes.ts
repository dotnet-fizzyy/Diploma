import { IProjectListItem } from './projectTypes';
import { ITeamListItem } from './teamTypes';
import { IUserListItem } from './userTypes';

export interface IWorkSpace {
    workSpaceId?: string;
    workSpaceName: string;
    workSpaceDescription: string;
    creationDate?: Date;
}

export interface IWorkSpaceTableItem {
    project: IProjectListItem;
    teams: ITeamListItem[];
    customer: IUserListItem;
}

export interface IWorkSpaceTable {
    items: IWorkSpaceTableItem[];
}

export interface IWorkSpacePageProject extends IProjectListItem {
    teams: ITeamListItem[];
}

export interface IWorkSpacePage {
    workSpace: IWorkSpace;
    projects: IWorkSpacePageProject[];
}
