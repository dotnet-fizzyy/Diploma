import { IProject, IProjectPage, IProjectSimpleModel } from '../types/project';
import { mapToEpicModel } from './epic';
import { mapToSimpleTeamModel } from './team';

export const mapToProjectModel = (data): IProject => ({
    projectId: data.projectId,
    projectName: data.projectName,
    projectDescription: data.projectDescription,
    startDate: new Date(data.startDate),
    endDate: new Date(data.endDate),
    workSpaceId: data.workSpaceId,
    creationDate: data.creationDate,
});

export const mapToProjectSimpleModel = (data): IProjectSimpleModel => ({
    projectId: data.projectId,
    projectName: data.projectName,
    startDate: new Date(data.startDate),
    endDate: new Date(data.endDate),
});

export const mapToProjectPageModel = (data): IProjectPage => ({
    project: mapToProjectModel(data.project),
    epics: data.epics?.length ? data.epics.map(mapToEpicModel) : [],
    teams: data.teams?.length ? data.teams.map(mapToSimpleTeamModel) : [],
});
