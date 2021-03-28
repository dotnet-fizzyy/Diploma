import { ColumnIds } from '../constants/boardConstants';
import * as routeConstants from '../constants/routeConstants';
import { IJsonPatchBody } from '../types';
import { IStory, IStoryUpdate } from '../types/storyTypes';
import * as axios from './index';

export async function changeStoryColumn(jsonPatchDocument: IJsonPatchBody[]) {
    const response = await axios.axiosPatch(routeConstants.StoryUrls.boardMove, jsonPatchDocument);

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
        storyPriority: story.storyPriority,
        recordVersion: 0,
        sprintId: story.sprintId,
        title: story.title,
        userId: story.userId,
        creationDate: new Date(),
    };

    const response = await axios.axiosPost(routeConstants.StoryUrls.updateStory, mappedStory);

    return response.data;
}

export async function updateStory(storyUpdate: IStoryUpdate) {
    const response = await axios.axiosPut(routeConstants.StoryUrls.partUpdate, storyUpdate);

    return response.data;
}

export async function getStoriesByTerm(storyTerm: string, projectId: string) {
    const response = await axios.axiosGet(
        routeConstants.StoryUrls.termSearch + `?term=${storyTerm}&limit=${5}&projectId=${projectId}`
    );

    return response.data;
}

export async function sortStories(sortType: string, epicId: string) {
    const response = await axios.axiosGet(
        routeConstants.StoryUrls.sortStories + `?epicId=${epicId}&sortType=${sortType}&orderType=${'ASC'}`
    );

    return response.data;
}

export async function changeStoryStatus() {
    const response = await axios.axiosPatch(routeConstants.StoryUrls.sortStories, {});

    return response.data;
}

export async function getStoryHistory(storyId: string) {
    const response = await axios.axiosGet(routeConstants.StoryUrls.storyHistory + storyId);

    return response.data;
}
