import { call, debounce, delay, put, select, takeLatest } from 'redux-saga/effects';
import SprintApi from '../../api/sprintApi';
import StoryApi from '../../api/storyApi';
import { debouncePeriod } from '../../constants/storyConstants';
import { IJsonPatchBody } from '../../types';
import { IEpic } from '../../types/epicTypes';
import { IProject } from '../../types/projectTypes';
import { IFullSprint, ISprint } from '../../types/sprintTypes';
import { IStory, IStoryColumns, IStoryHistory, IStoryUpdate } from '../../types/storyTypes';
import { IUser } from '../../types/userTypes';
import { mapFullSprintToSprint } from '../../utils/epicHelper';
import {
    createRequestBodyForColumnMovement,
    createRequestBodyForReadyStory,
    createStoryUpdatePartsFromStory,
} from '../../utils/storyHelper';
import { setSelectedEpicById } from '../actions/epicActions';
import { closeModal } from '../actions/modalActions';
import { sidebarHandleVisibility, ISidebarHandleVisibility, SidebarActions } from '../actions/sidebarActions';
import { addSprints } from '../actions/sprintsActions';
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
    setStoryTitleTermFailure,
    setStoryTitleTermSuccess,
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
    ISetStoryTitleTermRequest,
    ISortStoriesRequest,
    IStoryHandleDragAndDrop,
    IUpdateStoryChangesRequest,
    IUpdateStoryColumnRequest,
    StoryActions,
} from '../actions/storiesActions';
import { getSelectedEpic } from '../selectors/epicsSelectors';
import { getSelectProject } from '../selectors/projectSelectors';
import { getColumns, getSelectedStory, getWasStoryBlocked } from '../selectors/storiesSelectors';
import { getUser } from '../selectors/userSelectors';

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
        yield put(closeModal());
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

        yield put(updateStoriesAfterDragAndDropAction(updatedColumns));
        yield put(updateStoryColumnRequest(movableStory));
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
    yield put(sidebarHandleVisibility(true));
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

function* searchForStoriesByTitleTerm(action: ISetStoryTitleTermRequest) {
    try {
        const currentProject: IProject = yield select(getSelectProject);
        const stories: IStory[] = yield call(StoryApi.getStoriesByTerm, action.payload, currentProject.projectId);

        yield put(setStoryTitleTermSuccess(stories));
    } catch (error) {
        yield put(setStoryTitleTermFailure(error));
    }
}

function* getStoryHistory(action: IGetStoryHistoryRequest) {
    try {
        const storyHistory: IStoryHistory[] = yield call(StoryApi.getStoryHistory, action.payload);

        yield put(getStoryHistorySuccess(storyHistory));
    } catch (error) {
        yield put(getStoryHistoryFailure(error));
    }
}

function* updateStoryChanges(action: IUpdateStoryChangesRequest) {
    try {
        const selectedStory: IStory = yield select(getSelectedStory);
        const currentUser: IUser = yield select(getUser);

        const storyParts: IStoryUpdate = createStoryUpdatePartsFromStory(
            selectedStory,
            action.payload,
            currentUser.userId
        );
        const updatedStory: IStory = yield call(StoryApi.updateStory, storyParts);

        yield put(storyUpdateChangesSuccess(updatedStory));
    } catch (error) {
        yield put(storyUpdateChangesFailure(error));
    }
}

function* changeEpic(action: IChangeEpicRequest) {
    try {
        yield put(setSelectedEpicById(action.payload));
        const sprintsFromCurrentEpic: IFullSprint[] = yield call(SprintApi.getSprintsFromEpic, action.payload);

        const sprints: ISprint[] = sprintsFromCurrentEpic.map((x) => mapFullSprintToSprint(x));
        yield put(addSprints(sprints));

        const stories: IStory[] = sprintsFromCurrentEpic
            .map((x) => x.stories)
            .reduce((accumulator, stories) => accumulator.concat(stories), []);
        yield put(addStories(stories));
    } catch (error) {
        yield put(changeEpicFailure(error));
    }
}

function* sortStories(action: ISortStoriesRequest) {
    try {
        yield put(changeSortType(action.payload));

        const epic: IEpic = yield select(getSelectedEpic);
        const sort = action.payload.split(' ').join('');

        const sortedStories: IStory[] = yield call(StoryApi.sortStories, sort, epic.epicId);

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

export default function* rootStoriesSaga() {
    yield takeLatest(StoryActions.REFRESH_STORIES_REQUEST, refreshData);
    yield takeLatest(StoryActions.CREATE_STORY_REQUEST, createStory);
    yield takeLatest(StoryActions.STORY_HANDLE_DRAG_AND_DROP, dragAndDropHandler);
    yield takeLatest(StoryActions.STORY_UPDATE_COLUMN_REQUEST, updateStoryColumn);
    yield takeLatest(StoryActions.MAKE_STORY_BLOCKED, blockStory);
    yield takeLatest(SidebarActions.SIDEBAR_HANDLE_VISIBILITY, declineStoryBlock);
    yield takeLatest(StoryActions.GET_STORY_HISTORY_REQUEST, getStoryHistory);
    yield takeLatest(StoryActions.STORY_UPDATE_CHANGES_REQUEST, updateStoryChanges);
    yield takeLatest(StoryActions.CHANGE_EPIC_REQUEST, changeEpic);
    yield takeLatest(StoryActions.SORT_STORIES_REQUEST, sortStories);
    yield takeLatest(StoryActions.MAKE_STORY_READY_REQUEST, makeStoryReady);
    yield debounce(debouncePeriod, StoryActions.SET_STORY_TITLE_TERM_REQUEST, searchForStoriesByTitleTerm);
}
