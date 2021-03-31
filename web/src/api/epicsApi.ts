import { AxiosResponse } from 'axios';
import { EpicUrls } from '../constants/routeConstants';
import { ICollectionResponse } from '../types';
import { IEpic } from '../types/epicTypes';
import AxiosBaseApi from './axiosBaseApi';

export default class EpicsApi {
    public static async getProjectEpics(projectId: string): Promise<IEpic[]> {
        const response: AxiosResponse<ICollectionResponse<IEpic>> = await AxiosBaseApi.axiosGet(
            `${EpicUrls.getProjectEpics}/${projectId}`
        );

        return response.data.items.map(EpicsApi.mapToModel);
    }

    public static async createEpicForProject(epic: IEpic): Promise<IEpic> {
        const mappedEpic = {
            epicName: epic.epicName,
            epicDescription: epic.epicDescription,
            startDate: epic.startDate,
            endDate: epic.endDate,
            projectId: epic.projectId,
        };

        const response: AxiosResponse<IEpic> = await AxiosBaseApi.axiosPost(EpicUrls.createEpic, mappedEpic);

        return EpicsApi.mapToModel(response.data);
    }

    private static mapToModel(data: any): IEpic {
        return {
            epicId: data.epicId,
            epicName: data.epicName,
            epicDescription: data.epicDescription,
            startDate: data.startDate,
            endDate: data.endDate,
            projectId: data.projectId,
        };
    }
}
