import { SprintUrls } from '../constants/routeConstants';
import { ISprint } from '../types/sprintTypes';
import * as axios from './index';

export async function getSprintsFromEpic(epicId: string) {
    const response = await axios.axiosGet(`${SprintUrls.getEpicSprints}/${epicId}`);

    return response.data;
}

export async function createSprint(sprint: ISprint) {
    const mappedSprint = {
        sprintName: sprint.sprintName,
        endDate: new Date(sprint.endDate),
        startDate: new Date(sprint.startDate),
        epicId: sprint.epicId,
    };

    const response = await axios.axiosPost(SprintUrls.createSprint, mappedSprint);

    return response.data;
}
