import { SortDirection } from '../../constants/story';
import { IBaseAction } from '../../types';
import { IFullStory, IStory, IStoryColumns, IStoryDragAndDrop, IStorySimpleModel } from '../../types/story';

export const StoryActions = {
    GET_GENERAL_INFO_SUCCESS: 'GET_GENERAL_INFO_SUCCESS',
    ADD_STORIES: 'ADD_STORIES',
    SELECT_STORY: 'SELECT_STORY',
    GET_STORIES_FROM_EPIC_SUCCESS: 'GET_STORIES_FROM_EPIC_SUCCESS',
    REFRESH_STORIES_REQUEST: 'REFRESH_STORIES_REQUEST',
    REFRESH_STORIES_FAILURE: 'REFRESH_STORIES_FAILURE',
    CREATE_STORY_REQUEST: 'CREATE_STORY_REQUEST',
    CREATE_STORY_SUCCESS: 'CREATE_STORY_SUCCESS',
    CREATE_STORY_FAILURE: 'CREATE_STORY_FAILURE',
    MAKE_STORY_BLOCKED: 'MAKE_STORY_BLOCKED',
    MAKE_STORY_READY_REQUEST: 'MAKE_STORY_READY_REQUEST',
    MAKE_STORY_READY_SUCCESS: 'MAKE_STORY_READY_SUCCESS',
    MAKE_STORY_READY_FAILURE: 'MAKE_STORY_READY_FAILURE',
    STORY_DRAG_START: 'STORY_DRAG_START',
    STORY_HANDLE_DRAG_AND_DROP: 'STORY_HANDLE_DRAG_AND_DROP',
    STORY_UPDATE_COLUMN_REQUEST: 'STORY_UPDATE_COLUMN_REQUEST',
    STORY_UPDATE_COLUMN_SUCCESS: 'STORY_UPDATE_COLUMN_SUCCESS',
    STORY_UPDATE_COLUMN_FAILURE: 'STORY_UPDATE_COLUMN_FAILURE',
    STORY_DRAG_FINISH: 'STORY_DRAG_FINISH',
    UPDATE_STORIES_AFTER_DRAG_AND_DROP_ACTION: 'UPDATE_STORIES_AFTER_DRAG_AND_DROP_ACTION',
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
    CHANGE_SORT_DIRECTION_REQUEST: 'CHANGE_SORT_DIRECTION_REQUEST',
    CHANGE_STORIES_SPRINT_REQUEST: 'CHANGE_STORIES_SPRINT_REQUEST',
    CHANGE_STORIES_SPRINT_SUCCESS: 'CHANGE_STORIES_SPRINT_SUCCESS',
    REMOVE_STORY_REQUEST: 'REMOVE_STORY_REQUEST',
    REMOVE_STORY_SUCCESS: 'REMOVE_STORY_SUCCESS',
    REMOVE_STORY_FAILURE: 'REMOVE_STORY_FAILURE',
    SET_STORIES_SIMPLE_ITEMS: 'SET_STORIES_SIMPLE_ITEMS',
};

/**
 * Interfaces
 */
export interface IAddStories extends IBaseAction {
    payload: IStory[];
}

export interface ISelectStory extends IBaseAction {
    payload: string;
}

export interface IRefreshStoriesRequest extends IBaseAction {}

export interface IRefreshStoriesFailure extends IBaseAction {
    payload: Error;
}

export interface ICreateStoryRequest extends IBaseAction {
    payload: IStory;
}

export interface ICreateStorySuccess extends IBaseAction {
    payload: IStory;
}

export interface ICreateStoryFailure extends IBaseAction {
    payload: Error;
}

export interface IMakeStoryBlocked extends IBaseAction {
    payload: string;
}

export interface IMakeStoryReadyRequest extends IBaseAction {
    payload: {
        storyId: string;
        isReady: boolean;
        recordVersion: number;
    };
}

export interface IMakeStoryReadySuccess extends IBaseAction {
    payload: IStory;
}

export interface IMakeStoryReadyFailure extends IBaseAction {
    payload: string;
}

export interface IStoryDragStart extends IBaseAction {}

export interface IStoryHandleDragAndDrop extends IBaseAction {
    payload: IStoryDragAndDrop;
}

export interface IUpdateStoryColumnRequest extends IBaseAction {
    payload: IStory;
}

export interface IUpdateStoryColumnSuccess extends IBaseAction {
    payload: IStory;
}

export interface IUpdateStoryColumnFailure extends IBaseAction {
    payload: Error;
}

export interface IStoryDragFinish extends IBaseAction {}

export interface IUpdateStoriesAfterDragAndDropAction extends IBaseAction {
    payload: IStoryColumns[];
}

export interface IAttemptToBlockStory extends IBaseAction {}

export interface IDeclineStoryBlock extends IBaseAction {
    payload: string;
}

export interface IGetStoryHistoryRequest extends IBaseAction {
    payload: string;
}

export interface IGetStoryHistorySuccess extends IBaseAction {
    payload: IFullStory;
}

export interface IGetStoryHistoryFailure extends IBaseAction {
    payload: Error;
}

export interface IUpdateStoryChangesRequest extends IBaseAction {
    payload: IStory;
}

export interface IUpdateStoryChangesSuccess extends IBaseAction {
    payload: IStory;
}

export interface IUpdateStoryChangesFailure extends IBaseAction {
    payload: Error;
}

export interface IChangeEpicRequest extends IBaseAction {
    payload: string;
}

export interface IChangeEpicFailure extends IBaseAction {
    payload: Error;
}

export interface ISortStoriesRequest extends IBaseAction {
    payload: string;
}

export interface ISortStoriesSuccess extends IBaseAction {
    payload: IStory[];
}

export interface ISortStoriesFailure extends IBaseAction {
    payload: Error;
}

export interface IChangeSortType extends IBaseAction {
    payload: string;
}

export interface IChangeSortDirectionRequest extends IBaseAction {
    payload: SortDirection;
}

export interface IChangeStorySprintRequest extends IBaseAction {
    payload: string;
}

export interface IRemoveStoryRequest extends IBaseAction {
    payload: {
        storyId: string;
        recordVersion: number;
    };
}

export interface IRemoveStorySuccess extends IBaseAction {
    payload: string;
}

export interface IRemoveStoryFailure extends IBaseAction {
    payload: Error;
}

export interface ISetStoriesSimpleItems extends IBaseAction {
    payload: IStorySimpleModel[];
}

/**
 * Actions
 */
export const addStories = (stories: IStory[]): IAddStories => ({
    type: StoryActions.ADD_STORIES,
    payload: stories,
});

export const storyActionSelectStory = (value: string): ISelectStory => ({
    type: StoryActions.SELECT_STORY,
    payload: value,
});

export const refreshStoriesRequest = (): IRefreshStoriesRequest => ({
    type: StoryActions.REFRESH_STORIES_REQUEST,
});

export const refreshStoriesFailure = (error: Error): IRefreshStoriesFailure => ({
    type: StoryActions.REFRESH_STORIES_REQUEST,
    payload: error,
});

export const createStoryRequest = (story: IStory): ICreateStoryRequest => ({
    type: StoryActions.CREATE_STORY_REQUEST,
    payload: story,
});

export const createStorySuccess = (story: IStory): ICreateStorySuccess => ({
    type: StoryActions.CREATE_STORY_SUCCESS,
    payload: story,
});

export const createStoryFailure = (error: Error): ICreateStoryFailure => ({
    type: StoryActions.CREATE_STORY_FAILURE,
    payload: error,
});

export const makeStoryBlocked = (storyId: string): IMakeStoryBlocked => ({
    type: StoryActions.MAKE_STORY_BLOCKED,
    payload: storyId,
});

export const makeStoryReadyRequest = (
    storyId: string,
    isReady: boolean,
    recordVersion: number
): IMakeStoryReadyRequest => ({
    type: StoryActions.MAKE_STORY_READY_REQUEST,
    payload: {
        storyId,
        isReady,
        recordVersion,
    },
});

export const makeStoryReadySuccess = (story: IStory): IMakeStoryReadySuccess => ({
    type: StoryActions.MAKE_STORY_READY_SUCCESS,
    payload: story,
});

export const makeStoryReadyFailure = (storyId: string): IMakeStoryReadyFailure => ({
    type: StoryActions.MAKE_STORY_READY_FAILURE,
    payload: storyId,
});

export const storyActionDragStart = (): IStoryDragStart => ({
    type: StoryActions.STORY_DRAG_START,
});

export const storyDragAndDropHandle = (value: IStoryDragAndDrop): IStoryHandleDragAndDrop => ({
    type: StoryActions.STORY_HANDLE_DRAG_AND_DROP,
    payload: value,
});

export const updateStoryColumnRequest = (value: IStory): IUpdateStoryColumnRequest => ({
    type: StoryActions.STORY_UPDATE_COLUMN_REQUEST,
    payload: value,
});

export const updateStoryColumnSuccess = (story: IStory): IUpdateStoryColumnSuccess => ({
    type: StoryActions.STORY_UPDATE_COLUMN_SUCCESS,
    payload: story,
});

export const updateStoryColumnFailure = (error: Error): IUpdateStoryColumnFailure => ({
    type: StoryActions.STORY_UPDATE_COLUMN_FAILURE,
    payload: error,
});

export const storyDragFinish = (): IStoryDragFinish => ({
    type: StoryActions.STORY_DRAG_FINISH,
});

export const updateStoriesAfterDragAndDropAction = (
    columns: IStoryColumns[]
): IUpdateStoriesAfterDragAndDropAction => ({
    type: StoryActions.UPDATE_STORIES_AFTER_DRAG_AND_DROP_ACTION,
    payload: columns,
});

export const attemptToBlockStory = (): IAttemptToBlockStory => ({
    type: StoryActions.ATTEMPT_TO_BLOCK_STORY,
});

export const declineStoryBlock = (storyId: string): IDeclineStoryBlock => ({
    type: StoryActions.DECLINE_STORY_BLOCK,
    payload: storyId,
});

export const getStoryHistoryRequest = (storyId: string): IGetStoryHistoryRequest => ({
    type: StoryActions.GET_STORY_HISTORY_REQUEST,
    payload: storyId,
});

export const getStoryHistorySuccess = (fullStory: IFullStory): IGetStoryHistorySuccess => ({
    type: StoryActions.GET_STORY_HISTORY_SUCCESS,
    payload: fullStory,
});

export const getStoryHistoryFailure = (error: Error): IGetStoryHistoryFailure => ({
    type: StoryActions.GET_STORY_HISTORY_FAILURE,
    payload: error,
});

export const storyUpdateChangesRequest = (story: IStory): IUpdateStoryChangesRequest => ({
    type: StoryActions.STORY_UPDATE_CHANGES_REQUEST,
    payload: story,
});

export const storyUpdateChangesSuccess = (story: IStory): IUpdateStoryChangesSuccess => ({
    type: StoryActions.STORY_UPDATE_CHANGES_SUCCESS,
    payload: story,
});

export const storyUpdateChangesFailure = (error: Error): IUpdateStoryChangesFailure => ({
    type: StoryActions.STORY_UPDATE_CHANGES_FAILURE,
    payload: error,
});

export const changeEpicRequest = (epicId: string): IChangeEpicRequest => ({
    type: StoryActions.CHANGE_EPIC_REQUEST,
    payload: epicId,
});

export const changeEpicFailure = (error: Error): IChangeEpicFailure => ({
    type: StoryActions.CHANGE_EPIC_FAILURE,
    payload: error,
});

export const sortStoriesRequest = (value: string): ISortStoriesRequest => ({
    type: StoryActions.SORT_STORIES_REQUEST,
    payload: value,
});

export const sortStoriesSuccess = (stories: IStory[]): ISortStoriesSuccess => ({
    type: StoryActions.SORT_STORIES_SUCCESS,
    payload: stories,
});

export const sortStoriesFailure = (error: Error): ISortStoriesFailure => ({
    type: StoryActions.SORT_STORIES_FAILURE,
    payload: error,
});

export const changeSortType = (value: string): IChangeSortType => ({
    type: StoryActions.CHANGE_SORT_TYPE,
    payload: value,
});

export const changeSortDirectionRequest = (value: SortDirection): IChangeSortDirectionRequest => ({
    type: StoryActions.CHANGE_SORT_DIRECTION_REQUEST,
    payload: value,
});

export const changeStorySprintRequest = (sprintId: string): IChangeStorySprintRequest => ({
    type: StoryActions.CHANGE_STORIES_SPRINT_REQUEST,
    payload: sprintId,
});

export const removeStoryRequest = (storyId: string, recordVersion: number): IRemoveStoryRequest => ({
    type: StoryActions.REMOVE_STORY_REQUEST,
    payload: {
        storyId,
        recordVersion,
    },
});

export const removeStorySuccess = (storyId: string): IRemoveStorySuccess => ({
    type: StoryActions.REMOVE_STORY_SUCCESS,
    payload: storyId,
});

export const removeStoryFailure = (error: Error): IRemoveStoryFailure => ({
    type: StoryActions.REMOVE_STORY_FAILURE,
    payload: error,
});

export const setStorySimpleItems = (stories: IStorySimpleModel[]): ISetStoriesSimpleItems => ({
    type: StoryActions.SET_STORIES_SIMPLE_ITEMS,
    payload: stories,
});
