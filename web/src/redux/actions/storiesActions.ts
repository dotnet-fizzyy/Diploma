import { IStory, IStoryColumns, IStoryDragAndDrop, IStoryHistory } from '../../types/storyTypes';

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
    SET_STORY_TITLE_TERM_REQUEST: 'SET_STORY_TITLE_TERM_REQUEST',
    SET_STORY_TITLE_TERM_SUCCESS: 'SET_STORY_TITLE_TERM_SUCCESS',
    SET_STORY_TITLE_TERM_FAILURE: 'SET_STORY_TITLE_TERM_FAILURE',
    BLUR_STORY_TITLE_TERM: 'BLUR_STORY_TITLE_TERM',
    ATTEMPT_TO_BLOCK_STORY: 'ATTEMPT_TO_BLOCK_STORY',
    DECLINE_STORY_BLOCK: 'DECLINE_STORY_BLOCK',
    GET_STORY_HISTORY_REQUEST: 'GET_STORY_HISTORY_REQUEST',
    GET_STORY_HISTORY_FAILURE: 'GET_STORY_HISTORY_FAILURE',
    GET_STORY_HISTORY_SUCCESS: 'GET_STORY_HISTORY_SUCCESS',
    STORY_UPDATE_CHANGES_REQUEST: 'STORY_UPDATE_CHANGES_REQUEST',
    STORY_UPDATE_CHANGES_SUCCESS: 'STORY_UPDATE_CHANGES_SUCCESS',
    STORY_UPDATE_CHANGES_FAILURE: 'STORY_UPDATE_CHANGES_FAILURE',
    CHANGE_EPIC_REQUEST: 'CHANGE_EPIC_REQUEST',
    CHANGE_EPIC_SUCCESS: 'CHANGE_EPIC_SUCCESS',
    CHANGE_EPIC_FAILURE: 'CHANGE_EPIC_FAILURE',
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

export interface ISetStoryTitleTermRequest {
    type: typeof StoryActions.SET_STORY_TITLE_TERM_REQUEST;
    payload: string;
}

export interface ISetStoryTitleTermSuccess {
    type: typeof StoryActions.SET_STORY_TITLE_TERM_SUCCESS;
    payload: IStory[];
}

export interface ISetStoryTitleTermFailure {
    type: typeof StoryActions.SET_STORY_TITLE_TERM_FAILURE;
    payload: Error;
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

export interface IGetStoryHistoryRequest {
    type: typeof StoryActions.GET_STORY_HISTORY_REQUEST;
    payload: string;
}

export interface IGetStoryHistorySuccess {
    type: typeof StoryActions.GET_GENERAL_INFO_SUCCESS;
    payload: IStoryHistory[];
}

export interface IGetStoryHistoryFailure {
    type: typeof StoryActions.GET_STORY_HISTORY_FAILURE;
    payload: Error;
}

export interface IUpdateStoryChangesRequest {
    type: typeof StoryActions.STORY_UPDATE_CHANGES_REQUEST;
    payload: IStory;
}

export interface IUpdateStoryChangesSuccess {
    type: typeof StoryActions.STORY_UPDATE_CHANGES_SUCCESS;
    payload: IStory;
}

export interface IUpdateStoryChangesFailure {
    type: typeof StoryActions.STORY_UPDATE_CHANGES_FAILURE;
    payload: Error;
}

export interface IChangeEpicRequest {
    type: typeof StoryActions.CHANGE_EPIC_REQUEST;
    payload: string;
}

export interface IChangeEpicSuccess {
    type: typeof StoryActions.CHANGE_EPIC_SUCCESS;
}

export interface IChangeEpicFailure {
    type: typeof StoryActions.CHANGE_EPIC_FAILURE;
    payload: Error;
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

export function setStoryTitleTermRequest(term: string): ISetStoryTitleTermRequest {
    return {
        type: StoryActions.SET_STORY_TITLE_TERM_REQUEST,
        payload: term,
    };
}

export function setStoryTitleTermSuccess(stories: IStory[]): ISetStoryTitleTermSuccess {
    return {
        type: StoryActions.SET_STORY_TITLE_TERM_REQUEST,
        payload: stories,
    };
}

export function setStoryTitleTermFailure(error: Error): ISetStoryTitleTermFailure {
    return {
        type: StoryActions.SET_STORY_TITLE_TERM_FAILURE,
        payload: error,
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

export function getStoryHistoryRequest(storyId: string): IGetStoryHistoryRequest {
    return {
        type: StoryActions.GET_STORY_HISTORY_REQUEST,
        payload: storyId,
    };
}

export function getStoryHistorySuccess(storyHistories: IStoryHistory[]): IGetStoryHistorySuccess {
    return {
        type: StoryActions.GET_GENERAL_INFO_SUCCESS,
        payload: storyHistories,
    };
}

export function getStoryHistoryFailure(error: Error): IGetStoryHistoryFailure {
    return {
        type: StoryActions.GET_GENERAL_INFO_SUCCESS,
        payload: error,
    };
}

export function storyUpdateChangesRequest(story: IStory): IUpdateStoryChangesRequest {
    return {
        type: StoryActions.STORY_UPDATE_CHANGES_REQUEST,
        payload: story,
    };
}

export function storyUpdateChangesSuccess(story: IStory): IUpdateStoryChangesSuccess {
    return {
        type: StoryActions.STORY_UPDATE_CHANGES_SUCCESS,
        payload: story,
    };
}

export function storyUpdateChangesFailure(error: Error): IUpdateStoryChangesFailure {
    return {
        type: StoryActions.STORY_UPDATE_CHANGES_FAILURE,
        payload: error,
    };
}

export function changeEpicRequest(epicId: string): IChangeEpicRequest {
    return {
        type: StoryActions.CHANGE_EPIC_REQUEST,
        payload: epicId,
    };
}

export function changeEpicSuccess(): IChangeEpicSuccess {
    return {
        type: StoryActions.CHANGE_EPIC_SUCCESS,
    };
}

export function changeEpicFailure(error: Error): IChangeEpicFailure {
    return {
        type: StoryActions.CHANGE_EPIC_FAILURE,
        payload: error,
    };
}

export type StoriesActionTypes = ISetStoryTitleTermSuccess & IUpdateStoryChangesSuccess;
