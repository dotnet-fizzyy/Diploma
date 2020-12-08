import * as routeConstants from '../constants/routeConstants';
import { IProject } from '../types/projectTypes';
import { axiosPost } from './index';

export async function createProject(project: IProject) {
    const response = await axiosPost(routeConstants.ProjectUrl, project);

    return response.data;
}
