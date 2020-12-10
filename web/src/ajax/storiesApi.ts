import { ColumnIds } from '../constants/boardConstants';
import * as routeConstants from '../constants/routeConstants';
import { IJsonPatchBody } from '../types';
import { IStory, IStoryUpdate } from '../types/storyTypes';
import * as axios from './index';

export async function changeStoryColumn(jsonPatchDocument: IJsonPatchBody[]) {
    const response = await axios.axiosPatch(routeConstants.StoriesUrls.boardMove, jsonPatchDocument);

    return response.data;
}

export async function createStory(story: IStory) {
    const mappedStory = {
        columnType: ColumnIds.ToDo,
        description: story.description,
        estimate: story.estimate,
        isBlocked: false,
        isDefect: false,
        isReady: false,
        notes: story.notes,
        priority: story.storyPriority,
        recordVersion: 0,
        sprintId: story.sprintId,
        title: story.title,
        userId: story.userId,
        creationDate: new Date(),
    };

    const response = await axios.axiosPost(routeConstants.StoriesUrl, mappedStory);

    return response.data;
}

export async function updateStory(storyUpdate: IStoryUpdate) {
    const response = await axios.axiosPut(routeConstants.StoriesUrls.partUpdate, storyUpdate);

    return response.data;
}

export async function getStoriesByTerm(storyTerm: string, projectId: string) {
    const response = await axios.axiosGet(
        routeConstants.StoriesUrls.termSearch + `?term=${storyTerm}&limit=${5}&projectId=${projectId}`
    );

    return response.data;
}

export async function sortStories(sortType: string, epicId: string) {
    const response = await axios.axiosGet(
        routeConstants.StoriesUrls.sortStories + `?epicId=${epicId}&sortType=${sortType}&orderType=${'ASC'}`
    );

    return response.data;
}

export async function changeStoryStatus() {
    const response = await axios.axiosPatch(routeConstants.StoriesUrls.sortStories, {});

    return response.data;
}
