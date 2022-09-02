import { push } from 'connected-react-router';
import { all, call, debounce, put, select, takeLatest } from 'redux-saga/effects';
import WorkSpaceApi from '../../api/workspace';
import { WorkspaceViewerRoute } from '../../constants/routes';
import { debouncePeriod } from '../../constants/story';
import { ISearchResults, IWorkSpace, IWorkSpacePage } from '../../types/workspace';
import { addWorkSpaceProjects } from '../actions/project';
import {
    createWorkSpaceFailure,
    createWorkSpaceSuccess,
    getUserWorkSpacePageFailure,
    getUserWorkSpacePageSuccess,
    setSearchTitleTermFailure,
    setSearchTitleTermSuccess,
    updateWorkSpaceFailure,
    updateWorkSpaceSuccess,
    ICreateWorkSpaceRequest,
    ISetSearchTitleTermRequest,
    IUpdateWorkSpaceSuccess,
    WorkSpaceActions,
} from '../actions/workspace';
import { getUserTeamIds } from '../selectors/user';

export function* getUserWorkSpacePage() {
    try {
        const workSpace: IWorkSpacePage = yield call(WorkSpaceApi.getUserWorkSpace);

        yield all([put(getUserWorkSpacePageSuccess(workSpace)), put(addWorkSpaceProjects(workSpace.projects))]);
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

export function* searchForWorkSpaceItemsByTitleTerm(action: ISetSearchTitleTermRequest) {
    try {
        if (!action.payload) {
            return;
        }

        const userTeamIds: string[] = yield select(getUserTeamIds);
        const searchResults: ISearchResults = yield call(
            WorkSpaceApi.getWorkSpaceItemsBySearchTerm,
            action.payload,
            userTeamIds
        );

        yield put(setSearchTitleTermSuccess(searchResults));
    } catch (error) {
        yield put(setSearchTitleTermFailure(error));
    }
}

export default function* workSpaceSaga() {
    yield takeLatest(WorkSpaceActions.GET_USER_WORKSPACE_PAGE_REQUEST, getUserWorkSpacePage);
    yield takeLatest(WorkSpaceActions.CREATE_WORKSPACE_REQUEST, createWorkSpace);
    yield takeLatest(WorkSpaceActions.UPDATE_WORKSPACE_REQUEST, updateWorkSpace);
    yield debounce(debouncePeriod, WorkSpaceActions.SET_SEARCH_TITLE_TERM_REQUEST, searchForWorkSpaceItemsByTitleTerm);
}
