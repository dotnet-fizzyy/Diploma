import { call, put, takeLatest } from 'redux-saga/effects';
import WorkSpaceApi from '../../api/workSpaceApi';
import { IWorkSpace, IWorkSpacePage } from '../../types/workSpaceTypes';
import * as WorkSpaceActions from '../actions/workSpaceActions';

function* getUserWorkSpacePage() {
    try {
        const createdWorkSpace: IWorkSpacePage = yield call(WorkSpaceApi.getUserWorkSpace);

        yield put(WorkSpaceActions.getUserWorkSpacePageSuccess(createdWorkSpace));
    } catch (error) {
        yield put(WorkSpaceActions.getUserWorkSpacePageFailure(error));
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

function* updateWorkSpace(action: WorkSpaceActions.IUpdateWorkSpaceSuccess) {
    try {
        const createdWorkSpace: IWorkSpace = yield call(WorkSpaceApi.updateWorkSpace, action.payload);

        yield put(WorkSpaceActions.updateWorkSpaceSuccess(createdWorkSpace));
    } catch (error) {
        yield put(WorkSpaceActions.updateWorkSpaceError(error));
    }
}

export default function* workSpaceSaga() {
    yield takeLatest(WorkSpaceActions.WorkSpaceActions.GET_USER_WORKSPACE_PAGE_REQUEST, getUserWorkSpacePage);
    yield takeLatest(WorkSpaceActions.WorkSpaceActions.CREATE_WORKSPACE_REQUEST, createWorkSpace);
    yield takeLatest(WorkSpaceActions.WorkSpaceActions.UPDATE_WORKSPACE_REQUEST, updateWorkSpace);
}
