import { all, call, spawn } from 'redux-saga/effects';
import rootEpicRootSaga from './epic';
import rootProjectSaga from './projectSagas';
import rootSprintSaga from './sprintSagas';
import rootStorySaga from './storySagas';
import rootTeamsSaga from './teamSagas';
import rootCurrentUserSaga from './userSagas';
import rootWorkSpaceSaga from './workSpaceSagas';

export default function* rootSaga() {
    const sagas = [
        rootStorySaga,
        rootCurrentUserSaga,
        rootProjectSaga,
        rootTeamsSaga,
        rootEpicRootSaga,
        rootSprintSaga,
        rootWorkSpaceSaga,
    ];

    yield all(
        sagas.map((saga) =>
            spawn(function* () {
                while (true) {
                    try {
                        yield call(saga);
                        break;
                    } catch (e) {
                        console.error(e);
                    }
                }
            })
        )
    );
}
