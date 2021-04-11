import { IProject, IProjectListItem, IProjectPage } from '../types/projectTypes';
import { mapToEpicModel } from './epicMapper';
import { mapToSimpleTeamModel } from './teamMapper';

export function mapToProjectModel(data: any): IProject {
    return {
        projectId: data.projectId,
        projectName: data.projectName,
        projectDescription: data.projectDescription,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        workSpaceId: data.workSpaceId,
        creationDate: data.creationDate,
    };
}

export function mapToSimpleProjectModel(data: any): IProjectListItem {
    return {
        projectId: data.projectId,
        projectName: data.projectName,
    };
}

export function mapToProjectPageModel(data: any): IProjectPage {
    return {
        project: mapToProjectModel(data.project),
        epics: data.epics && data.epics.length ? data.epics.map(mapToEpicModel) : [],
        teams: data.teams && data.teams.length ? data.teams.map(mapToSimpleTeamModel) : [],
    };
}
