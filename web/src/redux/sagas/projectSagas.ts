import { call, put, takeLatest } from 'redux-saga/effects';
import * as projectApi from '../../ajax/projectApi';
import mockedTeam from '../../mock/mockedTeam';
import * as modalActions from '../actions/modalActions';
import * as projectActions from '../actions/projectActions';
import * as teamActions from '../actions/teamActions';

function* createProject(action: projectActions.ICreateProjectRequest) {
    try {
        //action.payload.startDate = new Date(action.payload.startDate);
        //action.payload.endDate = new Date(action.payload.endDate);
        const createdProject = yield call(projectApi.createProject, action.payload);

        yield put(projectActions.createProjectSuccess(createdProject));
        yield put(modalActions.closeModal());
    } catch (error) {
        yield put(projectActions.createProjectFailure(error));
    }
}

function* getFullProjectInfo() {
    yield put(teamActions.setSelectedTeam(mockedTeam));
}

export default function* rootStoriesSaga() {
    yield takeLatest(projectActions.ProjectActions.CREATE_PROJECT_REQUEST, createProject);
    yield takeLatest('()', getFullProjectInfo);
}
