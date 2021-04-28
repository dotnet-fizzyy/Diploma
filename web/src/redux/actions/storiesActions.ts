import { IStory, IStoryColumns, IStoryDragAndDrop, IStoryHistory } from '../../types/storyTypes';

export const StoryActions = {
    GET_GENERAL_INFO_REQUEST: 'GET_GENERAL_INFO_REQUEST',
    GET_GENERAL_INFO_SUCCESS: 'GET_GENERAL_INFO_SUCCESS',
    ADD_STORIES: 'ADD_STORIES',
    SELECT_STORY: 'SELECT_STORY',
    GET_STORIES_FROM_EPIC_REQUEST: 'GET_STORIES_FROM_EPIC_REQUEST',
    GET_STORIES_FROM_EPIC_SUCCESS: 'GET_STORIES_FROM_EPIC_SUCCESS',
    GET_STORIES_FROM_EPIC_FAILURE: 'GET_STORIES_FROM_EPIC_FAILURE',
    REFRESH_STORIES_REQUEST: 'REFRESH_STORIES_REQUEST',
    REFRESH_STORIES_SUCCESS: 'REFRESH_STORIES_SUCCESS',
    REFRESH_STORIES_FAILURE: 'REFRESH_STORIES_FAILURE',
    CREATE_STORY_REQUEST: 'CREATE_STORY_REQUEST',
    CREATE_STORY_SUCCESS: 'CREATE_STORY_SUCCESS',
    CREATE_STORY_FAILURE: 'CREATE_STORY_FAILURE',
    MAKE_STORY_BLOCKED: 'MAKE_STORY_BLOCKED',
    MAKE_STORY_READY: 'MAKE_STORY_READY',
    STORY_DRAG_START: 'STORY_DRAG_START',
    STORY_HANDLE_DRAG_AND_DROP: 'STORY_HANDLE_DRAG_AND_DROP',
    STORY_UPDATE_COLUMN_REQUEST: 'STORY_UPDATE_COLUMN_REQUEST',
    STORY_UPDATE_COLUMN_SUCCESS: 'STORY_UPDATE_COLUMN_SUCCESS',
    STORY_UPDATE_COLUMN_FAILURE: 'STORY_UPDATE_COLUMN_FAILURE',
    STORY_DRAG_FINISH: 'STORY_DRAG_FINISH',
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
    SORT_STORIES_REQUEST: 'SORT_STORIES_REQUEST',
    SORT_STORIES_SUCCESS: 'SORT_STORIES_SUCCESS',
    SORT_STORIES_FAILURE: 'SORT_STORIES_FAILURE',
    CHANGE_SORT_TYPE: 'CHANGE_SORT_TYPE',
    STORY_CHANGE_STATUS_REQUEST: 'STORY_CHANGE_STATUS_REQUEST',
    STORY_CHANGE_STATUS_SUCCESS: 'STORY_CHANGE_STATUS_SUCCESS',
    STORY_CHANGE_STATUS_FAILURE: 'STORY_CHANGE_STATUS_FAILURE',
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

export interface IRefreshStoriesRequest {
    type: typeof StoryActions.REFRESH_STORIES_REQUEST;
}

export interface IRefreshStoriesSuccess {
    type: typeof StoryActions.REFRESH_STORIES_SUCCESS;
    payload: IStory[];
}

export interface IRefreshStoriesFailure {
    type: typeof StoryActions.REFRESH_STORIES_FAILURE;
    payload: Error;
}

export interface ICreateStoryRequest {
    type: typeof StoryActions.CREATE_STORY_REQUEST;
    payload: IStory;
}

export interface ICreateStorySuccess {
    type: typeof StoryActions.CREATE_STORY_SUCCESS;
    payload: IStory;
}

export interface ICreateStoryFailure {
    type: typeof StoryActions.CREATE_STORY_FAILURE;
    payload: Error;
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

export interface IStoryDragStart {
    type: typeof StoryActions.STORY_DRAG_START;
}

export interface IStoryHandleDragAndDrop {
    type: typeof StoryActions.STORY_HANDLE_DRAG_AND_DROP;
    payload: IStoryDragAndDrop;
}

export interface IUpdateStoryColumnRequest {
    type: typeof StoryActions.STORY_UPDATE_COLUMN_REQUEST;
    payload: IStory;
}

export interface IUpdateStoryColumnSuccess {
    type: typeof StoryActions.STORY_UPDATE_COLUMN_SUCCESS;
    payload: IStory;
}

export interface IUpdateStoryColumnFailure {
    type: typeof StoryActions.STORY_UPDATE_COLUMN_FAILURE;
    payload: Error;
}

export interface IStoryDragFinish {
    type: typeof StoryActions.STORY_DRAG_FINISH;
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

export interface ISortStoriesRequest {
    type: typeof StoryActions.SORT_STORIES_REQUEST;
    payload: string;
}

export interface ISortStoriesSuccess {
    type: typeof StoryActions.SORT_STORIES_SUCCESS;
    payload: IStory[];
}

export interface ISortStoriesFailure {
    type: typeof StoryActions.SORT_STORIES_FAILURE;
    payload: Error;
}

export interface IChangeSortType {
    type: typeof StoryActions.CHANGE_SORT_TYPE;
    payload: string;
}

export interface IGetStoriesFromEpicRequest {
    type: typeof StoryActions.GET_STORIES_FROM_EPIC_REQUEST;
    payload: string;
}

export interface IGetStoriesFromEpicSuccess {
    type: typeof StoryActions.GET_STORIES_FROM_EPIC_SUCCESS;
    payload: IStory[];
}

export interface IGetStoriesFromEpicFailure {
    type: typeof StoryActions.GET_STORIES_FROM_EPIC_REQUEST;
    payload: Error;
}

export interface IUpdateStoryStatusRequest {
    type: typeof StoryActions.STORY_CHANGE_STATUS_REQUEST;
    payload: IStory;
}

export interface IUpdateStoryStatusSuccess {
    type: typeof StoryActions.STORY_CHANGE_STATUS_SUCCESS;
    payload: IStory;
}

export interface IUpdateStoryStatusFailure {
    type: typeof StoryActions.STORY_CHANGE_STATUS_FAILURE;
    payload: Error;
}

//actions
export function addStories(stories: IStory[]): IAddStories {
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

export function refreshStoriesRequest(): IRefreshStoriesRequest {
    return {
        type: StoryActions.REFRESH_STORIES_REQUEST,
    };
}

export function refreshStoriesSuccess(stories: IStory[]): IRefreshStoriesSuccess {
    return {
        type: StoryActions.REFRESH_STORIES_SUCCESS,
        payload: stories,
    };
}

export function refreshStoriesFailure(error: Error): IRefreshStoriesFailure {
    return {
        type: StoryActions.REFRESH_STORIES_REQUEST,
        payload: error,
    };
}

export function createStoryRequest(story: IStory): ICreateStoryRequest {
    return {
        type: StoryActions.CREATE_STORY_REQUEST,
        payload: story,
    };
}

export function createStorySuccess(story: IStory): ICreateStorySuccess {
    return {
        type: StoryActions.CREATE_STORY_SUCCESS,
        payload: story,
    };
}

export function createStoryFailure(error: Error): ICreateStoryFailure {
    return {
        type: StoryActions.CREATE_STORY_FAILURE,
        payload: error,
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

export function storyActionDragStart(): IStoryDragStart {
    return {
        type: StoryActions.STORY_DRAG_START,
    };
}

export function storyDragAndDropHandle(value: IStoryDragAndDrop): IStoryHandleDragAndDrop {
    return {
        type: StoryActions.STORY_HANDLE_DRAG_AND_DROP,
        payload: value,
    };
}

export function updateStoryColumnRequest(value: IStory): IUpdateStoryColumnRequest {
    return {
        type: StoryActions.STORY_UPDATE_COLUMN_REQUEST,
        payload: value,
    };
}

export function updateStoryColumnSuccess(story: IStory): IUpdateStoryColumnSuccess {
    return {
        type: StoryActions.STORY_UPDATE_COLUMN_SUCCESS,
        payload: story,
    };
}

export function updateStoryColumnFailure(error: Error): IUpdateStoryColumnFailure {
    return {
        type: StoryActions.STORY_UPDATE_COLUMN_FAILURE,
        payload: error,
    };
}

export function storyDragFinish(): IStoryDragFinish {
    return {
        type: StoryActions.STORY_DRAG_FINISH,
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
        type: StoryActions.SET_STORY_TITLE_TERM_SUCCESS,
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
        type: StoryActions.GET_STORY_HISTORY_SUCCESS,
        payload: storyHistories,
    };
}

export function getStoryHistoryFailure(error: Error): IGetStoryHistoryFailure {
    return {
        type: StoryActions.GET_STORY_HISTORY_FAILURE,
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

export function sortStoriesRequest(value: string): ISortStoriesRequest {
    return {
        type: StoryActions.SORT_STORIES_REQUEST,
        payload: value,
    };
}

export function sortStoriesSuccess(stories: IStory[]): ISortStoriesSuccess {
    return {
        type: StoryActions.SORT_STORIES_SUCCESS,
        payload: stories,
    };
}

export function sortStoriesFailure(error: Error): ISortStoriesFailure {
    return {
        type: StoryActions.SORT_STORIES_FAILURE,
        payload: error,
    };
}

export function changeSortType(value: string): IChangeSortType {
    return {
        type: StoryActions.CHANGE_SORT_TYPE,
        payload: value,
    };
}

export function getStoriesFromEpicRequest(epicId: string): IGetStoriesFromEpicRequest {
    return {
        type: StoryActions.GET_STORIES_FROM_EPIC_REQUEST,
        payload: epicId,
    };
}

export function getStoriesFromEpicSuccess(stories: IStory[]): IGetStoriesFromEpicSuccess {
    return {
        type: StoryActions.GET_STORIES_FROM_EPIC_SUCCESS,
        payload: stories,
    };
}

export function getStoriesFromEpicFailure(error: Error): IGetStoriesFromEpicFailure {
    return {
        type: StoryActions.GET_STORIES_FROM_EPIC_FAILURE,
        payload: error,
    };
}

export function handleUpdateStoryStatusRequest(story: IStory): IUpdateStoryStatusRequest {
    return {
        type: StoryActions.STORY_CHANGE_STATUS_REQUEST,
        payload: story,
    };
}

export function handleUpdateStoryStatusSuccess(story: IStory): IUpdateStoryStatusRequest {
    return {
        type: StoryActions.STORY_CHANGE_STATUS_SUCCESS,
        payload: story,
    };
}

export function handleUpdateStoryStatusFailure(error: Error): IUpdateStoryStatusFailure {
    return {
        type: StoryActions.STORY_CHANGE_STATUS_FAILURE,
        payload: error,
    };
}
