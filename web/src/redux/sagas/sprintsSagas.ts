import { call, put, select, takeLatest } from 'redux-saga/effects';
import * as sprintApi from '../../ajax/sprintApi';
import { IProject } from '../../types/projectTypes';
import { ISprint } from '../../types/sprintTypes';
import * as modalActions from '../actions/modalActions';
import * as sprintActions from '../actions/sprintsActions';
import * as epicSelectors from '../selectors/epicsSelectors';

function* getSprints(action: sprintActions.IGetSprintsRequest) {
    try {
        const sprints: ISprint[] = yield call(sprintApi.getSprintsFromEpic, action.payload);
        yield put(sprintActions.getSprintsSuccess(sprints));
    } catch (error) {
        yield put(sprintActions.getSprintsFailure(error));
    }
}

function* createSprint(action: sprintActions.ICreateSprintRequest) {
    try {
        const project: IProject = yield select(epicSelectors.getCurrentEpic);
        action.payload.projectId = project.projectId;

        const createdSprint: ISprint = yield call(sprintApi.createSprint, action.payload);
        yield put(sprintActions.createSprintSuccess(createdSprint));
        yield put(modalActions.closeModal());
    } catch (error) {
        yield put(sprintActions.createSprintFailure(error));
    }
}

export default function* rootSprintsSaga() {
    yield takeLatest(sprintActions.SprintActions.GET_SPRINTS_REQUEST, getSprints);
    yield takeLatest(sprintActions.SprintActions.CREATE_SPRINT_REQUEST, createSprint);
}
