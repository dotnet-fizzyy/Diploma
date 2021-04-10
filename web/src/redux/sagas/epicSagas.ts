import { call, put, takeLatest } from 'redux-saga/effects';
import EpicsApi from '../../api/epicsApi';
import { IEpic } from '../../types/epicTypes';
import * as epicActions from '../actions/epicActions';
import * as modalActions from '../actions/modalActions';

function* getEpicsRequest(action: epicActions.IGetEpicsRequest) {
    try {
        const epics: IEpic[] = yield call(EpicsApi.getProjectEpics, action.payload);

        yield put(epicActions.getEpicsSuccess(epics));
    } catch (error) {
        yield put(epicActions.getEpicsFailure(error));
    }
}

function* createEpic(action: epicActions.ICreateEpicRequest) {
    try {
        const createdEpic = yield call(EpicsApi.createEpicForProject, action.payload);

        yield put(epicActions.createEpicSuccess(createdEpic));
        yield put(modalActions.closeModal());
    } catch (error) {
        yield put(epicActions.createEpicFailure(error));
    }
}

export default function* epicsRootSaga() {
    yield takeLatest(epicActions.EpicActions.GET_EPICS_REQUEST, getEpicsRequest);
    yield takeLatest(epicActions.EpicActions.CREATE_EPIC_REQUEST, createEpic);
}
