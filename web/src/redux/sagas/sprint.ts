import { call, put, select, takeLatest } from 'redux-saga/effects';
import SprintApi from '../../api/sprint';
import { ISprint } from '../../types/sprint';
import {
    createSprintFailure,
    createSprintSuccess,
    getSprintsFromEpicFailure,
    getSprintsFromEpicSuccess,
    removeSprintFailure,
    removeSprintSuccess,
    updateSprintFailure,
    updateSprintSuccess,
    ICreateSprintRequest,
    IGetSprintsFromEpicRequest,
    IRemoveSprintRequest,
    IUpdateSprintRequest,
    SprintActions,
} from '../actions/sprint';
import { getUserSelectedTeamId } from '../selectors/user';

export function* getSprints(action: IGetSprintsFromEpicRequest) {
    try {
        const selectedTeamId: string = yield select(getUserSelectedTeamId);

        const sprints: ISprint[] = yield call(SprintApi.getSprintsFromEpic, action.payload, selectedTeamId);
        yield put(getSprintsFromEpicSuccess(sprints));
    } catch (error) {
        yield put(getSprintsFromEpicFailure(error));
    }
}

export function* createSprint(action: ICreateSprintRequest) {
    try {
        const createdSprint: ISprint = yield call(SprintApi.createSprint, action.payload);
        yield put(createSprintSuccess(createdSprint));
    } catch (error) {
        yield put(createSprintFailure(error));
    }
}

export function* updateSprint(action: IUpdateSprintRequest) {
    try {
        const createdSprint: ISprint = yield call(SprintApi.updateSprint, action.payload);

        yield put(updateSprintSuccess(createdSprint));
    } catch (error) {
        yield put(updateSprintFailure(error));
    }
}

export function* removeSprint(action: IRemoveSprintRequest) {
    try {
        yield call(SprintApi.removeSprint, action.payload);

        yield put(removeSprintSuccess(action.payload));
    } catch (error) {
        yield put(removeSprintFailure(error));
    }
}

export default function* rootSprintsSaga() {
    yield takeLatest(SprintActions.GET_SPRINTS_FROM_EPIC_REQUEST, getSprints);
    yield takeLatest(SprintActions.CREATE_SPRINT_REQUEST, createSprint);
    yield takeLatest(SprintActions.UPDATE_SPRINT_REQUEST, updateSprint);
    yield takeLatest(SprintActions.REMOVE_SPRINT_REQUEST, removeSprint);
}
