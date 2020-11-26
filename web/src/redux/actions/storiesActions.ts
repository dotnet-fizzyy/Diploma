import { IStory, IStoryColumns, IStoryDragAndDrop } from '../../types/storyTypes';

export const StoryActions = {
    GET_GENERAL_INFO_REQUEST: 'GET_GENERAL_INFO_REQUEST',
    GET_GENERAL_INFO_SUCCESS: 'GET_GENERAL_INFO_SUCCESS',
    ADD_STORIES: 'ADD_STORIES',
    SELECT_STORY: 'SELECT_STORY',
    REFRESH_STORIES: 'REFRESH_STORIES',
    MAKE_STORY_BLOCKED: 'MAKE_STORY_BLOCKED',
    MAKE_STORY_READY: 'MAKE_STORY_READY',
    STORY_HANDLE_DRAG_AND_DROP: 'STORY_HANDLE_DRAG_AND_DROP',
    UPDATE_STORIES_AFTER_DRAG_AND_DROP_ACTION: 'UPDATE_STORIES_AFTER_DRAG_AND_DROP_ACTION',
    SET_STORY_TITLE_TERM: 'SET_STORY_TITLE_TERM',
    SET_STORIES_FOUND_BY_TERM: 'SET_STORIES_FOUND_BY_TERM',
    BLUR_STORY_TITLE_TERM: 'BLUR_STORY_TITLE_TERM',
    ATTEMPT_TO_BLOCK_STORY: 'ATTEMPT_TO_BLOCK_STORY',
    DECLINE_STORY_BLOCK: 'DECLINE_STORY_BLOCK',
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

export interface IStoryHandleDragAndDrop {
    type: typeof StoryActions.STORY_HANDLE_DRAG_AND_DROP;
    payload: IStoryDragAndDrop;
}

export interface IUpdateStoriesAfterDragAndDropAction {
    type: typeof StoryActions.UPDATE_STORIES_AFTER_DRAG_AND_DROP_ACTION;
    payload: IStoryColumns[];
}

export interface ISetStoryTitleTerm {
    type: typeof StoryActions.SET_STORY_TITLE_TERM;
    payload: string;
}

export interface ISetStoriesFoundByTerm {
    type: typeof StoryActions.SET_STORIES_FOUND_BY_TERM;
    payload: IStory[];
}

export interface IBlurStoryTitleTerm {
    type: typeof StoryActions.BLUR_STORY_TITLE_TERM;
}

export interface IAttemptToBlockStory {
    type: typeof StoryActions.ATTEMPT_TO_BLOCK_STORY;
}

export interface IDeclineStoryBlock {
    type: typeof StoryActions.DECLINE_STORY_BLOCK;
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

export function storyDragAndDropHandle(value: IStoryDragAndDrop): IStoryHandleDragAndDrop {
    return {
        type: StoryActions.STORY_HANDLE_DRAG_AND_DROP,
        payload: value,
    };
}

export function updateStoriesAfterDragAndDropAction(columns: IStoryColumns[]): IUpdateStoriesAfterDragAndDropAction {
    return {
        type: StoryActions.UPDATE_STORIES_AFTER_DRAG_AND_DROP_ACTION,
        payload: columns,
    };
}

export function setStoryTitleTerm(term: string): ISetStoryTitleTerm {
    return {
        type: StoryActions.SET_STORY_TITLE_TERM,
        payload: term,
    };
}

export function setStoriesFoundByTerm(stories: IStory[]): ISetStoriesFoundByTerm {
    return {
        type: StoryActions.SET_STORY_TITLE_TERM,
        payload: stories,
    };
}

export function blurStoryTitleTerm(): IBlurStoryTitleTerm {
    return {
        type: StoryActions.BLUR_STORY_TITLE_TERM,
    };
}

export function attemptToBlockStory(): IAttemptToBlockStory {
    return {
        type: StoryActions.ATTEMPT_TO_BLOCK_STORY,
    };
}

export function declineStoryBlock(storyId: string): IDeclineStoryBlock {
    return {
        type: StoryActions.DECLINE_STORY_BLOCK,
        payload: storyId,
    };
}
