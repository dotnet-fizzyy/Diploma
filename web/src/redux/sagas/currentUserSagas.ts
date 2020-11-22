import { call, put, takeLatest } from 'redux-saga/effects';
import * as usersApi from '../../ajax/currentUserApi';
import * as currentUserActions from '../actions/currentUserActions';

function* authenticateUser(action: currentUserActions.IAuthenticationRequest) {
    try {
        const posts = yield call(usersApi.test);
        console.warn(posts);
    } catch (error) {
        yield put(currentUserActions.authenticationFailure(error));
    }
}

function* usersRegistration(action: currentUserActions.IRegistrationRequest) {
    try {
        yield console.warn(action.payload);
    } catch (error) {
        yield put(currentUserActions.registrationFailure(error));
    }
}

export default function* rootCurrentUserSaga() {
    yield takeLatest(currentUserActions.CurrentUserActions.AUTHENTICATION_REQUEST, authenticateUser);
    yield takeLatest(currentUserActions.CurrentUserActions.REGISTRATION_REQUEST, usersRegistration);
}
