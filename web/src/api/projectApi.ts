import { AxiosResponse } from 'axios';
import { ProjectUrls } from '../constants/routeConstants';
import { mapToEpicSimpleModel } from '../mappers/epicMapper';
import { mapToProjectModel, mapToProjectPageModel } from '../mappers/projectMapper';
import { mapToSprintModel } from '../mappers/sprintMappers';
import { mapToStoryModel, mapToStorySimpleModel } from '../mappers/storyMappers';
import { mapToSimpleTeamModel, mapToTeamModel } from '../mappers/teamMapper';
import { IBoardPage, IDefaultPage, IFullStatsPage, IProject, IProjectPage } from '../types/projectTypes';
import { createProjectRemoveRequestBody } from '../utils';
import AxiosBaseApi from './axiosBaseApi';

export default class ProjectApi {
    public static async getProjectPage(projectId: string): Promise<IProjectPage> {
        const response: AxiosResponse<IProjectPage> = await AxiosBaseApi.get(
            `${ProjectUrls.getProjectPage}/${projectId}`
        );

        return mapToProjectPageModel(response.data);
    }

    public static async getDefaultPage(): Promise<IDefaultPage> {
        const response: AxiosResponse<IDefaultPage> = await AxiosBaseApi.get(ProjectUrls.getDefaultPage);

        return ProjectApi.mapToDefaultPage(response.data);
    }

    public static async getProject(projectId: string): Promise<IProject> {
        const response: AxiosResponse<IProject> = await AxiosBaseApi.get(`${ProjectUrls.getProject}/${projectId}`);

        return mapToProjectModel(response.data);
    }

    public static async getBoardPage(projectId: string, teamId: string): Promise<any> {
        const response: AxiosResponse<IBoardPage> = await AxiosBaseApi.get(
            `${ProjectUrls.getBoardPage}?projectId=${projectId}&teamId=${teamId}`
        );

        return ProjectApi.mapToBoardPageData(response.data);
    }

    public static async createProject(project: IProject): Promise<IProject> {
        const mappedProject = {
            projectName: project.projectName,
            projectDescription: project.projectDescription,
            startDate: new Date(project.startDate),
            endDate: new Date(project.endDate),
            workSpaceId: project.workSpaceId,
        };

        const response: AxiosResponse<IProject> = await AxiosBaseApi.post(ProjectUrls.createProject, mappedProject);

        return mapToProjectModel(response.data);
    }

    public static async updateProject(project: IProject): Promise<IProject> {
        const mappedProject = {
            projectId: project.projectId,
            projectName: project.projectName,
            projectDescription: project.projectDescription,
            startDate: new Date(project.startDate),
            endDate: new Date(project.endDate),
            workSpaceId: project.workSpaceId,
            creationDate: new Date(project.creationDate),
        };

        const response: AxiosResponse<IProject> = await AxiosBaseApi.put(ProjectUrls.createProject, mappedProject);

        return mapToProjectModel(response.data);
    }

    public static async removeProject(projectId: string): Promise<void> {
        await AxiosBaseApi.patch(ProjectUrls.removeProject, createProjectRemoveRequestBody(projectId));
    }

    public static async getProjectPageStats(projectId: string): Promise<IFullStatsPage> {
        const response: AxiosResponse<IFullStatsPage> = await AxiosBaseApi.get(
            `${ProjectUrls.getStatsPage}?projectId=${projectId}`
        );

        return ProjectApi.mapToStatsPageData(response.data);
    }

    private static mapToDefaultPage(data): IDefaultPage {
        return {
            stories: data.stories && data.stories.length ? data.stories.map(mapToStorySimpleModel) : [],
            teams: data.teams && data.teams.length ? data.teams.map(mapToSimpleTeamModel) : [],
        };
    }

    private static mapToBoardPageData(data: any): IBoardPage {
        return {
            project: mapToProjectModel(data.project),
            team: mapToTeamModel(data.team),
            epics: data.epics && data.epics.length ? data.epics.map(mapToEpicSimpleModel) : [],
            sprints: data.sprints && data.sprints.length ? data.sprints.map(mapToSprintModel) : [],
            stories: data.stories && data.stories.length ? data.stories.map(mapToStoryModel) : [],
        };
    }

    private static mapToStatsPageData(data: any): IFullStatsPage {
        return {
            project: mapToProjectModel(data.project),
            epics: data.epics && data.epics.length ? data.epics.map(mapToEpicSimpleModel) : [],
            sprints: data.sprints && data.sprints.length ? data.sprints.map(mapToSprintModel) : [],
            stories: data.stories && data.stories.length ? data.stories.map(mapToStorySimpleModel) : [],
        };
    }
}
