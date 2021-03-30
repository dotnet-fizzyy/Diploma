import { call, put, select, takeLatest } from 'redux-saga/effects';
import * as epicApi from '../../api/epicsApi';
import { ICollectionResponse } from '../../types';
import { IEpic } from '../../types/epicTypes';
import { IProject } from '../../types/projectTypes';
import * as epicActions from '../actions/epicActions';
import * as modalActions from '../actions/modalActions';
import * as projectSelectors from '../selectors/projectSelectors';

function* getEpicsRequest(action: epicActions.IGetEpicsRequest) {
    try {
        const epics: ICollectionResponse<IEpic> = yield call(epicApi.getProjectEpics, action.payload);

        yield put(epicActions.getEpicsSuccess(epics.items));
    } catch (error) {
        yield put(epicActions.getEpicsFailure(error));
    }
}

function* createEpic(action: epicActions.ICreateEpicRequest) {
    try {
        const selectedProject: IProject = yield select(projectSelectors.getProject);
        action.payload.projectId = selectedProject.projectId;

        const createdEpic = yield call(epicApi.createEpicForProject, action.payload);

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
