import { AxiosResponse } from 'axios';
import { CustomerUrls, ProjectUrls } from '../constants/routeConstants';
import { ICollectionResponse } from '../types';
import { IProject } from '../types/projectTypes';
import AxiosBaseApi from './axiosBaseApi';

export default class ProjectApi {
    public static async getCustomerProjects(): Promise<IProject[]> {
        const response: AxiosResponse<ICollectionResponse<IProject>> = await AxiosBaseApi.axiosGet(
            CustomerUrls.customerProjects
        );

        return response.data.items.map(ProjectApi.mapToModel);
    }

    public static async getProject(projectId: string): Promise<IProject> {
        const response: AxiosResponse<IProject> = await AxiosBaseApi.axiosGet(`${ProjectUrls.getProject}/${projectId}`);

        return ProjectApi.mapToModel(response.data);
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

        return ProjectApi.mapToModel(response.data);
    }

    public static async getAllUserProjects(): Promise<IProject[]> {
        const response: AxiosResponse<ICollectionResponse<IProject>> = await AxiosBaseApi.axiosGet(
            ProjectUrls.getUserProjects
        );

        return response.data.items.map(ProjectApi.mapToModel);
    }

    private static mapToModel(data: any): IProject {
        return {
            projectName: data.projectName,
            projectDescription: data.projectDescription,
            startDate: new Date(data.startDate),
            endDate: new Date(data.endDate),
            customerId: data.customer.customerId,
            workSpaceId: data.workSpaceId,
        };
    }
}
