import { all } from 'redux-saga/effects';
import rootCurrentUserSaga from './currentUserSagas';
import rootProjectSaga from './projectSagas';
import rootStoriesSaga from './storiesSagas';

export default function* rootSaga() {
    const sagas = [rootStoriesSaga(), rootCurrentUserSaga(), rootProjectSaga()];

    yield all(sagas);
}
