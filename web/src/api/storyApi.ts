import { AxiosResponse } from 'axios';
import { ColumnIds } from '../constants/boardConstants';
import { StoryUrls } from '../constants/routeConstants';
import { ICollectionResponse, IJsonPatchBody } from '../types';
import { IStory, IStoryHistory, IStoryUpdate } from '../types/storyTypes';
import AxiosBaseApi from './axiosBaseApi';

export default class StoryApi {
    public static async changeStoryColumn(jsonPatchDocument: IJsonPatchBody[]): Promise<IStory> {
        const response: AxiosResponse<IStory> = await AxiosBaseApi.axiosPatch(StoryUrls.boardMove, jsonPatchDocument);

        return StoryApi.mapToStoryModel(response.data);
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

        return StoryApi.mapToStoryModel(response.data);
    }

    public static async updateStory(storyUpdate: IStoryUpdate): Promise<IStory> {
        const response: AxiosResponse<IStory> = await AxiosBaseApi.axiosPut(StoryUrls.partUpdate, storyUpdate);

        return StoryApi.mapToStoryModel(response.data);
    }

    public static async getStoriesByTerm(storyTerm: string, projectId: string): Promise<IStory[]> {
        const response: AxiosResponse<ICollectionResponse<IStory>> = await AxiosBaseApi.axiosGet(
            StoryUrls.termSearch + `?term=${storyTerm}&limit=${5}&projectId=${projectId}`
        );

        return response.data.items.map(StoryApi.mapToStoryModel);
    }

    public static async sortStories(sortType: string, epicId: string): Promise<IStory[]> {
        const response: AxiosResponse<ICollectionResponse<IStory>> = await AxiosBaseApi.axiosGet(
            StoryUrls.sortStories + `?epicId=${epicId}&sortType=${sortType}&orderType=ASC`
        );

        return response.data.items.map(StoryApi.mapToStoryModel);
    }

    public static async getStoryHistory(storyId: string): Promise<IStoryHistory[]> {
        const response: AxiosResponse<ICollectionResponse<IStoryHistory>> = await AxiosBaseApi.axiosGet(
            StoryUrls.storyHistory + storyId
        );

        return response.data.items.map(StoryApi.mapToStoryHistoryModel);
    }

    private static mapToStoryModel(data: any): IStory {
        return {
            storyId: data.storyId,
            columnType: data.columnType,
            description: data.description,
            estimate: data.estimate,
            isBlocked: data.isBlocked,
            blockReason: data.blockReason,
            isDefect: data.isDefect,
            isReady: data.isReady,
            notes: data.notes,
            storyPriority: data.storyPriority,
            recordVersion: data.recordVersion,
            sprintId: data.sprintId,
            title: data.title,
            userId: data.userId,
            creationDate: data.creationDate,
        };
    }

    private static mapToStoryHistoryModel(data: any): IStoryHistory {
        return {
            storyHistoryId: data.storyHistoryId,
            userId: data.userId,
            storyHistoryAction: data.storyHistoryAction,
            creationDate: data.creationDate,
            currentValue: data.currentValue,
            previousValue: data.previousValue,
            fieldName: data.fieldName,
        };
    }
}
