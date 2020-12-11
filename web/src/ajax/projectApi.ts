import * as routeConstants from '../constants/routeConstants';
import { IProject } from '../types/projectTypes';
import * as axios from './index';

export async function getCustomerProjects() {
    const response = await axios.axiosGet(routeConstants.CustomerUrls.customerProjects);

    return response.data;
}

export async function getProject(projectId: string) {
    const response = await axios.axiosGet(routeConstants.ProjectUrls.getProject + `/${projectId}`);

    return response.data;
}

export async function getAllUserProjects() {
    const response = await axios.axiosGet(routeConstants.ProjectUrls.getUserProjects);

    return response.data;
}

export async function createProject(project: IProject) {
    const mappedProject = {
        projectName: project.projectName,
        projectDescription: project.projectDescription,
        startDate: new Date(project.startDate),
        endDate: new Date(project.endDate),
        customer: project.customer,
    };

    const response = await axios.axiosPost(routeConstants.ProjectUrl, mappedProject);

    return response.data;
}
