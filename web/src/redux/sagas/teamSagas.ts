import { call, put, takeLatest } from 'redux-saga/effects';
import TeamApi from '../../api/teamApi';
import { ITeam, ITeamPage } from '../../types/teamTypes';
import {
    createTeamFailure,
    createTeamSuccess,
    getUserTeamPageFailure,
    getUserTeamPageSuccess,
    ICreateTeamRequest,
    IGetUserTeamPageRequest,
    TeamActions,
} from '../actions/teamActions';
import { addWorkSpace } from '../actions/workSpaceActions';

function* getUserTeamPage(action: IGetUserTeamPageRequest) {
    try {
        const teamPage: ITeamPage = yield call(TeamApi.getUserTeamPage, action.payload);

        yield put(getUserTeamPageSuccess(teamPage.team));
        yield put(addWorkSpace(teamPage.workSpace));
    } catch (error) {
        yield put(getUserTeamPageFailure(error));
    }
}

function* createTeam(action: ICreateTeamRequest) {
    try {
        let createdTeam: ITeam = yield call(TeamApi.createTeam, action.payload);
        createdTeam.users = createdTeam.users || [];

        yield put(createTeamSuccess(createdTeam));
    } catch (error) {
        yield put(createTeamFailure(error));
    }
}

export default function* rootTeamsSaga() {
    yield takeLatest(TeamActions.GET_USER_TEAM_PAGE_REQUEST, getUserTeamPage);
    yield takeLatest(TeamActions.CREATE_TEAM_REQUEST, createTeam);
}
