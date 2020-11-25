import { delay, put, select, takeLatest } from 'redux-saga/effects';
import mockedProject from '../../mock/mockedProject';
import mockedStories from '../../mock/mockedStories';
import { mockedTeam } from '../../mock/mockedTeam';
import { mockedUser } from '../../mock/mockedUser';
import { IStoryColumns } from '../../types/storyTypes';
import * as userActions from '../actions/currentUserActions';
import * as projectActions from '../actions/projectActions';
import * as storyActions from '../actions/storiesActions';
import * as teamActions from '../actions/teamActions';
import * as storySelectors from '../selectors/storiesSelectors';

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
}

export default function* rootStoriesSaga() {
    yield takeLatest(storyActions.StoryActions.REFRESH_STORIES, refreshData);
    yield takeLatest(storyActions.StoryActions.GET_GENERAL_INFO_REQUEST, getGeneralInfo);
    yield takeLatest(storyActions.StoryActions.STORY_HANDLE_DRAG_AND_DROP, dragAndDropHandler);
}
