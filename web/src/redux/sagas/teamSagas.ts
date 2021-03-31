import { call, put, takeLatest } from 'redux-saga/effects';
import TeamApi from '../../api/teamApi';
import { ITeam } from '../../types/teamTypes';
import * as modalActions from '../actions/modalActions';
import * as teamActions from '../actions/teamActions';

function* createTeam(action: teamActions.ICreateTeamRequest) {
    try {
        let createdTeam: ITeam = yield call(TeamApi.createTeam, action.payload);
        createdTeam.users = createdTeam.users || [];

        yield put(teamActions.createTeamSuccess(createdTeam));
        yield put(modalActions.closeModal());
    } catch (error) {
        yield put(teamActions.createTeamFailure(error));
    }
}

function* getUserTeams(action: teamActions.IGetUserTeamsRequest) {
    try {
        const userTeams: ITeam[] = yield call(TeamApi.getTeams);

        yield put(teamActions.getUserTeamsSuccess(userTeams));
    } catch (error) {
        yield put(teamActions.getUserTeamsFailure(error));
    }
}

export default function* rootTeamsSaga() {
    yield takeLatest(teamActions.TeamActions.GET_USER_TEAMS_REQUEST, getUserTeams);
    yield takeLatest(teamActions.TeamActions.CREATE_TEAM_REQUEST, createTeam);
}
