import { IProjectSimpleModel } from './projectTypes';
import { IStorySimpleModel } from './storyTypes';
import { ITeamSimpleModel } from './teamTypes';
import { IUserSimpleModel } from './userTypes';

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
    users: IUserSimpleModel[];
    stories: IStorySimpleModel[];
}
