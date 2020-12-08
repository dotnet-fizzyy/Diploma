import { put, takeLatest } from 'redux-saga/effects';
import * as sprintActions from '../actions/sprintsActions';

function* getSprints(action: sprintActions.IGetSprintsSuccess) {
    try {
        yield console.log(action.payload);
    } catch (error) {
        yield put(sprintActions.getSprintsFailure(error));
    }
}

export default function* rootSprintsSaga() {
    yield takeLatest(sprintActions.SprintActions.GET_SPRINTS_REQUEST, getSprints);
}
