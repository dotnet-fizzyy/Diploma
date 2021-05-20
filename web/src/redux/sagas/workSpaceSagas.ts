import { push } from 'connected-react-router';
import { all, call, debounce, put, select, takeLatest } from 'redux-saga/effects';
import StoryApi from '../../api/storyApi';
import WorkSpaceApi from '../../api/workSpaceApi';
import { WorkspaceViewerRoute } from '../../constants/routeConstants';
import { debouncePeriod } from '../../constants/storyConstants';
import { IProject } from '../../types/projectTypes';
import { IStory } from '../../types/storyTypes';
import { IWorkSpace, IWorkSpacePage } from '../../types/workSpaceTypes';
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
} from '../actions/workSpaceActions';
import { getSelectedProject } from '../selectors/projectSelectors';

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

export function* searchForStoriesByTitleTerm(action: ISetSearchTitleTermRequest) {
    try {
        const currentProject: IProject = yield select(getSelectedProject);
        const stories: IStory[] = yield call(StoryApi.getStoriesByTerm, action.payload, currentProject.projectId);

        yield put(setSearchTitleTermSuccess(stories));
    } catch (error) {
        yield put(setSearchTitleTermFailure(error));
    }
}

export default function* workSpaceSaga() {
    yield takeLatest(WorkSpaceActions.GET_USER_WORKSPACE_PAGE_REQUEST, getUserWorkSpacePage);
    yield takeLatest(WorkSpaceActions.CREATE_WORKSPACE_REQUEST, createWorkSpace);
    yield takeLatest(WorkSpaceActions.UPDATE_WORKSPACE_REQUEST, updateWorkSpace);
    yield debounce(debouncePeriod, WorkSpaceActions.SET_SEARCH_TITLE_TERM_REQUEST, searchForStoriesByTitleTerm);
}
