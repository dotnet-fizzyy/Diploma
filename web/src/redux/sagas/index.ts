import { all } from 'redux-saga/effects';
import rootCurrentUserSaga from './currentUserSagas';
import epicsRootSaga from './epicsSagas';
import rootProjectSaga from './projectSagas';
import rootStoriesSaga from './storiesSagas';
import rootTeamsSaga from './teamSagas';

export default function* rootSaga() {
    const sagas = [rootStoriesSaga(), rootCurrentUserSaga(), rootProjectSaga(), rootTeamsSaga(), epicsRootSaga()];

    yield all(sagas);
}
