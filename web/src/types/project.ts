import { IEpic, IEpicSimpleModel } from './epic';
import { ISprint } from './sprint';
import { IStory, IStorySimpleModel } from './story';
import { ITeam, ITeamSimpleModel } from './team';

interface IBaseProject {
    projectId?: string;
    projectName: string;
    startDate: Date;
    endDate: Date;
}

export interface IProject extends IBaseProject {
    workSpaceId?: string;
    projectDescription: string;
    teams?: ITeam[];
    creationDate?: Date;
}

export interface IProjectSimpleModel extends IBaseProject {}

export interface IProjectPage {
    project: IProject;
    teams: ITeamSimpleModel[];
    epics: IEpic[];
}

export interface IBoardPage {
    project: IProject;
    team: ITeam;
    epics: IEpicSimpleModel[];
    sprints: ISprint[];
    stories: IStory[];
}

export interface IStatsPage {
    sprints: ISprint[];
    stories: IStorySimpleModel[];
}

export interface IFullStatsPage {
    project: IProject;
    epics: IEpicSimpleModel[];
    sprints: ISprint[];
    stories: IStorySimpleModel[];
}

export interface IDefaultPage {
    teams: ITeamSimpleModel[];
    stories: IStorySimpleModel[];
}
