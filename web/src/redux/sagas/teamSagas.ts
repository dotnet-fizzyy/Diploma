import { put, takeLatest } from 'redux-saga/effects';
import * as modalActions from '../actions/modalActions';
import * as teamActions from '../actions/teamActions';

function* createTeam(action: teamActions.ICreateTeamRequest) {
    try {
        yield put(teamActions.createTeamSuccess(action.payload));
        yield put(modalActions.closeModal());
    } catch (error) {
        yield put(teamActions.createTeamFailure(error));
    }
}

export default function* rootTeamsSaga() {
    yield takeLatest(teamActions.TeamActions.CREATE_TEAM_REQUEST, createTeam);
}
