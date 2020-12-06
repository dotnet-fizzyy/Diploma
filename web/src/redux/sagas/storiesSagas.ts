import { debounce, delay, put, select, takeLatest } from 'redux-saga/effects';
import { debouncePeriod } from '../../constants/storyConstants';
import { createStoryUpdatePartsFromStory } from '../../helpers/storyHelper';
import mockedProject from '../../mock/mockedProject';
//import mockedSearchResults from '../../mock/mockedSearchResults';
import mockedStories from '../../mock/mockedStories';
import mockedTeam from '../../mock/mockedTeam';
import mockedUser from '../../mock/mockedUser';
import { IStory, IStoryColumns } from '../../types/storyTypes';
import { IUser } from '../../types/userTypes';
import * as userActions from '../actions/currentUserActions';
import * as projectActions from '../actions/projectActions';
import * as sidebarActions from '../actions/sidebarActions';
import * as storyActions from '../actions/storiesActions';
import * as teamActions from '../actions/teamActions';
import * as storySelectors from '../selectors/storiesSelectors';
import * as currentUserSelectors from '../selectors/userSelectors';

function* refreshData() {
    yield delay(100000);

    yield put(storyActions.storyRefreshStories());
}

function* getGeneralInfo() {
    yield put(userActions.addUser(mockedUser));
    yield put(projectActions.setCurrentProject(mockedProject));
    yield put(storyActions.getGeneralInfoSuccess());
    yield put(storyActions.storyActionAddStories(mockedStories));
    yield put(teamActions.setSelectedTeam(mockedTeam));
    yield put(teamActions.addTeams([mockedTeam]));
    yield put(storyActions.setStoryTitleTermSuccess([]));
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
                (movableStory as any).columnType = action.payload.columnTypeDestination;
                column.value = column.value.concat(movableStory as any);
            }

            return column;
        });

        yield put(storyActions.updateStoriesAfterDragAndDropAction(updatedColumns));
    }

    yield put(storyActions.storyActionDragFinish());
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
        console.log(action.payload);
    } catch (error) {
        yield put(storyActions.changeEpicFailure(error));
    }
}

export default function* rootStoriesSaga() {
    yield takeLatest(storyActions.StoryActions.REFRESH_STORIES, refreshData);
    yield takeLatest(storyActions.StoryActions.GET_GENERAL_INFO_REQUEST, getGeneralInfo);
    yield takeLatest(storyActions.StoryActions.STORY_HANDLE_DRAG_AND_DROP, dragAndDropHandler);
    yield takeLatest(storyActions.StoryActions.MAKE_STORY_BLOCKED, blockStory);
    yield takeLatest(sidebarActions.SidebarActions.SIDEBAR_HANDLE_VISIBILITY, declineStoryBlock);
    yield takeLatest(storyActions.StoryActions.GET_STORY_HISTORY_REQUEST, getStoryHistory);
    yield takeLatest(storyActions.StoryActions.STORY_UPDATE_CHANGES_REQUEST, updateStoryChanges);
    yield takeLatest(storyActions.StoryActions.CHANGE_EPIC_REQUEST, changeEpic);
    yield debounce(debouncePeriod, storyActions.StoryActions.SET_STORY_TITLE_TERM_REQUEST, searchForStoriesByTitleTerm);
}
