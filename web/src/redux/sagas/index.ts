import { all } from 'redux-saga/effects';
import rootCurrentUserSaga from './currentUserSagas';
import epicsRootSaga from './epicsSagas';
import rootProjectSaga from './projectSagas';
import rootSprintsSaga from './sprintsSagas';
import rootStoriesSaga from './storiesSagas';
import rootTeamsSaga from './teamSagas';

export default function* rootSaga() {
    const sagas = [
        rootStoriesSaga(),
        rootCurrentUserSaga(),
        rootProjectSaga(),
        rootTeamsSaga(),
        epicsRootSaga(),
        rootSprintsSaga(),
    ];

    yield all(sagas);
}
