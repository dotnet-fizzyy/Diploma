import { all, call, put, takeLatest } from 'redux-saga/effects';
import EpicsApi from '../../api/epicsApi';
import { IEpic } from '../../types/epic';
import { IStatsPage } from '../../types/project';
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
    IChangeStatsEpic,
    ICreateEpicRequest,
    IGetEpicsRequest,
    IRemoveEpicRequest,
    IUpdateEpicRequest,
} from '../actions/epic';
import { changeStatsSearchItemsFailure, changeStatsSearchItemsRequest } from '../actions/project';
import { addSprints, setSelectedSprint } from '../actions/sprint';
import { setStorySimpleItems } from '../actions/story';

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

export function* changeStatsSearchItems(action: IChangeStatsEpic) {
    try {
        yield put(changeStatsSearchItemsRequest(action.payload));

        const statsPage: IStatsPage = yield call(EpicsApi.getStatsSearchItems, action.payload);

        yield all([
            put(setSelectedSprint('')),
            put(addSprints(statsPage.sprints)),
            put(setStorySimpleItems(statsPage.stories)),
        ]);
    } catch (error) {
        yield put(changeStatsSearchItemsFailure(error));
    }
}

export default function* epicsRootSaga() {
    yield takeLatest(EpicActions.GET_EPICS_REQUEST, getEpicsRequest);
    yield takeLatest(EpicActions.CREATE_EPIC_REQUEST, createEpic);
    yield takeLatest(EpicActions.UPDATE_EPIC_REQUEST, updateEpic);
    yield takeLatest(EpicActions.REMOVE_EPIC_REQUEST, removeEpic);
    yield takeLatest(EpicActions.CHANGE_STATS_EPIC, changeStatsSearchItems);
}
