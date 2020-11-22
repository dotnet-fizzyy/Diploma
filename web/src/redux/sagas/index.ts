import { all } from "redux-saga/effects";
import rootCurrentUserSaga from "./currentUserSagas";
import rootStoriesSaga from "./storiesSagas";

export default function* rootSaga() {
  const sagas = [rootStoriesSaga(), rootCurrentUserSaga()];

  yield all(sagas);
}
