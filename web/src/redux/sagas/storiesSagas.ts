import { delay, put, takeLatest } from "redux-saga/effects";
import mockedStories from "../../mock/mockedStories";
import * as storyActions from "../actions/storiesActions";

function* refreshSaga() {
  yield delay(100000);

  yield put(storyActions.storyRefreshStories());
}

function* getGeneralInfo() {
  yield put(storyActions.getGeneralInfoSuccess());
  yield put(storyActions.storyActionAddStories(mockedStories));
}

export default function* rootStoriesSaga() {
  yield takeLatest(storyActions.StoryActions.REFRESH_STORIES, refreshSaga);
  yield takeLatest(
    storyActions.StoryActions.GET_GENERAL_INFO_REQUEST,
    getGeneralInfo
  );
}
