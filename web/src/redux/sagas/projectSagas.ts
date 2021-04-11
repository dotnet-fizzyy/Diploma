import { all, call, put, takeLatest } from 'redux-saga/effects';
import ProjectApi from '../../api/projectApi';
import { IProject, IProjectPage } from '../../types/projectTypes';
import { addEpics } from '../actions/epicActions';
import {
    createProjectFailure,
    createProjectSuccess,
    getProjectFailure,
    getProjectSuccess,
    getUserProjectPageFailure,
    getUserProjectPageSuccess,
    ICreateProjectRequest,
    IGetProjectRequest,
    IGetUserProjectPageRequest,
    ProjectActions,
} from '../actions/projectActions';
import { addTeamSimpleItems } from '../actions/teamActions';

function* getUserProjectPage(action: IGetUserProjectPageRequest) {
    try {
        const projectPage: IProjectPage = yield call(ProjectApi.getProjectPage, action.payload);

        yield all([
            put(getUserProjectPageSuccess(projectPage.project)),
            put(addTeamSimpleItems(projectPage.teams)),
            put(addEpics(projectPage.epics)),
        ]);
    } catch (error) {
        yield put(getUserProjectPageFailure(error));
    }
}

function* getProject(action: IGetProjectRequest) {
    try {
        const project: IProject = yield call(ProjectApi.getProject, action.payload);

        yield put(getProjectSuccess(project));
    } catch (error) {
        yield put(getProjectFailure(error));
    }
}

function* createProject(action: ICreateProjectRequest) {
    try {
        const createdProject: IProject = yield call(ProjectApi.createProject, action.payload);

        yield put(createProjectSuccess(createdProject));
    } catch (error) {
        yield put(createProjectFailure(error));
    }
}

export default function* rootStoriesSaga() {
    yield takeLatest(ProjectActions.GET_USER_PROJECT_PAGE_REQUEST, getUserProjectPage);
    yield takeLatest(ProjectActions.CREATE_PROJECT_REQUEST, createProject);
    yield takeLatest(ProjectActions.GET_PROJECT_REQUEST, getProject);
}
