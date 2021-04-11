import { AxiosResponse } from 'axios';
import { ProjectUrls } from '../constants/routeConstants';
import { mapToProjectModel, mapToProjectPageModel } from '../mappers/projectMapper';
import { IProject, IProjectPage } from '../types/projectTypes';
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
}
