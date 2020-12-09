import * as routeConstants from '../constants/routeConstants';
import { IEpic } from '../types/epicTypes';
import { axiosGet, axiosPost } from './index';

export async function getProjectEpics(projectId: string) {
    const response = await axiosGet(routeConstants.ProjectUrl);

    return response.data;
}

export async function createEpicForProject(epic: IEpic) {
    const mappedEpic = {
        epicName: epic.epicName,
        epicDescription: epic.epicDescription,
        startDate: epic.startDate,
        endDate: epic.endDate,
        projectId: epic.projectId,
    };

    const response = await axiosPost(routeConstants.ProjectUrl, mappedEpic);

    return response.data;
}
