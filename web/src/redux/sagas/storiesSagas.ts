import { call, debounce, delay, put, select, take, takeLatest } from 'redux-saga/effects';
import * as storyApi from '../../ajax/storiesApi';
import { debouncePeriod } from '../../constants/storyConstants';
import { findCurrentEpic } from '../../helpers/epicHelper';
import { createRequestBodyForColumnMovement, createStoryUpdatePartsFromStory } from '../../helpers/storyHelper';
import { ICollectionResponse } from '../../types';
import { IEpic } from '../../types/epicTypes';
import { IProject } from '../../types/projectTypes';
import { IStory, IStoryColumns, IStoryHistory } from '../../types/storyTypes';
import { IUser } from '../../types/userTypes';
import * as epicActions from '../actions/epicActions';
import * as modalActions from '../actions/modalActions';
import * as projectActions from '../actions/projectActions';
import * as requestProcessorActions from '../actions/requestProcessorActions';
import * as sidebarActions from '../actions/sidebarActions';
import * as sprintsActions from '../actions/sprintsActions';
import * as storyActions from '../actions/storiesActions';
import * as epicSelectors from '../selectors/epicsSelectors';
import * as projectSelectors from '../selectors/projectSelectors';
import * as storySelectors from '../selectors/storiesSelectors';
import * as currentUserSelectors from '../selectors/userSelectors';

function* refreshData() {
    try {
        yield delay(100000);

        yield put(storyActions.refreshStoriesRequest());
    } catch (error) {
        yield put(storyActions.refreshStoriesFailure(error));
    }
}

function* createStory(action: storyActions.ICreateStoryRequest) {
    try {
        const createdStory: IStory = yield call(storyApi.createStory, action.payload);

        yield put(storyActions.createStorySuccess(createdStory));
        yield put(modalActions.closeModal());
    } catch (error) {
        yield put(storyActions.createStoryFailure(error));
    }
}

function* dragAndDropHandler(action: storyActions.IStoryHandleDragAndDrop) {
    const columns: IStoryColumns[] = yield select(storySelectors.getColumns);
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

        yield put(storyActions.updateStoriesAfterDragAndDropAction(updatedColumns));
        yield put(storyActions.updateStoryColumnRequest(movableStory));
    }

    yield put(storyActions.storyDragFinish());
}

function* updateStoryColumn(action: storyActions.IUpdateStoryColumnRequest) {
    try {
        const jsonPatchDocument = createRequestBodyForColumnMovement(action.payload);
        const updatedStory: IStory = yield call(storyApi.changeStoryColumn, jsonPatchDocument);

        yield put(storyActions.updateStoryColumnSuccess(updatedStory));
    } catch (error) {
        yield put(storyActions.updateStoryColumnFailure(error));
    }
}

function* blockStory(action: storyActions.IMakeStoryBlocked) {
    yield put(sidebarActions.sidebarHandleVisibility(true));
    yield put(storyActions.attemptToBlockStory());
    yield put(storyActions.storyActionSelectStory(action.payload));
}

function* declineStoryBlock(action: sidebarActions.ISidebarHandleVisibility) {
    const wasStorySelected: boolean = yield select(storySelectors.getWasStoryBlocked);
    const selectedStory: IStory = yield select(storySelectors.getSelectedStory);

    if (!action.payload && wasStorySelected) {
        yield put(storyActions.declineStoryBlock(selectedStory.storyId));
    }
}

function* searchForStoriesByTitleTerm(action: storyActions.ISetStoryTitleTermRequest) {
    try {
        const currentProject: IProject = yield select(projectSelectors.getProject);
        const stories: ICollectionResponse<IStory> = yield call(
            storyApi.getStoriesByTerm,
            action.payload,
            currentProject.projectId
        );

        yield put(storyActions.setStoryTitleTermSuccess(stories.items));
    } catch (error) {
        yield put(storyActions.setStoryTitleTermFailure(error));
    }
}

function* getStoryHistory(action: storyActions.IGetStoryHistoryRequest) {
    try {
        const storyHistory: ICollectionResponse<IStoryHistory> = yield call(storyApi.getStoryHistory, action.payload);

        yield put(storyActions.getStoryHistorySuccess(storyHistory.items));
    } catch (error) {
        yield put(storyActions.getStoryHistoryFailure(error));
    }
}

function* updateStoryChanges(action: storyActions.IUpdateStoryChangesRequest) {
    try {
        const selectedStory: IStory = yield select(storySelectors.getSelectedStory);
        const currentUser: IUser = yield select(currentUserSelectors.getUser);

        const storyParts = createStoryUpdatePartsFromStory(selectedStory, action.payload, currentUser.userId);
        const updatedStory = yield call(storyApi.updateStory, storyParts);

        yield put(storyActions.storyUpdateChangesSuccess(updatedStory));
    } catch (error) {
        yield put(storyActions.storyUpdateChangesFailure(error));
    }

    yield put(requestProcessorActions.hideSpinner());
}

function* changeEpic(action: storyActions.IChangeEpicRequest) {
    try {
        yield put(epicActions.setCurrentEpicById(action.payload));
    } catch (error) {
        yield put(storyActions.changeEpicFailure(error));
    }
}

function* sortStories(action: storyActions.ISortStoriesRequest) {
    try {
        yield put(storyActions.changeSortType(action.payload));

        const epic: IEpic = yield select(epicSelectors.getCurrentEpic);
        const sort = action.payload.split(' ').join('');

        const sortedStories: ICollectionResponse<IStory> = yield call(storyApi.sortStories, sort, epic.epicId);

        yield put(storyActions.sortStoriesSuccess(sortedStories.items));
    } catch (error) {
        yield put(storyActions.sortStoriesFailure(error));
    }
}

function* handleBoardRequestProcessing(action: storyActions.IHandleBoardRequestProcessing) {
    yield put(projectActions.getProjectRequest(action.payload));
    yield take(projectActions.ProjectActions.GET_PROJECT_SUCCESS);

    yield put(epicActions.getEpicsRequest(action.payload));
    yield take(epicActions.EpicActions.GET_EPICS_SUCCESS);

    const epics: IEpic[] = yield select(epicSelectors.getEpics);
    const currentEpic: IEpic = findCurrentEpic(epics);

    yield put(epicActions.setCurrentEpic(currentEpic));
    yield put(sprintsActions.getFullSprintsFromEpicRequest());
}

function* storyChangeStatusRequest(action: storyActions.IUpdateStoryStatusRequest) {}

export default function* rootStoriesSaga() {
    yield takeLatest(storyActions.StoryActions.REFRESH_STORIES_REQUEST, refreshData);
    yield takeLatest(storyActions.StoryActions.CREATE_STORY_REQUEST, createStory);
    yield takeLatest(storyActions.StoryActions.STORY_HANDLE_DRAG_AND_DROP, dragAndDropHandler);
    yield takeLatest(storyActions.StoryActions.STORY_UPDATE_COLUMN_REQUEST, updateStoryColumn);
    yield takeLatest(storyActions.StoryActions.MAKE_STORY_BLOCKED, blockStory);
    yield takeLatest(sidebarActions.SidebarActions.SIDEBAR_HANDLE_VISIBILITY, declineStoryBlock);
    yield takeLatest(storyActions.StoryActions.GET_STORY_HISTORY_REQUEST, getStoryHistory);
    yield takeLatest(storyActions.StoryActions.STORY_UPDATE_CHANGES_REQUEST, updateStoryChanges);
    yield takeLatest(storyActions.StoryActions.CHANGE_EPIC_REQUEST, changeEpic);
    yield takeLatest(storyActions.StoryActions.SORT_STORIES_REQUEST, sortStories);
    yield takeLatest(storyActions.StoryActions.HANDLE_BOARD_REQUEST_PROCESSING, handleBoardRequestProcessing);
    yield takeLatest(storyActions.StoryActions.STORY_CHANGE_STATUS_REQUEST, storyChangeStatusRequest);
    yield debounce(debouncePeriod, storyActions.StoryActions.SET_STORY_TITLE_TERM_REQUEST, searchForStoriesByTitleTerm);
}
