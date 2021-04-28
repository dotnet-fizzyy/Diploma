import { AxiosResponse } from 'axios';
import { ProjectUrls } from '../constants/routeConstants';
import { mapToEpicSimpleModel } from '../mappers/epicMapper';
import { mapToProjectModel, mapToProjectPageModel } from '../mappers/projectMapper';
import { mapToSprintModel } from '../mappers/sprintMappers';
import { mapToStoryModel } from '../mappers/storyMappers';
import { mapToTeamModel } from '../mappers/teamMapper';
import { IBoardPage, IProject, IProjectPage } from '../types/projectTypes';
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

    private static mapToBoardPageData(data: any): IBoardPage {
        return {
            team: mapToTeamModel(data.team),
            epics: data.epics && data.epics.length ? data.epics.map(mapToEpicSimpleModel) : [],
            sprints: data.sprints && data.sprints.length ? data.sprints.map(mapToSprintModel) : [],
            stories: data.stories && data.stories.length ? data.stories.map(mapToStoryModel) : [],
        };
    }
}
