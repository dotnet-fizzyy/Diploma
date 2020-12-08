import { put, takeLatest } from 'redux-saga/effects';
import * as epicActions from '../actions/epicActions';
import * as modalActions from '../actions/modalActions';

function* createEpic(action: epicActions.ICreateEpicRequest) {
    try {
        action.payload.epicId = new Date().toLocaleDateString();
        yield put(epicActions.createEpicSuccess(action.payload));
        yield put(modalActions.closeModal());
    } catch (error) {
        yield put(epicActions.createEpicFailure(error));
    }
}

export default function* epicsRootSaga() {
    yield takeLatest(epicActions.EpicActions.CREATE_EPIC_REQUEST, createEpic);
}
