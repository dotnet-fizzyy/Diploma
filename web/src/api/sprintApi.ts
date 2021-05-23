import { AxiosResponse } from 'axios';
import { SprintUrls } from '../constants/routeConstants';
import { mapToSprintModel } from '../mappers/sprintMappers';
import { ICollectionResponse } from '../types';
import { IFullSprint, ISprint } from '../types/sprintTypes';
import { createSprintRemoveRequestBody } from '../utils';
import AxiosBaseApi from './axiosBaseApi';

export default class SprintApi {
    public static async getSprintsFromEpic(epicId: string): Promise<IFullSprint[]> {
        const response: AxiosResponse<ICollectionResponse<IFullSprint>> = await AxiosBaseApi.axiosGet(
            `${SprintUrls.getEpicSprints}/${epicId}`
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

        const response: AxiosResponse<ISprint> = await AxiosBaseApi.axiosPost(SprintUrls.createSprint, mappedSprint);

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
        const response: AxiosResponse<ISprint> = await AxiosBaseApi.axiosPut(SprintUrls.updateSprint, mappedSprint);

        return mapToSprintModel(response.data);
    }

    public static async removeSprint(sprintId: string): Promise<void> {
        await AxiosBaseApi.axiosPatch(SprintUrls.removeSprint, createSprintRemoveRequestBody(sprintId));
    }
}
