import { push } from 'connected-react-router';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import WorkSpaceApi from '../../api/workSpaceApi';
import { WorkspaceViewerRoute } from '../../constants/routeConstants';
import { IWorkSpace, IWorkSpacePage } from '../../types/workSpaceTypes';
import {
    createWorkSpaceFailure,
    createWorkSpaceSuccess,
    getUserWorkSpacePageFailure,
    getUserWorkSpacePageSuccess,
    updateWorkSpaceFailure,
    updateWorkSpaceSuccess,
    ICreateWorkSpaceRequest,
    IUpdateWorkSpaceSuccess,
    WorkSpaceActions,
} from '../actions/workSpaceActions';

export function* getUserWorkSpacePage() {
    try {
        const workSpace: IWorkSpacePage = yield call(WorkSpaceApi.getUserWorkSpace);

        yield put(getUserWorkSpacePageSuccess(workSpace));
    } catch (error) {
        yield put(getUserWorkSpacePageFailure(error));
    }
}

export function* createWorkSpace(action: ICreateWorkSpaceRequest) {
    try {
        const createdWorkSpace: IWorkSpace = yield call(WorkSpaceApi.createWorkSpace, action.payload);

        yield all([put(createWorkSpaceSuccess(createdWorkSpace)), put(push(WorkspaceViewerRoute))]);
    } catch (error) {
        yield put(createWorkSpaceFailure(error));
    }
}

export function* updateWorkSpace(action: IUpdateWorkSpaceSuccess) {
    try {
        const updatedWorkSpace: IWorkSpace = yield call(WorkSpaceApi.updateWorkSpace, action.payload);

        yield put(updateWorkSpaceSuccess(updatedWorkSpace));
    } catch (error) {
        yield put(updateWorkSpaceFailure(error));
    }
}

export default function* workSpaceSaga() {
    yield takeLatest(WorkSpaceActions.GET_USER_WORKSPACE_PAGE_REQUEST, getUserWorkSpacePage);
    yield takeLatest(WorkSpaceActions.CREATE_WORKSPACE_REQUEST, createWorkSpace);
    yield takeLatest(WorkSpaceActions.UPDATE_WORKSPACE_REQUEST, updateWorkSpace);
}
