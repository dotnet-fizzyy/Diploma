import { AxiosResponse } from 'axios';
import { ColumnIds } from '../constants/boardConstants';
import { StoryUrls } from '../constants/routeConstants';
import { mapToStoryHistoryModel, mapToStoryModel } from '../mappers/storyMappers';
import { ICollectionResponse, IJsonPatchBody } from '../types';
import { IStory, IStoryHistory, IStoryUpdate } from '../types/storyTypes';
import AxiosBaseApi from './axiosBaseApi';

export default class StoryApi {
    public static async changeStoryColumn(jsonPatchDocument: IJsonPatchBody[]): Promise<IStory> {
        const response: AxiosResponse<IStory> = await AxiosBaseApi.axiosPatch(StoryUrls.boardMove, jsonPatchDocument);

        return mapToStoryModel(response.data);
    }

    public static async createStory(story: IStory): Promise<IStory> {
        const mappedStory = {
            columnType: ColumnIds.ToDo,
            description: story.description,
            estimate: story.estimate,
            isBlocked: false,
            isDefect: false,
            isReady: false,
            notes: story.notes,
            storyPriority: story.storyPriority,
            recordVersion: 0,
            sprintId: story.sprintId,
            title: story.title,
            userId: story.userId,
            creationDate: new Date(),
        };

        const response: AxiosResponse<IStory> = await AxiosBaseApi.axiosPost(StoryUrls.updateStory, mappedStory);

        return mapToStoryModel(response.data);
    }

    public static async updateStory(storyUpdate: IStoryUpdate): Promise<IStory> {
        const response: AxiosResponse<IStory> = await AxiosBaseApi.axiosPut(StoryUrls.partUpdate, storyUpdate);

        return mapToStoryModel(response.data);
    }

    public static async getStoriesByTerm(storyTerm: string, projectId: string): Promise<IStory[]> {
        const response: AxiosResponse<ICollectionResponse<IStory>> = await AxiosBaseApi.axiosGet(
            StoryUrls.termSearch + `?term=${storyTerm}&limit=${5}&projectId=${projectId}`
        );

        return response.data.items.map(mapToStoryModel);
    }

    public static async sortStories(queryParams: string): Promise<IStory[]> {
        const response: AxiosResponse<ICollectionResponse<IStory>> = await AxiosBaseApi.axiosGet(
            `${StoryUrls.sortStories}?${queryParams}`
        );

        return response.data.items.map(mapToStoryModel);
    }

    public static async getStoryHistory(storyId: string): Promise<IStoryHistory[]> {
        const response: AxiosResponse<ICollectionResponse<IStoryHistory>> = await AxiosBaseApi.axiosGet(
            StoryUrls.storyHistory + storyId
        );

        return response.data.items.map(mapToStoryHistoryModel);
    }

    public static async makeStoryReady(body: IJsonPatchBody[]): Promise<IStory> {
        const response: AxiosResponse<IStory> = await AxiosBaseApi.axiosPatch(StoryUrls.changeStatus, body);

        return mapToStoryModel(response.data);
    }
}
