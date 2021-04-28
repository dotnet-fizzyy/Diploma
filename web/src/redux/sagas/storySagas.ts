import { all, call, debounce, delay, put, select, takeLatest } from 'redux-saga/effects';
import ProjectApi from '../../api/projectApi';
import SprintApi from '../../api/sprintApi';
import StoryApi from '../../api/storyApi';
import { debouncePeriod } from '../../constants/storyConstants';
import { IEpic } from '../../types/epicTypes';
import { IBoardPage, IProject } from '../../types/projectTypes';
import { IFullSprint, ISprint } from '../../types/sprintTypes';
import { IStory, IStoryColumns, IStoryHistory } from '../../types/storyTypes';
import { IUser } from '../../types/userTypes';
import { mapFullSprintToSprint } from '../../utils/epicHelper';
import { createRequestBodyForColumnMovement, createStoryUpdatePartsFromStory } from '../../utils/storyHelper';
import { addSimpleEpics } from '../actions/epicActions';
import * as epicActions from '../actions/epicActions';
import * as modalActions from '../actions/modalActions';
import * as requestProcessorActions from '../actions/requestProcessorActions';
import * as sidebarActions from '../actions/sidebarActions';
import { addSprints } from '../actions/sprintsActions';
import * as sprintsActions from '../actions/sprintsActions';
import { getBoardInfoFailure, storyActionAddStories } from '../actions/storiesActions';
import * as storyActions from '../actions/storiesActions';
import { setSelectedTeam } from '../actions/teamActions';
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
        const createdStory: IStory = yield call(StoryApi.createStory, action.payload);

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
        const updatedStory: IStory = yield call(StoryApi.changeStoryColumn, jsonPatchDocument);

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
        const currentProject: IProject = yield select(projectSelectors.getSelectProject);
        const stories: IStory[] = yield call(StoryApi.getStoriesByTerm, action.payload, currentProject.projectId);

        yield put(storyActions.setStoryTitleTermSuccess(stories));
    } catch (error) {
        yield put(storyActions.setStoryTitleTermFailure(error));
    }
}

function* getStoryHistory(action: storyActions.IGetStoryHistoryRequest) {
    try {
        const storyHistory: IStoryHistory[] = yield call(StoryApi.getStoryHistory, action.payload);

        yield put(storyActions.getStoryHistorySuccess(storyHistory));
    } catch (error) {
        yield put(storyActions.getStoryHistoryFailure(error));
    }
}

function* updateStoryChanges(action: storyActions.IUpdateStoryChangesRequest) {
    try {
        const selectedStory: IStory = yield select(storySelectors.getSelectedStory);
        const currentUser: IUser = yield select(currentUserSelectors.getUser);

        const storyParts = createStoryUpdatePartsFromStory(selectedStory, action.payload, currentUser.userId);
        const updatedStory = yield call(StoryApi.updateStory, storyParts);

        yield put(storyActions.storyUpdateChangesSuccess(updatedStory));
    } catch (error) {
        yield put(storyActions.storyUpdateChangesFailure(error));
    }

    yield put(requestProcessorActions.hideSpinner());
}

function* changeEpic(action: storyActions.IChangeEpicRequest) {
    try {
        yield put(epicActions.setSelectedEpicById(action.payload));
        const sprintsFromCurrentEpic: IFullSprint[] = yield call(SprintApi.getSprintsFromEpic, action.payload);

        const sprints: ISprint[] = sprintsFromCurrentEpic.map((x) => mapFullSprintToSprint(x));
        yield put(sprintsActions.addSprints(sprints));

        const stories: IStory[] = sprintsFromCurrentEpic
            .map((x) => x.stories)
            .reduce((accumulator, stories) => accumulator.concat(stories), []);
        yield put(storyActions.storyActionAddStories(stories));
    } catch (error) {
        yield put(storyActions.changeEpicFailure(error));
    }
}

function* sortStories(action: storyActions.ISortStoriesRequest) {
    try {
        yield put(storyActions.changeSortType(action.payload));

        const epic: IEpic = yield select(epicSelectors.getCurrentEpic);
        const sort = action.payload.split(' ').join('');

        const sortedStories: IStory[] = yield call(StoryApi.sortStories, sort, epic.epicId);

        yield put(storyActions.sortStoriesSuccess(sortedStories));
    } catch (error) {
        yield put(storyActions.sortStoriesFailure(error));
    }
}

function* handleBoardRequestProcessing(action: storyActions.IGetBoardInfoRequest) {
    try {
        const { projectId, teamId } = action.payload;
        const boardDescription: IBoardPage = yield call(ProjectApi.getBoardPage, projectId, teamId);

        yield all([
            put(setSelectedTeam(boardDescription.team)),
            put(addSimpleEpics(boardDescription.epics)),
            put(addSprints(boardDescription.sprints)),
            put(storyActionAddStories(boardDescription.stories)),
        ]);
    } catch (error) {
        yield put(getBoardInfoFailure(error));
    }
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
    yield takeLatest(storyActions.StoryActions.GET_BOARD_INFO_REQUEST, handleBoardRequestProcessing);
    yield takeLatest(storyActions.StoryActions.STORY_CHANGE_STATUS_REQUEST, storyChangeStatusRequest);
    yield debounce(debouncePeriod, storyActions.StoryActions.SET_STORY_TITLE_TERM_REQUEST, searchForStoriesByTitleTerm);
}
