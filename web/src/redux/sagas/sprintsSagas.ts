import { put, select, takeLatest } from 'redux-saga/effects';
import { IProject } from '../../types/projectTypes';
import * as modalActions from '../actions/modalActions';
import * as sprintActions from '../actions/sprintsActions';
import * as epicSelectors from '../selectors/epicsSelectors';

function* getSprints(action: sprintActions.IGetSprintsSuccess) {
    try {
        yield console.log(action.payload);
    } catch (error) {
        yield put(sprintActions.getSprintsFailure(error));
    }
}

function* createSprint(action: sprintActions.ICreateSprintRequest) {
    try {
        const project: IProject = yield select(epicSelectors.getCurrentEpic);

        action.payload.sprintId = '123';
        action.payload.projectId = project.projectId;

        yield put(sprintActions.createSprintSuccess(action.payload));
        yield put(modalActions.closeModal());
    } catch (error) {
        yield put(sprintActions.createSprintFailure(error));
    }
}

export default function* rootSprintsSaga() {
    yield takeLatest(sprintActions.SprintActions.GET_SPRINTS_REQUEST, getSprints);
    yield takeLatest(sprintActions.SprintActions.CREATE_SPRINT_REQUEST, createSprint);
}
