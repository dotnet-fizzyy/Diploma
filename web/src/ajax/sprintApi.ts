import * as routeConstants from '../constants/routeConstants';
import { ISprint } from '../types/sprintTypes';
import * as axios from './index';

export async function getSprintsFromEpic(epicId: string) {
    const response = await axios.axiosGet(routeConstants.SprintUrl + `/${epicId}`);

    return response.data;
}

export async function createSprint(sprint: ISprint) {
    const mappedSprint = {
        sprintName: sprint.sprintName,
        endDate: new Date(sprint.endDate),
        startDate: new Date(sprint.startDate),
    };

    const response = await axios.axiosPost(routeConstants.SprintUrl, mappedSprint);

    return response.data;
}
