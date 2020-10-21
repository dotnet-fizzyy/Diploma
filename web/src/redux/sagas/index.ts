import { all } from "redux-saga/effects";
import rootStoriesSaga from "./storiesSagas";

export default function* rootSaga() {
  const sagas = [rootStoriesSaga()];

  yield all(sagas);
}
