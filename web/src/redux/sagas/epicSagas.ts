import { call, put, takeLatest } from 'redux-saga/effects';
import EpicsApi from '../../api/epicsApi';
import { IEpic } from '../../types/epicTypes';
import {
    createEpicFailure,
    createEpicSuccess,
    getEpicsFailure,
    getEpicsSuccess,
    removeEpicFailure,
    removeEpicSuccess,
    updateEpicFailure,
    updateEpicSuccess,
    EpicActions,
    ICreateEpicRequest,
    IGetEpicsRequest,
    IRemoveEpicRequest,
    IUpdateEpicRequest,
} from '../actions/epicActions';

export function* getEpicsRequest(action: IGetEpicsRequest) {
    try {
        const epics: IEpic[] = yield call(EpicsApi.getProjectEpics, action.payload);

        yield put(getEpicsSuccess(epics));
    } catch (error) {
        yield put(getEpicsFailure(error));
    }
}

export function* createEpic(action: ICreateEpicRequest) {
    try {
        const createdEpic = yield call(EpicsApi.createEpic, action.payload);

        yield put(createEpicSuccess(createdEpic));
    } catch (error) {
        yield put(createEpicFailure(error));
    }
}

export function* updateEpic(action: IUpdateEpicRequest) {
    try {
        const updatedEpic = yield call(EpicsApi.updateEpic, action.payload);

        yield put(updateEpicSuccess(updatedEpic));
    } catch (error) {
        yield put(updateEpicFailure(error));
    }
}

export function* removeEpic(action: IRemoveEpicRequest) {
    try {
        yield call(EpicsApi.removeEpic, action.payload);

        yield put(removeEpicSuccess(action.payload));
    } catch (error) {
        yield put(removeEpicFailure(error));
    }
}

export default function* epicsRootSaga() {
    yield takeLatest(EpicActions.GET_EPICS_REQUEST, getEpicsRequest);
    yield takeLatest(EpicActions.CREATE_EPIC_REQUEST, createEpic);
    yield takeLatest(EpicActions.UPDATE_EPIC_REQUEST, updateEpic);
    yield takeLatest(EpicActions.REMOVE_EPIC_REQUEST, removeEpic);
}
