import { call, put, takeLatest } from 'redux-saga/effects';
import WorkSpaceApi from '../../api/workSpaceApi';
import { IWorkSpace } from '../../types/workSpaceTypes';
import * as WorkSpaceActions from '../actions/workSpaceActions';

function* getUserWorkSpace() {
    try {
        const createdWorkSpace: IWorkSpace = yield call(WorkSpaceApi.getUserWorkSpace);

        yield put(WorkSpaceActions.getUserWorkSpaceSuccess(createdWorkSpace));
    } catch (error) {
        yield put(WorkSpaceActions.getUserWorkSpaceFailure(error));
    }
}

function* createWorkSpace(action: WorkSpaceActions.ICreateWorkSpaceRequest) {
    try {
        const createdWorkSpace: IWorkSpace = yield call(WorkSpaceApi.createWorkSpace, action.payload);

        yield put(WorkSpaceActions.createWorkSpaceSuccess(createdWorkSpace));
    } catch (error) {
        yield put(WorkSpaceActions.createWorkSpaceFailure(error));
    }
}

export default function* workSpaceSaga() {
    yield takeLatest(WorkSpaceActions.WorkSpaceActions.GET_USER_WORKSPACE_REQUEST, getUserWorkSpace);
    yield takeLatest(WorkSpaceActions.WorkSpaceActions.CREATE_WORKSPACE_REQUEST, createWorkSpace);
}
