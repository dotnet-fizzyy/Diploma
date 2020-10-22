import { delay, put, select, takeLatest } from "redux-saga/effects";
import mockedStories from "../../mock/mockedStories";
import { IStoryColumns } from "../../types/storyTypes";
import * as storyActions from "../actions/storiesActions";
import * as storySelectors from "../selectors/storiesSelectors";

function* refreshData() {
  yield delay(100000);

  yield put(storyActions.storyRefreshStories());
}

function* getGeneralInfo() {
  yield put(storyActions.getGeneralInfoSuccess());
  yield put(storyActions.storyActionAddStories(mockedStories));
}

function* dragAndDropHandler(action: storyActions.IStoryHandleDragAndDrop) {
  const columns: IStoryColumns[] = yield select(storySelectors.getColumns);
  if (
    action.payload.columnTypeDestination !== action.payload.columnTypeOrigin
  ) {
    let movableStory = columns
      .map((column) => column.value)
      .reduce((accumulator, stories) => accumulator.concat(stories), [])
      .find((story) => story.storyId === action.payload.storyId);

    const updatedColumns = columns.map((column) => {
      if (column.key === action.payload.columnTypeOrigin) {
        column.value = column.value.filter(
          (story) => story.storyId !== action.payload.storyId
        );
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
  yield takeLatest(
    storyActions.StoryActions.GET_GENERAL_INFO_REQUEST,
    getGeneralInfo
  );
  yield takeLatest(
    storyActions.StoryActions.STORY_HANDLE_DRAG_AND_DROP,
    dragAndDropHandler
  );
}
