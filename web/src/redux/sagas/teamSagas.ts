import { all, call, put, takeLatest } from 'redux-saga/effects';
import TeamApi from '../../api/teamApi';
import { ITeam, ITeamPage } from '../../types/teamTypes';
import {
    createTeamFailure,
    createTeamSuccess,
    getUserTeamPageFailure,
    getUserTeamPageSuccess,
    removeTeamFailure,
    removeTeamSuccess,
    updateTeamFailure,
    updateTeamSuccess,
    ICreateTeamRequest,
    IGetUserTeamPageRequest,
    IRemoveTeamRequest,
    IUpdateTeamRequest,
    TeamActions,
} from '../actions/team';
import { addWorkSpace } from '../actions/workspace';

export function* getUserTeamPage(action: IGetUserTeamPageRequest) {
    try {
        const teamPage: ITeamPage = yield call(TeamApi.getUserTeamPage, action.payload);

        yield all([put(getUserTeamPageSuccess(teamPage.team)), put(addWorkSpace(teamPage.workSpace))]);
    } catch (error) {
        yield put(getUserTeamPageFailure(error));
    }
}

export function* createTeam(action: ICreateTeamRequest) {
    try {
        let createdTeam: ITeam = yield call(TeamApi.createTeam, action.payload);
        createdTeam.users = createdTeam.users || [];

        yield put(createTeamSuccess(createdTeam));
    } catch (error) {
        yield put(createTeamFailure(error));
    }
}

export function* updateTeam(action: IUpdateTeamRequest) {
    try {
        const updatedTeam = yield call(TeamApi.updateTeam, action.payload);

        yield put(updateTeamSuccess(updatedTeam));
    } catch (error) {
        yield put(updateTeamFailure(error));
    }
}

export function* removeTeam(action: IRemoveTeamRequest) {
    try {
        yield call(TeamApi.removeTeam, action.payload);

        yield put(removeTeamSuccess(action.payload));
    } catch (error) {
        yield put(removeTeamFailure(error));
    }
}

export default function* rootTeamsSaga() {
    yield takeLatest(TeamActions.GET_USER_TEAM_PAGE_REQUEST, getUserTeamPage);
    yield takeLatest(TeamActions.CREATE_TEAM_REQUEST, createTeam);
    yield takeLatest(TeamActions.UPDATE_TEAM_REQUEST, updateTeam);
    yield takeLatest(TeamActions.REMOVE_TEAM_REQUEST, removeTeam);
}
