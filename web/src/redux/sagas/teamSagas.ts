import { call, put, takeLatest } from 'redux-saga/effects';
import * as teamApi from '../../api/teamsApi';
import { ICollectionResponse } from '../../types';
import { ITeam } from '../../types/teamTypes';
import * as modalActions from '../actions/modalActions';
import * as teamActions from '../actions/teamActions';

function* createTeam(action: teamActions.ICreateTeamRequest) {
    try {
        let createdTeam: ITeam = yield call(teamApi.createTeam, action.payload);
        createdTeam.users = createdTeam.users || [];

        yield put(teamActions.createTeamSuccess(createdTeam));
        yield put(modalActions.closeModal());
    } catch (error) {
        yield put(teamActions.createTeamFailure(error));
    }
}

function* getUserTeams(action: teamActions.IGetUserTeamsRequest) {
    try {
        const userTeams: ICollectionResponse<ITeam> = yield call(teamApi.getTeams);
        const teams = userTeams.items.map((x) => {
            return {
                ...x,
                users: x.users || [],
            };
        });

        yield put(teamActions.getUserTeamsSuccess(teams));
    } catch (error) {
        yield put(teamActions.getUserTeamsFailure(error));
    }
}

export default function* rootTeamsSaga() {
    yield takeLatest(teamActions.TeamActions.GET_USER_TEAMS_REQUEST, getUserTeams);
    yield takeLatest(teamActions.TeamActions.CREATE_TEAM_REQUEST, createTeam);
}
