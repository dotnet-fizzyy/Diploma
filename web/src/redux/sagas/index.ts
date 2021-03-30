import { all, call, spawn } from 'redux-saga/effects';
import rootCurrentUserSaga from './currentUserSagas';
import epicsRootSaga from './epicSagas';
import rootProjectSaga from './projectSagas';
import rootSprintsSaga from './sprintSagas';
import rootStoriesSaga from './storySagas';
import rootTeamsSaga from './teamSagas';
import workSpaceSaga from './workSpaceSagas';

export default function* rootSaga() {
    const sagas = [
        rootStoriesSaga,
        rootCurrentUserSaga,
        rootProjectSaga,
        rootTeamsSaga,
        epicsRootSaga,
        rootSprintsSaga,
        workSpaceSaga,
    ];

    yield all(
        sagas.map((saga) =>
            spawn(function* () {
                while (true) {
                    try {
                        yield call(saga);
                        break;
                    } catch (e) {
                        console.log(e);
                    }
                }
            })
        )
    );
}
