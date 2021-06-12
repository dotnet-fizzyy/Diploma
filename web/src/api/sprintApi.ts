import { AxiosResponse } from 'axios';
import { SprintUrls } from '../constants/routeConstants';
import { mapToSprintModel } from '../mappers/sprintMappers';
import { ICollectionResponse } from '../types';
import { IFullSprint, ISprint } from '../types/sprintTypes';
import { createSprintRemoveRequestBody } from '../utils';
import AxiosBaseApi from './axiosBaseApi';

export default class SprintApi {
    public static async getSprintsFromEpic(epicId: string, teamId?: string): Promise<IFullSprint[]> {
        const teamIdQuery: string = teamId ? `?teamId=${teamId}` : '';

        const response: AxiosResponse<ICollectionResponse<IFullSprint>> = await AxiosBaseApi.get(
            `${SprintUrls.getEpicSprints}/${epicId}${teamIdQuery}`
        );

        return response.data.items;
    }

    public static async createSprint(sprint: ISprint): Promise<ISprint> {
        const mappedSprint = {
            sprintName: sprint.sprintName,
            endDate: new Date(sprint.endDate),
            startDate: new Date(sprint.startDate),
            epicId: sprint.epicId,
        };

        const response: AxiosResponse<ISprint> = await AxiosBaseApi.post(SprintUrls.createSprint, mappedSprint);

        return mapToSprintModel(response.data);
    }

    public static async updateSprint(sprint: ISprint): Promise<ISprint> {
        const mappedSprint = {
            sprintId: sprint.sprintId,
            sprintName: sprint.sprintName,
            endDate: new Date(sprint.endDate),
            startDate: new Date(sprint.startDate),
            epicId: sprint.epicId,
            creationDate: new Date(sprint.creationDate),
        };

        debugger;
        const response: AxiosResponse<ISprint> = await AxiosBaseApi.put(SprintUrls.updateSprint, mappedSprint);

        return mapToSprintModel(response.data);
    }

    public static async removeSprint(sprintId: string): Promise<void> {
        await AxiosBaseApi.patch(SprintUrls.removeSprint, createSprintRemoveRequestBody(sprintId));
    }
}
