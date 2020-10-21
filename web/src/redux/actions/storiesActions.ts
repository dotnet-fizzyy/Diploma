import { IStory } from "../../types";

export const StoryActions = {
  GET_GENERAL_INFO_REQUEST: "GET_GENERAL_INFO_REQUEST",
  GET_GENERAL_INFO_SUCCESS: "GET_GENERAL_INFO_SUCCESS",
  ADD_STORIES: "ADD_STORIES",
  SELECT_STORY: "SELECT_STORY",
  REFRESH_STORIES: "REFRESH_STORIES",
  MAKE_STORY_BLOCKED: "MAKE_STORY_BLOCKED",
  MAKE_STORY_READY: "MAKE_STORY_READY",
};

//interfaces
export interface IAddStories {
  type: typeof StoryActions.ADD_STORIES;
  payload: IStory[];
}

export interface ISelectStory {
  type: typeof StoryActions.SELECT_STORY;
  payload: string;
}

export interface IRefreshStories {
  type: typeof StoryActions.REFRESH_STORIES;
}

export interface IGetGeneralInfoRequest {
  type: typeof StoryActions.GET_GENERAL_INFO_REQUEST;
  payload: string;
}

export interface IGetGeneralInfoSuccess {
  type: typeof StoryActions.GET_GENERAL_INFO_SUCCESS;
}

export interface IMakeStoryBlocked {
  type: typeof StoryActions.MAKE_STORY_BLOCKED;
  payload: string;
}

export interface IMakeStoryReady {
  type: typeof StoryActions.MAKE_STORY_READY;
  payload: string;
}

//actions
export function storyActionAddStories(stories: IStory[]): IAddStories {
  return {
    type: StoryActions.ADD_STORIES,
    payload: stories,
  };
}

export function storyActionSelectStory(value: string): ISelectStory {
  return {
    type: StoryActions.SELECT_STORY,
    payload: value,
  };
}

export function storyRefreshStories(): IRefreshStories {
  return {
    type: StoryActions.REFRESH_STORIES,
  };
}

export function getGeneralInfoRequest(userId: string): IGetGeneralInfoRequest {
  return {
    type: StoryActions.GET_GENERAL_INFO_REQUEST,
    payload: userId,
  };
}

export function getGeneralInfoSuccess(): IGetGeneralInfoSuccess {
  return {
    type: StoryActions.GET_GENERAL_INFO_SUCCESS,
  };
}

export function storyActionMakeStoryBlocked(storyId: string): IMakeStoryBlocked {
  return {
    type: StoryActions.MAKE_STORY_BLOCKED,
    payload: storyId,
  };
}

export function storyActionMakeStoryReady(storyId: string): IMakeStoryReady {
  return {
    type: StoryActions.MAKE_STORY_READY,
    payload: storyId,
  };
}
