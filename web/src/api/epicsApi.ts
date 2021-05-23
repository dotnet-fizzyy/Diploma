import { AxiosResponse } from 'axios';
import { EpicUrls } from '../constants/routeConstants';
import { mapToEpicModel } from '../mappers/epicMapper';
import { mapToSprintModel } from '../mappers/sprintMappers';
import { mapToStorySimpleModel } from '../mappers/storyMappers';
import { ICollectionResponse } from '../types';
import { IEpic } from '../types/epicTypes';
import { IStatsPage } from '../types/projectTypes';
import { createEpicRemoveRequestBody } from '../utils';
import AxiosBaseApi from './axiosBaseApi';

export default class EpicsApi {
    public static async getProjectEpics(projectId: string): Promise<IEpic[]> {
        const response: AxiosResponse<ICollectionResponse<IEpic>> = await AxiosBaseApi.axiosGet(
            `${EpicUrls.getProjectPage}/${projectId}`
        );

        return response.data.items.map(mapToEpicModel);
    }

    public static async createEpic(epic: IEpic): Promise<IEpic> {
        const mappedEpic = {
            epicName: epic.epicName,
            epicDescription: epic.epicDescription,
            startDate: epic.startDate,
            endDate: epic.endDate,
            projectId: epic.projectId,
        };

        const response: AxiosResponse<IEpic> = await AxiosBaseApi.axiosPost(EpicUrls.createEpic, mappedEpic);

        return mapToEpicModel(response.data);
    }

    public static async updateEpic(epic: IEpic): Promise<IEpic> {
        const mappedEpic = {
            epicId: epic.epicId,
            epicName: epic.epicName,
            epicDescription: epic.epicDescription,
            startDate: new Date(epic.startDate),
            endDate: new Date(epic.endDate),
            projectId: epic.projectId,
            creationDate: new Date(epic.creationDate),
        };

        const response: AxiosResponse<IEpic> = await AxiosBaseApi.axiosPut(EpicUrls.updateEpic, mappedEpic);

        return mapToEpicModel(response.data);
    }

    public static async removeEpic(epicId: string): Promise<void> {
        await AxiosBaseApi.axiosPatch(EpicUrls.removeEpic, createEpicRemoveRequestBody(epicId));
    }

    public static async getStatsSearchItems(epicId: string): Promise<IStatsPage> {
        const response: AxiosResponse<IStatsPage> = await AxiosBaseApi.axiosGet(
            `${EpicUrls.getStatsPageSearchItems}?epicId=${epicId}`
        );

        return EpicsApi.mapToStatsPageData(response.data);
    }

    private static mapToStatsPageData(data: any): IStatsPage {
        return {
            sprints: data.sprints && data.sprints.length ? data.sprints.map(mapToSprintModel) : [],
            stories: data.stories && data.stories.length ? data.stories.map(mapToStorySimpleModel) : [],
        };
    }
}
