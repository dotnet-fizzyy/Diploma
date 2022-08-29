import { all, call, spawn } from 'redux-saga/effects';
import rootEpicRootSaga from './epic';
import rootProjectSaga from './project';
import rootSprintSaga from './sprint';
import rootStorySaga from './story';
import rootTeamsSaga from './team';
import rootCurrentUserSaga from './user';
import rootWorkSpaceSaga from './workspace';

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
