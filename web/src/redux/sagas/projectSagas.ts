import { put, takeLatest } from 'redux-saga/effects';
import mockedTeam from '../../mock/mockedTeam';
import * as teamActions from '../actions/teamActions';

function* getFullProjectInfo() {
    yield put(teamActions.setSelectedTeam(mockedTeam));
}

export default function* rootStoriesSaga() {
    yield takeLatest('()', getFullProjectInfo);
}
