import { all, call, delay, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import SprintApi from '../../api/sprintApi';
import StoryApi from '../../api/storyApi';
import { SidebarTypes } from '../../constants';
import { SortFieldsNames } from '../../constants/storyConstants';
import { mapFullSprintToSprint } from '../../mappers/sprintMappers';
import { IJsonPatchBody } from '../../types';
import { IFullSprint, ISprint } from '../../types/sprintTypes';
import { IFullStory, IStory, IStoryColumns } from '../../types/storyTypes';
import {
    createRequestBodyForColumnMovement,
    createRequestBodyForReadyStory,
    createRequestBodyForRemoveStory,
} from '../../utils/storyUtils';
import { sidebarHandleVisibility, ISidebarHandleVisibility, SidebarActions } from '../actions/sidebarActions';
import { addSprints, setSelectedSprint } from '../actions/sprintActions';
import {
    addStories,
    attemptToBlockStory,
    changeEpicFailure,
    changeSortType,
    createStoryFailure,
    createStorySuccess,
    declineStoryBlock as declineStoryBlockAction,
    getStoryHistoryFailure,
    getStoryHistorySuccess,
    makeStoryReadyFailure,
    makeStoryReadySuccess,
    refreshStoriesFailure,
    refreshStoriesRequest,
    removeStoryFailure,
    removeStorySuccess,
    sortStoriesFailure,
    sortStoriesSuccess,
    storyActionSelectStory,
    storyDragFinish,
    storyUpdateChangesFailure,
    storyUpdateChangesSuccess,
    updateStoriesAfterDragAndDropAction,
    updateStoryColumnFailure,
    updateStoryColumnRequest,
    updateStoryColumnSuccess,
    IChangeEpicRequest,
    ICreateStoryRequest,
    IGetStoryHistoryRequest,
    IMakeStoryBlocked,
    IMakeStoryReadyRequest,
    IRemoveStoryRequest,
    IStoryHandleDragAndDrop,
    IUpdateStoryChangesRequest,
    IUpdateStoryColumnRequest,
    StoryActions,
} from '../actions/storyActions';
import { getSelectedEpicId } from '../selectors/epic';
import { getSelectedSprintId } from '../selectors/sprintSelectors';
import {
    getColumns,
    getSelectedStory,
    getSortDirection,
    getSortType,
    getWasStoryBlocked,
} from '../selectors/storySelectors';
import { getSelectedTeamId } from '../selectors/teamSelectors';
import { getUserSelectedTeamId } from '../selectors/userSelectors';

function* refreshData() {
    try {
        yield delay(100000);

        yield put(refreshStoriesRequest());
    } catch (error) {
        yield put(refreshStoriesFailure(error));
    }
}

function* createStory(action: ICreateStoryRequest) {
    try {
        const createdStory: IStory = yield call(StoryApi.createStory, action.payload);

        yield put(createStorySuccess(createdStory));
    } catch (error) {
        yield put(createStoryFailure(error));
    }
}

function* dragAndDropHandler(action: IStoryHandleDragAndDrop) {
    const columns: IStoryColumns[] = yield select(getColumns);
    if (action.payload.columnTypeDestination !== action.payload.columnTypeOrigin) {
        let movableStory = columns
            .map((column) => column.value)
            .reduce((accumulator, stories) => accumulator.concat(stories), [])
            .find((story) => story.storyId === action.payload.storyId);

        let updatedColumns = columns.map((column) => {
            if (column.key === action.payload.columnTypeOrigin) {
                column.value = column.value.filter((story) => story.storyId !== action.payload.storyId);
            }

            if (column.key === action.payload.columnTypeDestination) {
                movableStory.columnType = action.payload.columnTypeDestination;
                column.value = column.value.concat(movableStory);
            }

            return column;
        });

        yield all([
            put(updateStoriesAfterDragAndDropAction(updatedColumns)),
            put(updateStoryColumnRequest(movableStory)),
        ]);
    }

    yield put(storyDragFinish());
}

function* updateStoryColumn(action: IUpdateStoryColumnRequest) {
    try {
        const jsonPatchDocument = createRequestBodyForColumnMovement(action.payload);
        const updatedStory: IStory = yield call(StoryApi.changeStoryColumn, jsonPatchDocument);

        yield put(updateStoryColumnSuccess(updatedStory));
    } catch (error) {
        yield put(updateStoryColumnFailure(error));
    }
}

function* blockStory(action: IMakeStoryBlocked) {
    yield put(sidebarHandleVisibility(SidebarTypes.STORY_DESCRIPTION, true));
    yield put(attemptToBlockStory());
    yield put(storyActionSelectStory(action.payload));
}

function* declineStoryBlock(action: ISidebarHandleVisibility) {
    const wasStorySelected: boolean = yield select(getWasStoryBlocked);
    const selectedStory: IStory = yield select(getSelectedStory);

    if (!action.payload && wasStorySelected) {
        yield put(declineStoryBlockAction(selectedStory.storyId));
    }
}

function* getStoryHistory(action: IGetStoryHistoryRequest) {
    try {
        const fullStory: IFullStory = yield call(StoryApi.getStoryHistory, action.payload);

        yield put(getStoryHistorySuccess(fullStory));
    } catch (error) {
        yield put(getStoryHistoryFailure(error));
    }
}

function* updateStoryChanges(action: IUpdateStoryChangesRequest) {
    try {
        const updatedStory: IStory = yield call(StoryApi.updateStory, action.payload);

        yield put(storyUpdateChangesSuccess(updatedStory));
    } catch (error) {
        yield put(storyUpdateChangesFailure(error));
    }
}

function* changeEpic(action: IChangeEpicRequest) {
    try {
        const selectedTeamId: string = yield select(getUserSelectedTeamId);
        const sprintsFromCurrentEpic: IFullSprint[] = yield call(
            SprintApi.getSprintsFromEpic,
            action.payload,
            selectedTeamId
        );

        const sprints: ISprint[] = sprintsFromCurrentEpic.map(mapFullSprintToSprint);
        const stories: IStory[] = sprintsFromCurrentEpic
            .map((x) => x.stories)
            .reduce((accumulator, stories) => accumulator.concat(stories), []);

        yield all([
            put(addSprints(sprints)),
            put(addStories(stories)),
            put(changeSortType(SortFieldsNames.PRIORITY)),
            put(setSelectedSprint('')),
        ]);
    } catch (error) {
        yield put(changeEpicFailure(error));
    }
}

function* sortStories() {
    try {
        const epicId: string = yield select(getSelectedEpicId);
        const sprintId: string = yield select(getSelectedSprintId);
        const sortType: string = yield select(getSortType);
        const sortDirection: string = yield select(getSortDirection);
        const selectedTeam: string = yield select(getSelectedTeamId);

        const queryString: string = `epicId=${epicId}&teamId=${selectedTeam}&sortType=${sortType}&orderType=${sortDirection}${
            sprintId ? `&sprintId=${sprintId}` : ''
        }`;

        const sortedStories: IStory[] = yield call(StoryApi.sortStories, queryString);

        yield put(sortStoriesSuccess(sortedStories));
    } catch (error) {
        yield put(sortStoriesFailure(error));
    }
}

function* makeStoryReady(action: IMakeStoryReadyRequest) {
    try {
        const { storyId, isReady, recordVersion } = action.payload;
        const body: IJsonPatchBody[] = createRequestBodyForReadyStory(storyId, isReady, recordVersion);

        const story: IStory = yield call(StoryApi.makeStoryReady, body);
        yield put(makeStoryReadySuccess(story));
    } catch (error) {
        yield put(makeStoryReadyFailure(error));
    }
}

function* removeStoryRequest(action: IRemoveStoryRequest) {
    try {
        const body: IJsonPatchBody[] = createRequestBodyForRemoveStory(
            action.payload.storyId,
            action.payload.recordVersion
        );

        yield call(StoryApi.removeStory, body);

        yield put(removeStorySuccess(action.payload.storyId));
    } catch (error) {
        yield put(removeStoryFailure(error));
    }
}

export default function* rootStoriesSaga() {
    yield takeLatest(StoryActions.REFRESH_STORIES_REQUEST, refreshData);
    yield takeLatest(StoryActions.CREATE_STORY_REQUEST, createStory);
    yield takeEvery(StoryActions.STORY_HANDLE_DRAG_AND_DROP, dragAndDropHandler);
    yield takeLatest(StoryActions.STORY_UPDATE_COLUMN_REQUEST, updateStoryColumn);
    yield takeLatest(StoryActions.MAKE_STORY_BLOCKED, blockStory);
    yield takeLatest(SidebarActions.SIDEBAR_HANDLE_VISIBILITY, declineStoryBlock);
    yield takeLatest(StoryActions.GET_STORY_HISTORY_REQUEST, getStoryHistory);
    yield takeLatest(StoryActions.STORY_UPDATE_CHANGES_REQUEST, updateStoryChanges);
    yield takeLatest(StoryActions.CHANGE_EPIC_REQUEST, changeEpic);
    yield takeLatest(
        [
            StoryActions.SORT_STORIES_REQUEST,
            StoryActions.CHANGE_SORT_DIRECTION_REQUEST,
            StoryActions.CHANGE_STORIES_SPRINT_REQUEST,
        ],
        sortStories
    );
    yield takeLatest(StoryActions.MAKE_STORY_READY_REQUEST, makeStoryReady);
    yield takeLatest(StoryActions.REMOVE_STORY_REQUEST, removeStoryRequest);
}
