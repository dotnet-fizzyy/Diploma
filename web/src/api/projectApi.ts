import { AxiosResponse } from 'axios';
import { ProjectUrls } from '../constants/routeConstants';
import { mapToEpicSimpleModel } from '../mappers/epicMapper';
import { mapToProjectModel, mapToProjectPageModel } from '../mappers/projectMapper';
import { mapToSprintModel } from '../mappers/sprintMappers';
import { mapToStoryModel, mapToStorySimpleModel } from '../mappers/storyMappers';
import { mapToTeamModel } from '../mappers/teamMapper';
import { IBoardPage, IFullStatsPage, IProject, IProjectPage } from '../types/projectTypes';
import AxiosBaseApi from './axiosBaseApi';

export default class ProjectApi {
    public static async getProjectPage(projectId: string): Promise<IProjectPage> {
        const response: AxiosResponse<IProjectPage> = await AxiosBaseApi.axiosGet(
            `${ProjectUrls.getProjectPage}/${projectId}`
        );

        return mapToProjectPageModel(response.data);
    }

    public static async getProject(projectId: string): Promise<IProject> {
        const response: AxiosResponse<IProject> = await AxiosBaseApi.axiosGet(`${ProjectUrls.getProject}/${projectId}`);

        return mapToProjectModel(response.data);
    }

    public static async getBoardPage(projectId: string, teamId: string): Promise<any> {
        const response: AxiosResponse<IBoardPage> = await AxiosBaseApi.axiosGet(
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

        const response: AxiosResponse<IProject> = await AxiosBaseApi.axiosPost(
            ProjectUrls.createProject,
            mappedProject
        );

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

        const response: AxiosResponse<IProject> = await AxiosBaseApi.axiosPut(ProjectUrls.createProject, mappedProject);

        return mapToProjectModel(response.data);
    }

    public static async removeProject(projectId: string): Promise<void> {
        await AxiosBaseApi.axiosDelete(`${ProjectUrls.removeProject}/${projectId}`);
    }

    public static async getProjectPageStats(projectId: string): Promise<IFullStatsPage> {
        const response: AxiosResponse<IFullStatsPage> = await AxiosBaseApi.axiosGet(
            `${ProjectUrls.getStatsPage}?projectId=${projectId}`
        );

        return ProjectApi.mapToStatsPageData(response.data);
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
