import { call, debounce, delay, put, select, take, takeLatest } from 'redux-saga/effects';
import * as storyApi from '../../ajax/storiesApi';
import { debouncePeriod } from '../../constants/storyConstants';
import { createRequestBodyForColumnMovement, createStoryUpdatePartsFromStory } from '../../helpers/storyHelper';
import { IStory, IStoryColumns } from '../../types/storyTypes';
import { IUser } from '../../types/userTypes';
import * as epicActions from '../actions/epicActions';
import * as projectActions from '../actions/projectActions';
import * as sidebarActions from '../actions/sidebarActions';
import * as sprintsActions from '../actions/sprintsActions';
import * as storyActions from '../actions/storiesActions';
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
        yield put(storyActions.createStorySuccess(action.payload));
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

        const updatedColumns = columns.map((column) => {
            if (column.key === action.payload.columnTypeOrigin) {
                column.value = column.value.filter((story) => story.storyId !== action.payload.storyId);
            }

            if (column.key === action.payload.columnTypeDestination) {
                movableStory.columnType = action.payload.columnTypeDestination;
                column.value = column.value.concat(movableStory);
            }

            return column;
        });

        yield put(storyActions.updateStoryColumnRequest(movableStory));
        yield take(storyActions.StoryActions.STORY_UPDATE_COLUMN_SUCCESS);
        yield put(storyActions.updateStoriesAfterDragAndDropAction(updatedColumns));
    }

    yield put(storyActions.storyDragFinish());
}

function* updateStoryColumn(action: storyActions.IUpdateStoryColumnRequest) {
    try {
        const jsonPatchDocument = createRequestBodyForColumnMovement(action.payload);

        yield call(storyApi.changeStoryColumn, jsonPatchDocument);
        yield put(storyActions.updateStoryColumnSuccess());
    } catch (error) {
        yield put(storyActions.updateStoryColumnFailure());
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
        yield console.warn(action.payload);
    } catch (error) {
        yield put(storyActions.setStoryTitleTermFailure(error));
    }
}

function* getStoryHistory(action: storyActions.IGetStoryHistoryRequest) {
    try {
        yield console.warn(action.payload);
    } catch (error) {
        yield put(storyActions.getStoryHistoryFailure(error));
    }
}

function* updateStoryChanges(action: storyActions.IUpdateStoryChangesRequest) {
    try {
        const selectedStory: IStory = yield select(storySelectors.getSelectedStory);
        const currentUser: IUser = yield select(currentUserSelectors.getUser);

        const storyParts = createStoryUpdatePartsFromStory(selectedStory, action.payload, currentUser.userId);
        console.log(storyParts);
    } catch (error) {
        yield put(storyActions.storyUpdateChangesFailure(error));
    }
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
        const sort = action.payload.split(' ').join('');
        console.log(sort);
    } catch (error) {
        yield put(storyActions.sortStoriesFailure(error));
    }
}

function* handleBoardRequestProcessing(action: storyActions.IHandleBoardRequestProcessing) {
    yield put(projectActions.getProjectRequest(action.payload));
    yield take(projectActions.ProjectActions.GET_PROJECT_SUCCESS);

    yield put(epicActions.getEpicsRequest(action.payload));
    yield take(epicActions.EpicActions.GET_EPICS_SUCCESS);

    yield put(sprintsActions.getFullSprintsFromEpicRequest());
}

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
    yield debounce(debouncePeriod, storyActions.StoryActions.SET_STORY_TITLE_TERM_REQUEST, searchForStoriesByTitleTerm);
}
