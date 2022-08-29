import { AxiosResponse } from 'axios';
import { ColumnIds } from '../constants/boardConstants';
import { StoryUrls } from '../constants/routeConstants';
import { mapToFullStory, mapToStoryModel } from '../mappers/storyMappers';
import { ICollectionResponse, IJsonPatchBody } from '../types';
import { IFullStory, IStory } from '../types/story';
import AxiosBaseApi from './axiosBaseApi';

export default class StoryApi {
    public static async changeStoryColumn(jsonPatchDocument: IJsonPatchBody[]): Promise<IStory> {
        const response: AxiosResponse<IStory> = await AxiosBaseApi.patch(StoryUrls.boardMove, jsonPatchDocument);

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
            requiredPosition: story.requiredPosition,
            teamId: story.teamId,
        };

        const response: AxiosResponse<IStory> = await AxiosBaseApi.post(StoryUrls.updateStory, mappedStory);

        return mapToStoryModel(response.data);
    }

    public static async updateStory(storyUpdate: IStory): Promise<IStory> {
        const response: AxiosResponse<IStory> = await AxiosBaseApi.put(StoryUrls.partUpdate, storyUpdate);

        return mapToStoryModel(response.data);
    }

    public static async sortStories(queryParams: string): Promise<IStory[]> {
        const response: AxiosResponse<ICollectionResponse<IStory>> = await AxiosBaseApi.get(
            `${StoryUrls.sortStories}?${queryParams}`
        );

        return response.data.items.map(mapToStoryModel);
    }

    public static async getStoryHistory(storyId: string): Promise<IFullStory> {
        const response: AxiosResponse<IFullStory> = await AxiosBaseApi.get(`${StoryUrls.storyHistory}/${storyId}`);

        return mapToFullStory(response.data);
    }

    public static async makeStoryReady(body: IJsonPatchBody[]): Promise<IStory> {
        const response: AxiosResponse<IStory> = await AxiosBaseApi.patch(StoryUrls.changeStatus, body);

        return mapToStoryModel(response.data);
    }

    public static async removeStory(body: IJsonPatchBody[]): Promise<void> {
        await AxiosBaseApi.patch(StoryUrls.removeStory, body);
    }
}
