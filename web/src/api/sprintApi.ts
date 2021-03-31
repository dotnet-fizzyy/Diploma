import { AxiosResponse } from 'axios';
import { SprintUrls } from '../constants/routeConstants';
import { ICollectionResponse } from '../types';
import { IFullSprint, ISprint } from '../types/sprintTypes';
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

        return SprintApi.mapToModel(response.data);
    }

    private static mapToModel(data: any): ISprint {
        return {
            sprintId: data.sprint,
            epicId: data.epicId,
            sprintName: data.sprintName,
            startDate: data.startDate,
            endDate: data.endDate,
        };
    }
}
